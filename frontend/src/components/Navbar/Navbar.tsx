import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";
import classNames from "classnames";
import { Logout } from "../User/Logout/Logout";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [color, setColor] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90 || location.pathname !== "/") {
        setColor(true);
      } else {
        setColor(false);
      }
    };

    window.addEventListener("scroll", changeColor);
    changeColor();

    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, [location]);

  return (
    <div className={classNames(styles.header, { [styles.black]: color })}>
      <div className={styles.headerContent}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            classNames(styles.navLink, { [styles.active]: isActive })
          }
        >
          <img src="icon.svg" alt="logo" className={styles.logo} />
        </NavLink>

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
        {user ? (
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
              to="/signin"
              className={({ isActive }) =>
                classNames(styles.navLink, { [styles.active]: isActive })
              }
            >
              <span className={styles.userIcon}>Sign in</span>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
