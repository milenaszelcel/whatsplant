import { useEffect, useState } from "react";
import { AddGarden } from "../AddGarden/AddGarden";
import axios from "axios";
import { garden } from "../../contract/src/types/garden";
import styles from "./MyGarden.module.scss";
import { GardenList } from "../Gardens/GardenList/GardenList";
import { useNavigate } from "react-router-dom";

export const MyGarden = () => {
  const navigate = useNavigate();
  const [gardens, setGardens] = useState<garden[]>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/garden/getGardensList",
          { withCredentials: true }
        );
        setGardens(response.data);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };
    fetchData();
  }, []);

  return document.cookie.includes("token") ? (
    <div className={styles.gardenContainer}>
      <div className={styles.myGardenText}>
        Check what's up in your <span className={styles.golden}>gardens!</span>
      </div>
      <AddGarden />
      {gardens ? <GardenList gardens={gardens} /> : null}
    </div>
  ) : null;
};
