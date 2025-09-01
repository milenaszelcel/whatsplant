import { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import axios from "axios";
import { PlantsList } from "../../components/plants/PlantList/PlantsList";
import { HeaderCover } from "../../components/HeaderCover/HeaderCover";
import { PageNumberNavigation } from "../../components/PageNumberNavigation/PageNumberNavigation";
import { Plant } from "@greenmate/contract/src/types/plant";
import { PlantTypeFilterGroup } from "../../components/PlantTypeFilterGroup/PlantTypeFilterGroup";

const ITEMS_PER_PAGE = Number(import.meta.env.VITE_ITEMS_PER_PAGE) || 50;

export const HomePage = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  // const [searchValue, setSearchValue] = useState<string>();
  const [displayedPlants, setDisplayedPlants] = useState<Plant[]>(plants);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/plants", {
          params: { page: currentPage },
          withCredentials: true,
        });

        const total = response.data.totalPlants;
        const totalPages = total ? Math.ceil(total / ITEMS_PER_PAGE) : 0;

        setPlants(response.data.plants);
        setPageCount(totalPages);
      } catch (error) {
        console.log(error);
        setErrorMessage("Failed to load plants. Please try again later.");
      }
    };
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    setDisplayedPlants(plants);
  }, [plants]);

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
          pageCount={pageCount}
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
