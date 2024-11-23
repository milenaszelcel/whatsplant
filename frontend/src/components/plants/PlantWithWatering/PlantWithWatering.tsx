import { Plant } from "../../../contract/src/plant";
import { WaterPlantButton } from "../../buttons/WaterPlantButton/WaterPlantButton";
import styles from "./PlantWithWaterBox.module.scss";

type Props = {
  plant: Plant;
};

export const PlantWithWaterBox = ({ plant }: Props) => {
  return (
    <div className={styles.plantBox}>
      <img
        src={
          plant.img?.includes("upgrade_access.jpg") ? "no-image.svg" : plant.img
        }
        alt={plant.commonName}
        className={styles.plantImage}
      />

      <div>
        <div className={styles.commonName}>{plant.commonName}</div>
        <div className={styles.scientificName}>{plant.scientificName}</div>
      </div>
      <div className={styles.button}>
        <WaterPlantButton plantId={plant.id} />
      </div>
    </div>
  );
};
