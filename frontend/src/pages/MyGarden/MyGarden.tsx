import { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

import styles from "./MyGarden.module.scss";
import { GardenList } from "../../components/Gardens/GardenList/GardenList";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import type { GardenObject } from "@greenmate/contract";

export const MyGarden = () => {
  const navigate = useNavigate();
  const [gardens, setGardens] = useState<GardenObject[]>();
  const user = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/garden", {
          withCredentials: true,
        });
        setGardens(response.data);
      } catch (error) {
        console.log(error);
        window.location.reload();
        navigate("/");
      }
    };
    fetchData();
  }, []);

  return !user ? (
    <div>
      Twoja sesja wygasła lub nie jesteś zalogowany. Proszę zaloguj się
      ponownie.
    </div>
  ) : (
    <div className={styles.gardenContainer}>
      <div>
        <div className={styles.myGardenText}>
          Check what's up in your{" "}
          <span className={styles.golden}>gardens!</span>
        </div>

        <div className={styles.actionButtons}>
          <Link to="/myGarden/create" className={styles.addButton}>
            <AddIcon fontSize="large" />
            <div>Add</div>
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
