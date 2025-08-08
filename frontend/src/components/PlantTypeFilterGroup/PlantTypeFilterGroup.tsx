import { useEffect, useState } from "react";
import { Plant } from "../../../../contract/src/types/plant";
import { PlantTypeFilter } from "../PlantTypeFilter/PlantTypeFilter";
import styles from "./PlantTypeFilterGroup.module.scss";

type Props = {
  allPlants: Plant[];
  setDisplayedPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
};
export const PlantTypeFilterGroup = ({
  allPlants,
  setDisplayedPlants,
}: Props) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const indoorPlants = allPlants.filter((plant) => plant.indoor);
  const outdoorPlants = allPlants.filter((plant) => !plant.indoor);

  useEffect(() => {
    if (activeFilter === "Indoor") {
      setDisplayedPlants(allPlants.filter((p) => p.indoor));
    } else if (activeFilter === "Outdoor") {
      setDisplayedPlants(allPlants.filter((p) => !p.indoor));
    } else {
      setDisplayedPlants(allPlants);
    }
  }, [activeFilter, allPlants]);
  return (
    <div className={styles.filterGroup}>
      <PlantTypeFilter
        number={allPlants.length}
        filterName="All"
        setActiveFilter={setActiveFilter}
        isActive={activeFilter === "All"}
      />
      <PlantTypeFilter
        number={indoorPlants.length}
        filterName="Indoor"
        setActiveFilter={setActiveFilter}
        isActive={activeFilter === "Indoor"}
      />
      <PlantTypeFilter
        number={outdoorPlants.length}
        filterName="Outdoor"
        setActiveFilter={setActiveFilter}
        isActive={activeFilter === "Outdoor"}
      />
    </div>
  );
};
