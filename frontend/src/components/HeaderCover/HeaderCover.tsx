import styles from "./HeaderCover.module.scss";

export const HeaderCover = () => {
  return (
    <div className={styles.coverContainer}>
      <div className={styles.text}>Top picks</div>
      <div className={styles.imageBox}>
        <div className={styles.archBackground}></div>
        <img
          src="HeaderPlants.png"
          alt="Header Plants"
          className={styles.image}
        />
      </div>
    </div>
  );
};
