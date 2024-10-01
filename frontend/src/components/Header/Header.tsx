import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <img src="logo.svg" alt="logo" className={styles.logo} />
      <a>Find a plant</a>
      <a>My garden</a>
      <a>About</a>
      <div>
        <a>
          <img src="garden.svg" alt="garden" />
        </a>
        <button></button>
      </div>
    </div>
  );
};
