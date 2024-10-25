import { useEffect, useState } from "react";
import { AddGarden } from "../Gardens/AddGarden/AddGarden";
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
        window.location.reload();
      }
    };
    fetchData();
  }, []);
  // const [plants, setPlants] = useState();
  // const handleClick = async () => {
  //   const plantsId = garden.plantsId;
  //   plantsId.map(async (plant) => {
  //     const response = await axios.get("http://localhost:3001/plants/plant", {
  //       params: { plantId: plant },
  //     });
  //     console.log(response);
  //   });
  // };
  return document.cookie.includes("token") ? (
    <div className={styles.gardenContainer}>
      <AddGarden />
      {gardens ? <GardenList gardens={gardens} /> : null}
    </div>
  ) : null;
};
