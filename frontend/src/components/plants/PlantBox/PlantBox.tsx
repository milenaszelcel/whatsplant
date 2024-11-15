import { Plant } from "../../../contract/src/plant";
import { AddToGardenButton } from "../../buttons/AddToGardenButton/AddToGardenButton";
import styles from "./PlantBox.module.scss";

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
      {document.cookie.indexOf("token") !== -1 ? (
        <div className={styles.button}>
          <AddToGardenButton plantId={plant.id} />
        </div>
      ) : null}
    </div>
  );
};
