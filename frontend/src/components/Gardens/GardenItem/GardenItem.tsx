import styles from "./GardenItem.module.scss";

import { GardenObject } from "@greenmate/contract";
import GardenDefault from "../../../assets/gardenDefault.svg?react";

type Props = {
  garden: GardenObject;
};

export const GardenItem = ({ garden }: Props) => {
  return (
    <div className={styles.gardenBox}>
      <div>{garden.name}</div>
      <GardenDefault />
    </div>
  );
};
