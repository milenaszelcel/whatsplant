import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import classNames from "classnames";
import { Logout } from "../User/Logout/Logout";

export const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.navigationMenu}>
        <NavLink to="/">
          <img src="logo.svg" alt="logo" className={styles.logo} />
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            classNames(styles.navLink, { [styles.active]: isActive })
          }
        >
          Find a plant
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

      {document.cookie ? (
        <div className={styles.rightMenu}>
          <NavLink
            to="/myGarden"
            className={({ isActive }) =>
              classNames(styles.navLink, { [styles.active]: isActive })
            }
          >
            My Garden
          </NavLink>
          <Logout />
        </div>
      ) : (
        <NavLink
          to="/Login"
          className={({ isActive }) =>
            classNames(styles.navLink, { [styles.active]: isActive })
          }
        >
          Login
        </NavLink>
      )}
    </div>
  );
};
