import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";

import { useColorScheme } from "@mui/material/styles";

function App() {
  const { mode } = useColorScheme();
  if (!mode) {
    return null;
    // This was to prevent the hydration mismatch error.
  } else {
    return (
      <>
        <Sidebar />
        <Dashboard />
      </>
    );
  }
}

export default App;
