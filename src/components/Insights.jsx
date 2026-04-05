import { useFinance } from "../context/FinanceContext";
import { groupByMonth } from "../utils/groupByMonth";

export default function Insights() {
  const { transactions } = useFinance();

  const monthlyData = groupByMonth(transactions);

  if (monthlyData.length < 2) {
    return <p>Not enough data for insights</p>;
  }

  const latest = monthlyData[monthlyData.length - 1];
  const previous = monthlyData[monthlyData.length - 2];

  const change =
    ((latest.expense - previous.expense) / previous.expense) * 100;

  const isIncrease = change > 0;

  //  Highest spending category
  const categoryTotals = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + t.amount;
    }
  });

  const topCategory = Object.keys(categoryTotals).reduce((a, b) =>
    categoryTotals[a] > categoryTotals[b] ? a : b
  );

  return (
    <div>
      <h2>🧠 Insights</h2>

      <div className="insight-card">
        <p>
           You {isIncrease ? "spent more" : "saved more"} this month by{" "}
          <strong>{Math.abs(change).toFixed(1)}%</strong>
        </p>
      </div>

      <div className="insight-card">
        <p>
           Highest spending category: <strong>{topCategory}</strong>
        </p>
      </div>

      <div className="insight-card">
        <p>
           This Month Expense: ₹{latest.expense}
        </p>
      </div>
    </div>
  );
}