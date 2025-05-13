import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// https://mui.com/material-ui/customization/dark-mode/
// Hook works right out of the box, no reinventing wheels

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme} defaultMode="dark">
      <App />
    </ThemeProvider>
  </StrictMode>
);
