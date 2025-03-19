import axios from "axios";
import styles from "./About.module.scss";

export const About = () => {
  const handleClick = async () => {
    try {
      const response = await axios.get("http://localhost:3001/garden", {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={styles.wiersz}>
        <div className={styles.punia}>
          W kartonie małym Punia śpi w ukryciu, Chrapie cichutko, jak w słodkim
          przybyciu. Łapki skulone, ogonek drga lekko, A w snach jej fruwają
          motyle daleko. Punia, koteczka – śpi słodko, niezmiennie, W kartonowym
          domku, w kociej przestrzeni.
        </div>
        <div className={styles.title} onClick={handleClick}>
          Wiersz o kici
        </div>
      </div>
    </div>
  );
};
