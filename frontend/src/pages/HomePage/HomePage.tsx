import { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import axios from "axios";
import { PlantsList } from "../../components/plants/PlantList/PlantsList";
import { HeaderCover } from "../../components/HeaderCover/HeaderCover";
import { PageNumberNavigation } from "../../components/PageNumberNavigation/PageNumberNavigation";
import { Plant } from "@greenmate/contract/src/types/plant";
import { PlantTypeFilterGroup } from "../../components/PlantTypeFilterGroup/PlantTypeFilterGroup";

export const HomePage = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  // const [searchValue, setSearchValue] = useState<string>();
  const [displayedPlants, setDisplayedPlants] = useState<Plant[]>(plants);
  const [errorMessage] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/plants", {
          params: { page: currentPage },
          withCredentials: true,
        });

        setPlants(response.data.plants);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.coverWithFilters}>
        <HeaderCover />
        <PlantTypeFilterGroup
          allPlants={plants}
          setDisplayedPlants={setDisplayedPlants}
        />
      </div>

      <div className={styles.homePageContainer}>
        <PageNumberNavigation
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {!displayedPlants ? (
          <div className={styles.errorMessage}>
            {errorMessage} <img src="no-result-found.svg" alt="logo" />
          </div>
        ) : (
          <PlantsList plants={displayedPlants} />
        )}
      </div>
    </>
  );
};
