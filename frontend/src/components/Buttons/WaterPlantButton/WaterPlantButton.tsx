import WaterDropIcon from "@mui/icons-material/WaterDrop";
import styles from "./WaterPlantButton.module.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DropDownMenuForWatering } from "../../DropdownMenuForWatering/DropDownMenuForWatering";
import classNames from "classnames";

type Props = {
  plantId: number;
};

export const WaterPlantButton = ({ plantId }: Props) => {
  const { id } = useParams();
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
  const changeButtonState = () => {
    setIsActive(!isActive);
  };
  const handleSubmit = async (waterValue: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/garden/waterPlant",
        {
          gardenId: id,
          waterValue: waterValue,
          plantId: plantId,
        }
      );
      changeButtonState();
    } catch {}
  };

  return (
    <div ref={boxRef}>
      {isActive ? (
        <div className={styles.dropDownBox}>
          <div className={styles.dropDownHeader}>
            <div className={styles.headerText}>How much water?</div>
            <button
              className={classNames("material-symbols-outlined", styles.button)}
              onClick={changeButtonState}
            >
              <CloseIcon />
            </button>
          </div>

          <DropDownMenuForWatering handleSubmit={handleSubmit} />
        </div>
      ) : (
        <button className={styles.button} onClick={changeButtonState}>
          <WaterDropIcon />
        </button>
      )}
    </div>
  );
};
