import { Brightness3, Brightness7 } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors duration-300"
    >
      {theme === "light" ? (
        <Brightness7 className="h-full w-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <Brightness3 className="absolute h-full w-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
    </Button>
  );
}
