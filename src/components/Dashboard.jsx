import { useFinance } from "../context/FinanceContext";
import SummaryCards from "./SummaryCards";
import Charts from "./Charts";
import Transactions from "./Transactions";
import Insights from "./Insights";
import RoleSwitcher from "./RoleSwitcher";
import ExportButton from "./ExportButton";
import DarkModeToggle from "./DarkModeToggle";
import AddTransaction from "./AddTransaction";
import MonthlySummary from "./MonthlySummary";

const Dashboard = () => {
  const { darkMode } = useFinance();

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <h1>Dashboard</h1>

      <div className="top-bar">
        <RoleSwitcher />
        <ExportButton />
        <DarkModeToggle/>
      </div>

      <SummaryCards />
      <Charts />
      <AddTransaction />
      <Transactions />
      <Insights />
      <MonthlySummary/>
    </div>
  );
};

export default Dashboard;