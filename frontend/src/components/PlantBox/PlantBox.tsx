import { Plant } from "contract/plant";
import styles from "./PlantBox.module.scss";

type Props = {
  plant: Plant;
};

export const PlantBox = ({ plant }: Props) => {
  return (
    <div className={styles.plantBox}>
      {plant.img ? (
        <img
          src={
            plant.img.includes("upgrade_access.jpg")
              ? "../../../public/no-image.svg"
              : plant.img
          }
          alt={plant.commonName}
          className={styles.plantImage}
        />
      ) : null}

      <div>
        <div className={styles.commonName}>{plant.commonName}</div>
        <div className={styles.scientificName}>{plant.scientificName}</div>
      </div>
    </div>
  );
};