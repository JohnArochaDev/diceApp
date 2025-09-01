import styles from "./styles.module.scss";
import { Scene } from "../Scene";
import { SceneProvider } from "../../Context";
import { RollButton } from "../RollButton";

export const App = () => {
  return (
    <SceneProvider>
      <div className={styles.background}>
        <Scene />
        <RollButton />
      </div>
    </SceneProvider>
  );
};
