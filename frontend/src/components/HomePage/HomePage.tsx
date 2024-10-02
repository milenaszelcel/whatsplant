import { Header } from "../Header/Header";
import { Search } from "../Search/Search";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  return (
    <div className={styles.background}>
      <Header />
      <Search />
    </div>
  );
};
