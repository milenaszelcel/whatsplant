import AddIcon from "@mui/icons-material/Add";
import styles from "./MiniPlantBox.module.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import classNames from "classnames";
import type { Plant } from "@greenmate/contract";
import RemoveIcon from "@mui/icons-material/Remove";

type Props = {
  plant: Plant;
  action: (plant: Plant, amount: number, isSelected: boolean) => void;
  updateAmountOfPlant: (plant: Plant, counter: number) => void;
  isSelectedAlready: boolean;
  amount?: number;
};
export const MiniPlantBox = ({
  plant,
  action,
  updateAmountOfPlant,
  amount,
  isSelectedAlready,
}: Props) => {
  const antyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleClick = () => {
    action(plant, 1, !isSelectedAlready);
  };

  return (
    <div onClick={handleClick} className={styles.miniPlantBox}>
      <div className={styles.plantInfo}>
        <div>{plant.commonName}</div>
        <div>{plant.scientificName}</div>
      </div>
      <img
        src={
          plant.img?.includes("upgrade_access.jpg") ? "no-image.svg" : plant.img
        }
        alt={plant.commonName}
        className={classNames([
          styles.plantImage,
          isSelectedAlready ? styles.selected : null,
        ])}
      />
      {isSelectedAlready ? (
        <div className={styles.actionBar} onClick={antyClick}>
          <div className={styles.actionContainer}>
            <div className={styles.checkedIcon}>
              <CheckCircleIcon />
            </div>
            <div className={styles.quantityCounter}>
              <RemoveIcon
                className={styles.quantityButton}
                onClick={() => {
                  const currentAmount = amount || 1;
                  if (currentAmount > 1) {
                    updateAmountOfPlant(plant, currentAmount - 1);
                  } else {
                    action(plant, 0, false);
                  }
                }}
              />
              <div className={styles.quantityValue}>{amount}</div>

              <AddIcon
                className={styles.quantityButton}
                onClick={() => {
                  const currentAmount = amount || 0;

                  updateAmountOfPlant(plant, currentAmount + 1);
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
