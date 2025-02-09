
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-10 w-16 rounded-full bg-muted p-1 transition-colors hover:bg-muted/80"
    >
      <div
        className={`absolute inset-0 flex w-full items-center duration-200 ease-in-out ${
          isDark ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary shadow-sm transition-transform duration-200 dark:bg-primary dark:text-white ${
            isDark ? "translate-x-6" : "translate-x-0"
          }`}
        >
          {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </div>
      </div>
    </Button>
  );
};

export default ThemeToggle;
