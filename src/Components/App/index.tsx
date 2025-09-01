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
        <Title />
        <DiceSelect />
        <Scene />
        <RollButton />
      </div>
    </SceneProvider>
  );
};
