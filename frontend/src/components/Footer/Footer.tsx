import styles from "./Footer.module.scss";
import Icon from "../../assets/logo.svg?react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

export const Footer = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.footer}>
      <div className={styles.leftSide}>
        <Icon className={styles.logo} />
        <div className={styles.navigation}>
          <NavLink to="/" className={styles.navLink}>
            Find a plant
          </NavLink>

          <NavLink to="/about" className={styles.navLink}>
            About
          </NavLink>
          {user && (
            <NavLink to="/garden" className={styles.navLink}>
              MyGarden
            </NavLink>
          )}
        </div>
      </div>

      <div className={styles.socialLinks}>
        <Link to="https://www.facebook.com/">
          <FacebookIcon className={styles.socialIcon} fontSize="inherit" />
        </Link>
        <Link to="https://www.instagram.com/">
          <InstagramIcon className={styles.socialIcon} fontSize="inherit" />
        </Link>
        <Link to="https://www.x.com/">
          <XIcon className={styles.socialIcon} fontSize="inherit" />
        </Link>
      </div>
    </div>
  );
};
