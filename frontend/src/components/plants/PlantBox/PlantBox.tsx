import { Plant } from "../../../contract/src/plant";
import { AddToGardenButton } from "../../buttons/AddToGardenButton/AddToGardenButton";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import styles from "./PlantBox.module.scss";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

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
      <div className={styles.plantContent}>
        <div className={styles.plantHeader}>
          <div className={styles.commonName}>{plant.commonName}</div>
          <div className={styles.scientificName}>{plant.scientificName}</div>
        </div>
        <div className={styles.plantDetails}>
          <div className={styles.plantDetailsItem}>
            <span className={styles.infoIcon}>
              <WbSunnyIcon fontSize="large" />
            </span>
            {plant.sunlight}
          </div>
          <div className={styles.plantDetailsItem}>
            <span className={styles.infoIcon}>
              <WaterDropIcon fontSize="large" />
            </span>

            {plant.watering}
          </div>
        </div>
      </div>

      {document.cookie.indexOf("token") !== -1 ? (
        <div className={styles.button}>
          <AddToGardenButton plantId={plant.id} />
        </div>
      ) : null}
    </div>
  );
};
