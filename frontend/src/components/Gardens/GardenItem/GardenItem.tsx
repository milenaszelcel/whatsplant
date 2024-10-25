import { garden } from "../../../contract/src/types/garden";
import styles from "./GardenItem.module.scss";

type Props = {
  garden: garden;
  handleClick: () => void;
};

export const GardenItem = ({ garden, handleClick }: Props) => {
  return (
    <div className={styles.gardenBox} onClick={handleClick}>
      <div>{garden.name}</div>
    </div>
  );
};
