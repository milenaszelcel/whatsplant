import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./Logout.module.scss";
import classNames from "classnames";

export const Logout = () => {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users/logout",
        {},
        { withCredentials: true }
      );
      console.log(response);

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button onClick={onClick} className={styles.logoutButton}>
      <LogoutIcon
        className={classNames("material-symbols-outlined", styles.logoutIcon)}
      />
    </button>
  );
};
