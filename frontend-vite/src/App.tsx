import Dashboard from "./components/Dashboard/Dashboard";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import Layout from "@/components/Sidebar/layout";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Dashboard />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
