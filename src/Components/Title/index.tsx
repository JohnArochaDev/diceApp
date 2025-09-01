import styles from "./styles.module.scss";

export const Title = () => {
  return (
    <div className={styles.titleContainer}>
      <img src="/images/D20Icon.png" alt="D20 Icon" className={styles.icon} />
      <h1 className={styles.title}>DICE ROLLER</h1>
    </div>
  );
};