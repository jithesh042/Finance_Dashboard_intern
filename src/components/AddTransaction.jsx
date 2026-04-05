import { useState } from "react";
import { useFinance } from "../context/FinanceContext";

export default function AddTransaction() {
  const { addTransaction, role } = useFinance();

  const [form, setForm] = useState({
    category: "",
    amount: "",
    type: "expense"
  });

  if (role !== "admin") return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.category || !form.amount) return;

    addTransaction({
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      category: form.category,
      amount: Number(form.amount),
      type: form.type
    });

    setForm({ category: "", amount: "", type: "expense" });
  };

  return (
    <form onSubmit={handleSubmit} className="tx-form">
      <h3>Add Transaction</h3>

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
}