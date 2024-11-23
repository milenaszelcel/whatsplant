import WaterDropIcon from "@mui/icons-material/WaterDrop";
import styles from "./WaterPlantButton.module.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

type Props = {
  plantId: number;
};

export const WaterPlantButton = ({ plantId }: Props) => {
  const { id } = useParams();
  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/garden/waterPlant",
        {
          gardenId: id,
          waterValue: 6,
          plantId: plantId,
        }
      );
      console.log(response);
    } catch {}
  };

  return (
    <button className={styles.waterPlantButtonBox} onClick={handleClick}>
      <WaterDropIcon />
    </button>
  );
};
