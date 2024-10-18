import classNames from "classnames";
import styles from "./AddToGardenButton.module.scss";
import axios from "axios";

import AddIcon from "@mui/icons-material/Add";

type Props = {
  plantId: number;
};
export const AddToGardenButton = ({ plantId }: Props) => {
  const handleClick = async () => {
    try {
      const response = axios.post(
        "http://localhost:3001/garden/addToGarden",
        plantId
      );
      return response;
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
    <AddIcon
      className={classNames("material-symbols-outlined", styles.addIcon)}
      onClick={handleClick}
    />
  );
};
