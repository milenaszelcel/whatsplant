import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gardenWithPlants } from "../../contract/src/types/gardenWithplants";
import styles from "./Garden.module.scss";
import { PlantsWithWaterList } from "../plants/PlantWithWaterList.tsx/PlantsWithWater";

export const Garden = () => {
  const { id } = useParams();
  const [gardenWithPlants, setGardenWithPlants] = useState<gardenWithPlants>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/garden/getGarden",
          {
            params: { id: id },
            withCredentials: true,
          }
        );
        setGardenWithPlants(response.data);
        console.log(gardenWithPlants?.plants[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <div>
      <div className={styles.gardenName}> {gardenWithPlants?.name}</div>

      {gardenWithPlants ? (
        <PlantsWithWaterList plants={gardenWithPlants.plants} />
      ) : null}
    </div>
  );
};
