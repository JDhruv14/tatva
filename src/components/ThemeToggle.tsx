import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { forwardRef } from "react";

export const ThemeToggle = forwardRef<HTMLButtonElement>((props, ref) => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      ref={ref}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full transition-all duration-300 hover:bg-surface group"
      aria-label="Toggle theme"
      {...props}
    >
      <Sun className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors hidden dark:block" strokeWidth={1.5} />
      <Moon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors dark:hidden" strokeWidth={1.5} />
    </button>
  );
});

ThemeToggle.displayName = "ThemeToggle";

export default ThemeToggle;