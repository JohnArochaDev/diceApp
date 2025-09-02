import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from "react";

interface SceneContextType {
  simulate: boolean;
  setSimulate: Dispatch<SetStateAction<boolean>>;
  reset: boolean;
  setReset: Dispatch<SetStateAction<boolean>>;
  initialValues: object;
  setInitialValues: Dispatch<SetStateAction<object>>;
  selection: DiceType;
  setSelection: Dispatch<SetStateAction<DiceType>>;
}

export type DiceType = "d6" | "d20";

export const SceneContext = createContext<SceneContextType>({
  simulate: false,
  setSimulate: () => {},
  reset: false,
  setReset: () => {},
  initialValues: {},
  setInitialValues: () => {},
  selection: "d6",
  setSelection: () => "d6",
});

export const useScene = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error("useScene must be used within a SceneContext.Provider");
  }
  return context;
};

export const SceneProvider = ({ children }: { children: ReactNode }) => {
  const [simulate, setSimulate] = useState(false);
  const [reset, setReset] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [selection, setSelection] = useState<DiceType>("d20");

  return (
    <SceneContext.Provider
      value={{
        simulate,
        setSimulate,
        reset,
        setReset,
        initialValues,
        setInitialValues,
        setSelection,
        selection,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
};
