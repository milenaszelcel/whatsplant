import styles from "./AddPlantsModal.module.scss";
import type { Plant } from "../../../../contract/src/types/plant";
import SaveIcon from "@mui/icons-material/Save";
import { Search } from "../Search/Search";

import NothingFoundIcon from "../../assets/no-result-found.svg?react";
import CloseIcon from "@mui/icons-material/Close";
import { PlantWithAmount } from "@greenmate/contract/";
import { MiniPlantBox } from "../MiniPlantBox/MiniPlantBox";
import { useCallback } from "react";

type Props = {
  setIsModalOpen: (value: boolean) => void;
  plants: Plant[];
  setPlantsSearchValue: (value: string) => void;
  setSelectedPlantsWithAmount: React.Dispatch<
    React.SetStateAction<PlantWithAmount[]>
  >;
  selectedPlantsWithAmount: PlantWithAmount[];
};

export const AddPlantsModal = ({
  setIsModalOpen,
  setSelectedPlantsWithAmount,
  selectedPlantsWithAmount,
  plants,
  setPlantsSearchValue,
}: Props) => {
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains(styles.modalContainer)) {
      setIsModalOpen(false);
      setPlantsSearchValue("");
    }
  };

  const updatePlantsList = (
    plant: Plant,
    amount: number,
    isSelected: boolean
  ) => {
    setSelectedPlantsWithAmount((prevSelectedPlants: PlantWithAmount[]) => {
      if (!isSelected) {
        return prevSelectedPlants.filter((p) => p.plant.id !== plant.id);
      } else {
        const updatedList = prevSelectedPlants.filter(
          (p) => p.plant.id !== plant.id
        );
        return [...updatedList, { plant, amount }];
      }
    });
  };

  const updateAmountOfPlant = useCallback(
    (plant: Plant, counter: number) => {
      const targetPlantId = plant.id;
      const newAmount = counter;

      setSelectedPlantsWithAmount((prevSelectedPlants: PlantWithAmount[]) => {
        return prevSelectedPlants.map((plantInArray: PlantWithAmount) =>
          plantInArray.plant.id === targetPlantId
            ? { ...plantInArray, amount: newAmount }
            : plantInArray
        );
      });
    },
    [setSelectedPlantsWithAmount]
  );

  const isSelectedAlready = (plant: Plant) => {
    return selectedPlantsWithAmount.some(
      (selectedPlantsWithAmount) =>
        selectedPlantsWithAmount.plant.id === plant.id
    );
  };

  return (
    <div className={styles.modalContainer} onClick={closeModal}>
      <div className={styles.addPlantsModal}>
        <div className={styles.topBar}>
          <CloseIcon
            className={styles.closeButton}
            fontSize="inherit"
            onClick={() => {
              setIsModalOpen(false);
              setPlantsSearchValue("");
            }}
          />
          <div>Add plants</div>
        </div>
        <div className={styles.content}>
          <Search onSearch={setPlantsSearchValue} />
          {plants.length === 0 ? (
            <div className={styles.noPlantsContent}>
              <div>Nothing found</div>
              <NothingFoundIcon className={styles.nothingFoundIcon} />
            </div>
          ) : (
            <div className={styles.plantsList}>
              {plants.map((plant) => (
                <MiniPlantBox
                  plant={plant}
                  action={updatePlantsList}
                  updateAmountOfPlant={updateAmountOfPlant}
                  key={plant.id}
                  amount={
                    isSelectedAlready(plant)
                      ? selectedPlantsWithAmount.find(
                          (item) => item.plant.id === plant.id
                        )?.amount
                      : undefined
                  }
                  isSelectedAlready={isSelectedAlready(plant)}
                />
              ))}
              ;
            </div>
          )}
          <div
            className={styles.saveButton}
            onClick={() => setIsModalOpen(false)}
          >
            <SaveIcon fontSize="large" />
            Save plants
          </div>
        </div>
      </div>
    </div>
  );
};
