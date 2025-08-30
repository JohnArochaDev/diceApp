import styles from "./styles.module.scss";
import { Scene } from "../Scene";

export const App = () => {
  return (
    <div className={styles.background}>
      <Scene />
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => console.log("Roll button pressed!")}
            onMouseDown={() => ({ opacity: 0.7 })}
            onMouseUp={() => ({ opacity: 1 })}
          >
            <span className={styles.buttonText}>Roll</span>
          </button>
        </div>
      </div>
    </div>
  );
};
