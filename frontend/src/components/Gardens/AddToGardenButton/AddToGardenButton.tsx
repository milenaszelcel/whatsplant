import classNames from "classnames";
import styles from "./AddToGardenButton.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { DropdownGardenList } from "../DropdownGardenList/DropdownGardenList";

type Props = {
  plantId: number;
};
export const AddToGardenButton = ({ plantId }: Props) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <div>
      {isActive ? (
        <span className={styles.dropDownBox}>
          <div className={styles.dropDownHeader}>
            <div className={styles.headerText}>Choose garden:</div>
            <CloseIcon
              className={classNames("material-symbols-outlined", styles.icon)}
              onClick={handleClick}
            />
          </div>

          <DropdownGardenList plantId={plantId} />
        </span>
      ) : (
        <AddIcon
          className={classNames("material-symbols-outlined", styles.icon)}
          onClick={handleClick}
        />
      )}
    </div>
  );
};
