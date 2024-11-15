import { Plant } from "../../../contract/src/plant";

import { PlantWithWaterBox } from "../PlantWithWatering/PlantWithWatering";
import styles from "./PlantsWithWaterList.module.scss";

type Props = {
  plants: Plant[];
};

export const PlantsWithWaterList = ({ plants }: Props) => {
  return (
    <div className={styles.plantsList}>
      {plants.map((plant) => (
        <PlantWithWaterBox plant={plant} key={plant.id} />
      ))}
    </div>
  );
};
