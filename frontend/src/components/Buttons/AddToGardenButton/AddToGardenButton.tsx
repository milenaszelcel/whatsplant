import classNames from "classnames";
import styles from "./AddToGardenButton.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { DropdownGardenList } from "../../Gardens/DropdownGardenList/DropdownGardenList";
import { garden } from "../../../contract/src/types/garden";
import axios from "axios";

type Props = {
  plantId: number;
};
export const AddToGardenButton = ({ plantId }: Props) => {
  const [gardens, setGardens] = useState<garden[]>();
  const [isActive, setIsActive] = useState(false);

  const handleClick = async () => {
    setIsActive(!isActive);
    if (!gardens) {
      try {
        const response = await axios.get(
          "http://localhost:3001/garden/getGardensList",
          { withCredentials: true }
        );
        setGardens(response.data);
      } catch (error) {
        console.log(error);
      }
    }
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

          <DropdownGardenList plantId={plantId} gardens={gardens} />
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
