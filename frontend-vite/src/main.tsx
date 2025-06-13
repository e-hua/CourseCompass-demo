import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GPAChartPage from "@/pages/GPAChartPage.tsx";
import CoursesPage from "@/pages/CoursesPage.tsx";
import BookmarkPage from "@/pages/BookMarkPage.tsx";
import { ThemeProvider } from "@/components/ui/theme-provider.tsx";
import RatingsPage from "@/pages/RatingsPage.tsx";
import { UserProvider } from "./components/my-hooks/UserProfileContext.tsx";
import { Toaster } from "sonner";
import AcademicPlanPage from "@/pages/AcademicPlanPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CoursePage from "./pages/CoursePage.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Toaster richColors position="top-center" />
          <Router>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/profile" element={<GPAChartPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/plan" element={<AcademicPlanPage />} />
              <Route path="/bookmark" element={<BookmarkPage />} />
              <Route path="/ratings" element={<RatingsPage />} />
              <Route path="/courses/:moduleCode" element={<CoursePage />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);
