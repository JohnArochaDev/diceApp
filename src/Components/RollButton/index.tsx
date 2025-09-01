import styles from "./styles.module.scss";
import { useScene } from "../../Context";

export const RollButton = () => {
  const { setReset, setSimulate, simulate, reset } = useScene();

  const onClick = () => {
    setReset(!reset);
    if (!simulate) {
      setSimulate(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={onClick}
          onMouseDown={() => ({ opacity: 0.7 })}
          onMouseUp={() => ({ opacity: 1 })}
        >
          <span className={styles.buttonText}>Roll</span>
        </button>
      </div>
    </div>
  );
};
