import { createContext, useEffect, useState } from "react";
import { Search } from "../Search/Search";
import styles from "./HomePage.module.scss";
import { Plant } from "../../../../contract/src/plant";

import axios from "axios";
import { PlantsList } from "../plants/PlantList/PlantsList";
import { garden } from "../../contract/src/types/garden";
import { HeaderCover } from "../HeaderCover/HeaderCover";
import { Navbar } from "../Navbar/Navbar";

export const GardenContext = createContext<garden[] | null>(null);

export const HomePage = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [searchValue, setSearchValue] = useState<string>();
  const [gardens, setGardens] = useState<garden[]>([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/plants", {
          params: searchValue ? { search: searchValue } : undefined,
          withCredentials: true,
        });

        setPlants(response.data.plants);
        setGardens(response.data.gardens);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [searchValue]);

  return (
    <GardenContext.Provider value={gardens}>
     
      <HeaderCover />
      <div className={styles.homePageContainer}>
        <div className={styles.text}>
          Find your favorite <span className={styles.gold}>plant</span>
        </div>
        <Search onSearch={setSearchValue} />
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
