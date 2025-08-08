// import { AddToGardenButton } from "../../buttons/AddToGardenButton/AddToGardenButton";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import styles from "./PlantBox.module.scss";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
// import { useContext } from "react";
// import { AuthContext } from "../../../contexts/AuthContext";
import type { Plant } from "@greenmate/contract";

type Props = {
  plant: Plant;
};

export const PlantBox = ({ plant }: Props) => {
  // const { user } = useContext(AuthContext);
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
        </div>
        <div className={styles.plantDetails}>
          <div className={styles.plantDetailsItem}>
            <span className={styles.infoIcon}>
              <WbSunnyIcon fontSize="large" />
            </span>
          </div>
          <div className={styles.plantDetailsItem}>
            <span className={styles.infoIcon}>
              <WaterDropIcon fontSize="large" />
            </span>
          </div>
        </div>
      </div>

      {/* {user && (
        <div className={styles.button}>
          <AddToGardenButton plantId={plant.id} />
        </div>
      )} */}
    </div>
  );
};
