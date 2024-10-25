import axios from "axios";
import { garden } from "../../../contract/src/types/garden";
import { GardenItem } from "../GardenItem/GardenItem";
import styles from "./GardenList.module.scss";
import { redirect } from "react-router-dom";

type Props = {
  gardens: Array<garden>;
};

export const GardenList = ({ gardens }: Props) => {
  const handleClick = (id: garden["_id"]) => {
    redirect("=id");
  };

  return (
    <div className={styles.gardenList}>
      {gardens.map((garden) => (
        <GardenItem
          garden={garden}
          handleClick={() => handleClick(garden._id)}
        />
      ))}
    </div>
  );
};
