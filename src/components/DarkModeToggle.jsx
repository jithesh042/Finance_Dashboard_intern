import { useFinance } from "../context/FinanceContext";

const DarkModeToggle = () => {
   const { darkMode, setDarkMode } = useFinance();

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "🌞" : "🌙"}
    </button>
  );
};

export default DarkModeToggle;