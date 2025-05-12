// ❯ npm install @mui/material @emotion/react @emotion/styled
// ❯ npm install @mui/icons-material

import { createTheme } from "@mui/material/styles";
import { blue, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[800], // Tailwind's blue-800
    },
    secondary: {
      main: purple[500], // Tailwind's purple-500
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif", // Adjust as needed
  },
});

export default theme;
