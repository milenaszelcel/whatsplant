import { Plant } from "contract/plant";
import { PlantBox } from "../PlantBox/PlantBox";
import styles from "./PlantList.module.scss";

type Props = {
  plants: Plant[];
};

export const PlantsList = ({ plants }: Props) => {
  return (
    <div className={styles.plantsList}>
      {plants.map((plant) => (
        <PlantBox plant={plant} key={plant.id} />
      ))}
    </div>
  );
};
