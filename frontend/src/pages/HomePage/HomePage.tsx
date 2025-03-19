import { createContext, useEffect, useState } from "react";

import styles from "./HomePage.module.scss";
import { Plant } from "../../../../contract/src/plant";
import axios from "axios";
import { PlantsList } from "../../components/plants/PlantList/PlantsList";
import { garden } from "../../contract/src/types/garden";
import { HeaderCover } from "../../components/HeaderCover/HeaderCover";
import { PageNumberNavigation } from "../../components/PageNumberNavigation/PageNumberNavigation";

export const GardenContext = createContext<garden[] | null>(null);

export const HomePage = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [searchValue, setSearchValue] = useState<string>();
  const [gardens, setGardens] = useState<garden[]>([]);
  const [errorMessage, setErrorMessage] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/plants", {
        params: { search: searchValue, page: currentPage },
        withCredentials: true,
      });

      setPlants(response.data.plants);
      setGardens(response.data.gardens);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [searchValue]);

  return (
    <GardenContext.Provider value={gardens}>
      <HeaderCover setSearchValue={setSearchValue} />

      <div className={styles.homePageContainer}>
        <PageNumberNavigation
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {!plants ? (
          <div className={styles.errorMessage}>
            {errorMessage} <img src="no-result-found.svg" alt="logo" />
          </div>
        ) : (
          <PlantsList plants={plants} />
        )}
      </div>
    </GardenContext.Provider>
  );
};
