import { Field, Form, Formik, FormikProps } from "formik";
import styles from "./CreateGarden.module.scss";
import YardIcon from "@mui/icons-material/Yard";
import HouseIcon from "@mui/icons-material/House";
import ForestIcon from "@mui/icons-material/Forest";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { BackButton } from "../buttons/BackButton/BackButton";
import { useEffect, useState } from "react";
import { AddPlantsModal } from "../AddPlantsModal/AddPlantsModal";
import { useNavigate } from "react-router-dom";
import type { Plant } from "@greenmate/contract/src/types/plant";
import { gardenValidationSchema, PlantWithAmount } from "@greenmate/contract";
import { joiFormikAdapter } from "joi-formik-adapter";
import { MiniPlantBox } from "../MiniPlantBox/MiniPlantBox";

interface GardenValues {
  name: string;
  type: string;
  plants: PlantWithAmount[];
}

export const CreateGarden = () => {
  const navigate = useNavigate();
  const initialValues: GardenValues = { name: "", type: "", plants: [] };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlantsWithAmount, setSelectedPlantsWithAmount] = useState<
    PlantWithAmount[]
  >([]);
  const [plantsSearchValue, setPlantsSearchValue] = useState<string>();
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/plants", {
          params: { search: plantsSearchValue },
          withCredentials: true,
        });

        setPlants(response.data.plants);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [plantsSearchValue]);

  const handleSubmit = async (values: GardenValues) => {
    try {
      const validatedValues = await gardenValidationSchema.validateAsync({
        name: values.name,
        type: values.type,
        plantsWithAmount: selectedPlantsWithAmount,
      });

      await axios.post("http://localhost:3001/garden/", validatedValues, {
        withCredentials: true,
      });
      navigate(-1);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // const errorMsg =
        //   error.response?.data?.message ||
        //   error.response?.statusText ||
        //   "An error occurred";
        console.log(error);
      } else {
        throw new Error("different error than axios");
      }
    }
  };

  const updatePlantsList = (
    plant: Plant,
    amount: number,
    isSelected: boolean
  ) => {
    setSelectedPlantsWithAmount((prev) => {
      if (!isSelected) {
        return prev.filter(
          (selectedPlantsWithAmount) =>
            selectedPlantsWithAmount.plant.id !== plant.id
        );
      } else {
        const updatedList = prev.filter(
          (selectedPlantsWithAmount) =>
            selectedPlantsWithAmount.plant.id !== plant.id
        );
        const newPlantEntry: PlantWithAmount = {
          plant: plant,
          amount: amount,
        };
        return [...updatedList, newPlantEntry];
      }
    });
  };

  const updateAmountOfPlantInGarden = (plant: Plant, newAmount: number) => {
    setSelectedPlantsWithAmount((prevPlants) =>
      prevPlants.map((p) =>
        p.plant.id === plant.id ? { ...p, amount: newAmount } : p
      )
    );
  };

  return (
    <div className={styles.addGardenContainer}>
      <div className={styles.topPanel}>
        <BackButton />
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={joiFormikAdapter(gardenValidationSchema)}
      >
        {({ errors, touched }: FormikProps<GardenValues>) => (
          <Form className={styles.addGardenForm}>
            <div className={styles.headText}>
              Create your <span className={styles.gold}>garden!</span>
            </div>
            <div>
              <div className={styles.formFieldWithIcon}>
                <span className={styles.icon}>
                  <YardIcon />
                </span>
                <Field
                  name="name"
                  placeholder={"Write name of your garden..."}
                  className={styles.formField}
                />
              </div>
              {errors.name && touched && (
                <div className={styles.errorMessage}>Name is required</div>
              )}
            </div>

            <div className={styles.typeRadioContainer}>
              <div>Type:</div>
              <div className={styles.radioGroup}>
                <label className={styles.radioOption}>
                  <Field type="radio" name="type" value="indoor" />
                  <span className={styles.radioIcon}>
                    Indoor <HouseIcon fontSize="large" />
                  </span>
                </label>
                <label className={styles.radioOption}>
                  <Field
                    type="radio"
                    name="type"
                    value="outdoor"
                    className={styles.radioOption}
                  />
                  <span className={styles.radioIcon}>
                    Outdoor <ForestIcon fontSize="large" />
                  </span>
                </label>
              </div>
            </div>

            <button
              type="button"
              className={styles.buttonWithIcon}
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <AddIcon fontSize="large" /> Add plants
            </button>
            <div className={styles.selectedPlantsList}>
              {selectedPlantsWithAmount.map((selectedPlantWithAmount) => (
                <MiniPlantBox
                  plant={selectedPlantWithAmount.plant}
                  key={selectedPlantWithAmount.plant.id}
                  amount={selectedPlantWithAmount.amount}
                  isSelectedAlready={true}
                  action={updatePlantsList}
                  updateAmountOfPlant={updateAmountOfPlantInGarden}
                />
              ))}
            </div>

            <button type="submit" className={styles.buttonWithIcon}>
              <SaveIcon fontSize="large" />
              Save Garden
            </button>
          </Form>
        )}
      </Formik>

      {isModalOpen && (
        <AddPlantsModal
          setIsModalOpen={setIsModalOpen}
          setSelectedPlantsWithAmount={setSelectedPlantsWithAmount}
          plants={plants}
          setPlantsSearchValue={setPlantsSearchValue}
          selectedPlantsWithAmount={selectedPlantsWithAmount}
        />
      )}
    </div>
  );
};
