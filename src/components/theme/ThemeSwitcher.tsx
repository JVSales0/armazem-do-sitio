
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
      <Sun className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-yellow-500'}`} />
      <Switch 
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        aria-label="Alternar tema"
        className={`${isDarkMode ? "data-[state=checked]:bg-site-green" : ""}`}
      />
      <Moon className={`h-5 w-5 ${isDarkMode ? 'text-site-green' : 'text-gray-600'}`} />
    </div>
  );
};

export default ThemeSwitcher;
