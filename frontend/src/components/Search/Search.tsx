import { Field, Form, Formik, FormikValues } from "formik";

import styles from "./Search.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { PlantsList } from "../PlantList/PlantsList";

interface MyFormValues {
  searchValue: string;
}

type Props = {
  onSearch: (searchValue: string) => void;
};

export const Search = ({ onSearch }: Props) => {
  const initialValues: MyFormValues = { searchValue: "" };
  const handleSubmit = (values: MyFormValues) => {
    onSearch(values.searchValue);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
  );
};
