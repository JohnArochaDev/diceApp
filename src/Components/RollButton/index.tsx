import styles from "./styles.module.scss";
import { useScene } from "../../Context";
import { Button } from "@mui/material";
import Icon from "@mdi/react";
import { mdiDice5 } from "@mdi/js";

import "./styles.module.scss";

export const RollButton = () => {
  const { setReset, setSimulate, simulate, reset } = useScene();

  const sx = {
    height: "5vh",
    width: "70vw",
    backgroundColor: "#4a2c2a",
    borderRadius: "16px",
    padding: "14px 32px",
    border: "1px solid #d4a017",
    boxShadow: "0 0 10px 4px rgba(212,160,23,.2), 0 4px 6px rgba(0,0,0,0.1)", // soft yellow glow with falloff + fainter shadow    transition: "opacity 0.2s",
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",
    userSelect: "none",
    fontFamily: '"SpaceMono", monospace',
    color: "#e8e3d3",
    fontSize: "18px",
    fontWeight: 600,
    textTransform: "uppercase",
    textAlign: "center",
    "&:hover": {
      opacity: 0.7,
      backgroundColor: "#4a2c2a",
    },
  };

  const onClick = () => {
    setReset(!reset);
    if (!simulate) {
      setSimulate(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button variant="contained" onClick={onClick} sx={sx}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Icon path={mdiDice5} size={1} className={styles.iconLeft} />
            </span>
            <span style={{ margin: "0 auto", textAlign: "center" }}>ROLL</span>
            <span
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Icon path={mdiDice5} size={1} className={styles.iconRight} />
            </span>
          </span>
        </Button>
      </div>
    </div>
  );
};
