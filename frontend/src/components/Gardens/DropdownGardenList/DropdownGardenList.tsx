import axios from "axios";
import { garden } from "../../../contract/src/types/garden";
import { GardenItem } from "../GardenItem/GardenItem";
import styles from "./DropdownGardenList.module.scss";
import { useEffect, useState } from "react";

type Props = {
  plantId: number;
  gardens: garden[] | undefined;
};

export const DropdownGardenList = ({ plantId, gardens }: Props) => {
  const handleClick = async (garden: garden) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/garden/addToGarden",
        { plantId: plantId, gardenName: garden.name },
        { withCredentials: true }
      );
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
