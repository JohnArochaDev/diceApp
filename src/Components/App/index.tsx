import styles from "./styles.module.scss";
import { Scene } from "../Scene";
import { SceneProvider } from "../../Context";
import { RollButton } from "../RollButton";
import DiceSelect from "../DiceSelect";
import { Title } from "../Title";

export const App = () => {
  return (
    <SceneProvider>
      <div className={styles.background}>
        <div className={styles.goldSquareBR} />
        <div className={styles.goldCircleTR} />
        <div className={styles.goldSquareBL} />
        <div className={styles.goldSquareTL} />
        <div className={styles.goldCircleMiddle} />
        <div className={styles.goldCircleMiddleSMall} />
        <Title />
        <DiceSelect />
        <Scene />
        <RollButton />
      </div>
    </SceneProvider>
  );
};
