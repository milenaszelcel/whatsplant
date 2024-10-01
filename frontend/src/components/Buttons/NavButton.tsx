import styles from "./Button.module.scss";

export const NavButton = (content: string) => {
  return (
    <a href="" className={styles.button}>
      {content}
    </a>
  );
};
