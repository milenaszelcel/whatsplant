import { Header } from "../Header/Header";
import styles from "./About.module.scss";

export const About = () => {
  return (
    <div>
      <Header />
      <div className={styles.wiersz}>
        <div className={styles.title}>Wiersz o kici</div>
        <div className={styles.punia}>
          W kartonie małym Punia śpi w ukryciu, Chrapie cichutko, jak w słodkim
          przybyciu. Łapki skulone, ogonek drga lekko, A w snach jej fruwają
          motyle daleko. Punia, koteczka – śpi słodko, niezmiennie, W kartonowym
          domku, w kociej przestrzeni.
        </div>
      </div>
    </div>
  );
};
