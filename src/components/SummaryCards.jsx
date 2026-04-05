import { useFinance } from "../context/FinanceContext";
import { motion } from "framer-motion";

export default function SummaryCards() {
  const { transactions } = useFinance();

  const income = transactions.filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions.filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  const data = [
    { label: "Balance", value: balance },
    { label: "Income", value: income },
    { label: "Expense", value: expense },
  ];

  return (
    <div className="cards">
      {data.map((item, i) => (
        <motion.div
          key={i}
          className="card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
        >
          {item.label}: ₹{item.value}
        </motion.div>
      ))}
    </div>
  );
}