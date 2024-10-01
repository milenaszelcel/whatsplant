import { Header } from "../Header/Header";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  return (
    <div className={styles.background}>
      <Header />
    </div>
  );
};
