import { useFinance } from "../context/FinanceContext";
import { groupByMonth } from "../utils/groupByMonth";

export default function MonthlySummary() {
  const { transactions } = useFinance();

  const monthlyData = groupByMonth(transactions);

  return (
    <div>
      <h2> Monthly Summary</h2>

      {monthlyData.length === 0 && <p>No data available</p>}

      <div className="monthly-grid">
        {monthlyData.map((m, i) => (
          <div key={i} className="month-card">
            <h3>{m.month}</h3>
            <p> Income: ₹{m.income}</p>
            <p> Expense: ₹{m.expense}</p>
            <p>
               Net: ₹{m.income - m.expense}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}