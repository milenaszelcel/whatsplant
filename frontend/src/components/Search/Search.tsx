import styles from "./Search.module.scss";
import { FieldWithButtonForm } from "../FieldWithButtonForm/FieldWithButtonForm";
import SearchIcon from "@mui/icons-material/Search";
interface MyFormValues {
  searchValue: string;
}

type Props = {
  onSearch: (searchValue: string) => void;
};

export const Search = ({ onSearch }: Props) => {
  const handleSubmit = (values: MyFormValues) => {
    onSearch(values.searchValue);
  };
  return (
    <FieldWithButtonForm
      handleSubmit={handleSubmit}
      initialValues={{ searchValue: "" }}
      placeHolder="Search"
      name="searchValue"
      icon={<SearchIcon />}
    />
  );
};
