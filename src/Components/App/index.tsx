import styles from "./styles.module.scss";
import { Scene } from "../Scene";
import { SceneProvider } from "../../Context";
import { RollButton } from "../RollButton";
import DiceSelect from "../DiceSelect";

export const App = () => {
  return (
    <SceneProvider>
      <div className={styles.background}>
        <DiceSelect />
        <Scene />
        <RollButton />
      </div>
    </SceneProvider>
  );
};
