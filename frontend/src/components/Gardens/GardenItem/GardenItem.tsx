import { useState } from "react";
import { garden } from "../../../contract/src/types/garden";
import styles from "./GardenItem.module.scss";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import classNames from "classnames";

type Props = {
  garden: garden;
  handleClick: () => void;
};

export const GardenItem = ({ garden, handleClick }: Props) => {
  const [isActive, setIsActive] = useState(false);

  const onClick = () => {
    setIsActive(true);
    handleClick();
  };

  return (
    <div
      className={classNames(styles.gardenBox, { [styles.active]: isActive })}
      onClick={onClick}
    >
      {isActive ? (
        <div className={styles.successBox}>
          <CheckCircleOutlineIcon />
          <div>Succesfully added</div>
        </div>
      ) : (
        <div>{garden.name}</div>
      )}
    </div>
  );
};
