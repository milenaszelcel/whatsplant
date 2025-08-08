import axios from "axios";
import { GardenItem } from "../GardenItem/GardenItem";
import styles from "./DropdownGardenList.module.scss";
import { useContext } from "react";
import { GardenContext } from "../../../contexts/GardenContext";
import type { Garden } from "@greenmate/contract";

type Props = {
  plantId: number;
};

export const DropdownGardenList = ({ plantId }: Props) => {
  const gardens = useContext(GardenContext);
  const handleClick = async (garden: Garden) => {
    try {
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg =
          error.response?.data?.message ||
          error.response?.statusText ||
          "An error occurred";
        console.log(errorMsg);
      }
    }
  };
  return (
    <div className={styles.gardenList}>
      {gardens?.map((garden) => {
        return (
          <GardenItem garden={garden} handleClick={() => handleClick(garden)} />
        );
      })}
    </div>
  );
};
