import styles from "./HeaderCover.module.scss";
import { Search } from "../../components/Search/Search";

type Props = {
  setSearchValue: (searchValue: string) => void;
};

export const HeaderCover = ({ setSearchValue }: Props) => {
  return (
    <div className={styles.coverContainer}>
      <div className={styles.coverContent}>
        <div className={styles.coverText}>
          Find your favorite <span className={styles.gold}>plant</span>
        </div>
        <Search onSearch={setSearchValue} />
      </div>
      <img src="cover.svg" alt="cover" className={styles.cover} />;
    </div>
  );
};
