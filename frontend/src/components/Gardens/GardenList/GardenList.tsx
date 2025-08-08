import { GardenItem } from "../GardenItem/GardenItem";
import styles from "./GardenList.module.scss";
import { Link, redirect } from "react-router-dom";
import type { GardenObject } from "@greenmate/contract";

type Props = {
  gardens: Array<GardenObject>;
};

export const GardenList = ({ gardens }: Props) => {
  const handleClick = (id: GardenObject["_id"]) => {
    redirect(`=${id}`);
  };
  return (
    <div className={styles.gardenList}>
      {gardens.map((garden) => (
        <Link to={`${garden._id}`}>
          <GardenItem
            garden={garden}
            handleClick={() => handleClick(garden._id)}
          />
        </Link>
      ))}
    </div>
  );
};
