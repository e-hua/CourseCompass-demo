import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GPAChartPage from "@/pages/GPAChartPage.tsx";
import { ThemeProvider } from "@/components/Theme/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/profile" element={<GPAChartPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </StrictMode>
);
