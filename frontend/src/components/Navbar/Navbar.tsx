import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import classNames from "classnames";
import { Logout } from "../User/Logout/Logout";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export const Navbar = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.navigationMenu}>
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

        {document.cookie.indexOf("token") !== -1 ? (
          <div className={styles.rightMenu}>
            <NavLink
              to="/myGarden"
              className={({ isActive }) =>
                classNames(styles.navLink, { [styles.active]: isActive })
              }
            >
              My Garden
            </NavLink>
            <hr className={styles.line} />
            <Logout />
          </div>
        ) : (
          <div className={styles.rightMenu}>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                classNames(styles.navLink, { [styles.active]: isActive })
              }
            >
              <span className={styles.userIcon}>
                <PersonOutlineOutlinedIcon fontSize="large" />
              </span>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
