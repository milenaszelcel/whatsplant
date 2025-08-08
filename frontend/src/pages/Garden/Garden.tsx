// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

import styles from "./Garden.module.scss";
// import { PlantsWithWaterList } from "../../components/plants/PlantWithWaterList.tsx/PlantsWithWater";

export const Garden = () => {
  // const { id } = useParams();
  // const [gardenWithPlants, setGardenWithPlants] = useState<GardenObject>();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3001/garden/${id}`, {
  //         params: { id: id },
  //         withCredentials: true,
  //       });
  //       setGardenWithPlants(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, [id]);
  return (
    <div className={styles.gardenContainer}>
      {/* <progress value={0.5} />
      <span className={styles.gardenName}> {gardenWithPlants?.name}</span>

      {gardenWithPlants && (
        <PlantsWithWaterList plants={gardenWithPlants.plants} />
      )} */}
    </div>
  );
};
