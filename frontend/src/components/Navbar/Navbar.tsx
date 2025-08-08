import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";
import classNames from "classnames";
import { Logout } from "../User/Logout/Logout";

import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Icon from "../../assets/icon.svg?react";
import Logo from "../../assets/logo.svg?react";

type Props = {
  color: boolean;
  setColor: (color: boolean) => void;
};

export const Navbar = ({ color, setColor }: Props) => {
  const { user } = useContext(AuthContext);

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
          <Logo className={styles.logo} />
          <Icon className={styles.icon} />
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
