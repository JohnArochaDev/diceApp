import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { useScene } from "../../Context";
import { type DiceType } from "../../Context";

export default function DiceSelect() {
  const { selection, setSelection } = useScene()

  const handleChange = (event: SelectChangeEvent) => {
    setSelection(event.target.value as DiceType);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "25vw",
        left: "50%",
        transform: "translateX(-50%)",
        width: "auto",
        zIndex: 9,
        pointerEvents: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel
            sx={{
              color: "white",
              fontWeight: 400,
              "&.MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
                transform: "translate(0, 16px) scale(1)",
                left: 0,
                right: 0,
                textAlign: "center",
              },
              "&.MuiInputLabel-shrink": {
                color: "white",
              },
              "&.Mui-focused": {
                color: "white",
              },
            }}
          >
            Dice
          </InputLabel>
          <Select
            value={selection}
            label="Dice"
            onChange={handleChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#2E3B3E",
                  "& .MuiMenuItem-root": {
                    color: "white",
                  },
                },
              },
            }}
            sx={{
              width: "70vw",
              display: "block",
              outline: "none",
              borderRadius: "8px",
              boxSizing: "border-box",
              backgroundColor: "#2E3B3E",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#d4a017",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#d4a017",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#d4a017",
              },
              "& .MuiSelect-select": {
                textAlign: "center",
                color: "white",
              },
              "& .MuiSelect-icon": {
                color: "#d4a017",
              },
            }}
          >
            <MenuItem value={'d20'}>D20</MenuItem>
            <MenuItem value={'d6'}>D6</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
