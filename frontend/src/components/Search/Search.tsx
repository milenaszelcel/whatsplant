import axios from "axios";
import { Field, Form, Formik, FormikValues } from "formik";
import { useState } from "react";
import { Plant } from "contract/plant";
import styles from "./Search.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { PlantsList } from "../PlantList/PlantsList";

interface MyFormValues {
  searchValue: string;
}

export const Search = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const initialValues: MyFormValues = { searchValue: "" };

  const onSubmit = async (values: FormikValues) => {
    const searchResult = await axios.get("http://localhost:3001/plants", {
      params: { search: values.searchValue },
    });
    setPlants(searchResult.data);
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className={styles.searchForm}>
          <Field
            id="searchValue"
            name="searchValue"
            placeholder="Search for plants..."
            className={styles.searchInput}
          ></Field>
          <button type="submit" className={styles.searchButton}>
            <SearchIcon className={styles.searchIcon} />
          </button>
        </Form>
      </Formik>
      <PlantsList plants={plants} />
    </div>
  );
};
