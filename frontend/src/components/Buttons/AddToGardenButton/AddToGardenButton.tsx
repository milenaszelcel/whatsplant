import classNames from "classnames";
import styles from "./AddToGardenButton.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useRef, useState } from "react";
import { DropdownGardenList } from "../../Gardens/DropdownGardenList/DropdownGardenList";

type Props = {
  plantId: number;
};
export const AddToGardenButton = ({ plantId }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);
  const handleClick = async () => {
    setIsActive(!isActive);
  };

  return (
    <div ref={boxRef}>
      {isActive ? (
        <span className={styles.dropDownBox}>
          <div className={styles.dropDownHeader}>
            <div className={styles.headerText}>Choose garden:</div>
            <CloseIcon
              fontSize="large"
              className={classNames("material-symbols-outlined", styles.icon)}
              onClick={handleClick}
            />
          </div>

          <DropdownGardenList plantId={plantId} />
        </span>
      ) : (
        <AddIcon
          fontSize="large"
          className={classNames("material-symbols-outlined", styles.icon)}
          onClick={handleClick}
        />
      )}
    </div>
  );
};
