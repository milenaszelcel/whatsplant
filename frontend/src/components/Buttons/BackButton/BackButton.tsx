import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.scss";

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(-1)} className={styles.backButton}>
      <ArrowBackIcon />
      Back
    </div>
  );
};
