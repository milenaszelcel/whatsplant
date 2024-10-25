import { Plant } from "../../contract/src/plant";
import styles from "./PlantBox.module.scss";

import { AddToGardenButton } from "../Gardens/AddToGardenButton/AddToGardenButton";

type Props = {
  plant: Plant;
};

export const PlantBox = ({ plant }: Props) => {
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
      <div className={styles.addToGarden}>
        {document.cookie.includes("token") ? (
          <AddToGardenButton plantId={plant.id} />
        ) : null}
      </div>
    </div>
  );
};
