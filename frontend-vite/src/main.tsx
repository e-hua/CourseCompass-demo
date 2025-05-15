import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GPAChartPage from "@/pages/GPAChartPage.tsx";
import SearchPage from "@/pages/SearchPage.tsx";
import BookmarkPage from "@/pages/BookMarkPage.tsx";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import RatingsPage from "@/pages/RatingsPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/profile" element={<GPAChartPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/bookmark" element={<BookmarkPage />} />
          <Route path="/ratings" element={<RatingsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </StrictMode>
);
