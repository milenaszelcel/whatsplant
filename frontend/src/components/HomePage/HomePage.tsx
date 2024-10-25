import { useEffect, useState } from "react";
import { Search } from "../Search/Search";
import styles from "./HomePage.module.scss";
import { Plant } from "../../../../contract/src/plant";

import axios from "axios";
import { PlantsList } from "../PlantList/PlantsList";

export const HomePage = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [searchValue, setSearchValue] = useState<string>();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/plants",
          searchValue ? { params: { search: searchValue } } : undefined
        );
        setPlants(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [searchValue]);

  return (
    <div className={styles.homePageContainer}>
      <Search onSearch={setSearchValue} />
      {!plants.length ? (
        <div className={styles.errorMessage}>
          {errorMessage} <img src="no-result-found.svg" alt="logo" />
        </div>
      ) : null}

      <PlantsList plants={plants} />
    </div>
  );
};
