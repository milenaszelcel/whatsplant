import { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { garden } from "../../contract/src/types/garden";
import styles from "./MyGarden.module.scss";
import { GardenList } from "../Gardens/GardenList/GardenList";
import { Link, useNavigate } from "react-router-dom";
import { FieldWithButtonForm } from "../FieldWithButtonForm/FieldWithButtonForm";
import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from "../../contexts/AuthContext";

export const MyGarden = () => {
  const navigate = useNavigate();
  const [gardens, setGardens] = useState<garden[]>();
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    console.log(isAuthenticated);
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/garden", {
          withCredentials: true,
        });
        setGardens(response.data);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };
    fetchData();
  }, []);

  return !isAuthenticated ? (
    <div>
      Twoja sesja wygasła lub nie jesteś zalogowany. Proszę zaloguj się
      ponownie.
    </div>
  ) : (
    <div className={styles.gardenContainer}>
      <div className={styles.gardensActionHeader}>
        <div className={styles.myGardenText}>
          Check what's up in your{" "}
          <span className={styles.golden}>gardens!</span>
        </div>
        <div className={styles.actionButtons}>
          <FieldWithButtonForm
            icon={<SearchIcon />}
            handleSubmit={() => {}}
            placeHolder="Type name of garden..."
            name="searchValue"
            initialValues={{ searchValue: "" }}
          />
          <Link to="/myGarden/create" className={styles.addButton}>
            <AddIcon fontSize="large" />
          </Link>
        </div>
      </div>
      <div className={styles.gardenContentContainer}>
        {gardens?.length ? (
          <GardenList gardens={gardens} />
        ) : (
          <div className={styles.noGardenContentContainer}>
            <div className={styles.myGardenText}>
              No gardens here yet, maybe
              <span className={styles.golden}> add one!</span>
            </div>

            <img
              src="noGardens.svg"
              alt="no Gardens"
              className={styles.noGardensCover}
            />
          </div>
        )}
      </div>
    </div>
  );
};
