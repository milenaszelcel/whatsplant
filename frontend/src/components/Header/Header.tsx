import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import classNames from "classnames";

export const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <NavLink to="/">
        <img src="logo.svg" alt="logo" className={styles.logo} />
      </NavLink>
      <div className={styles.navigationMenu}>
        <NavLink
          to="/"
          // className={styles.navLink}
          className={({ isActive }) =>
            classNames(styles.navLink, { [styles.active]: isActive })
          }
        >
          Find a plant
        </NavLink>
        <NavLink
          to="/myGarden"
          className={({ isActive }) =>
            classNames(styles.navLink, { [styles.active]: isActive })
          }
        >
          My Garden
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            classNames(styles.navLink, { [styles.active]: isActive })
          }
        >
          About
        </NavLink>
      </div>

      <div className={styles.hamburgerMenu}>
        <NavLink to="/myGarden">
          <img src="garden.svg" alt="garden" />
        </NavLink>
        <button></button>
      </div>
    </div>
  );
};
