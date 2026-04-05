import { useFinance } from "../context/FinanceContext";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import { groupByMonth } from "../utils/groupByMonth";
import { useState } from "react";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4560",
];

export default function Charts() {
  const { transactions } = useFinance();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // --- Group transactions by date for line chart ---
  const groupedData = Object.values(
    transactions.reduce((acc, t) => {
      if (!acc[t.date]) acc[t.date] = { name: t.date, total: 0, income: 0, expense: 0 };
      acc[t.date].total += t.amount;
      if (t.type === "income") acc[t.date].income += t.amount;
      else acc[t.date].expense += t.amount;
      return acc;
    }, {})
  );

  // --- Filter transactions by date range ---
  const filteredData = groupedData.filter((t) => {
    const txDate = new Date(t.name);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (start && txDate < start) return false;
    if (end && txDate > end) return false;
    return true;
  });

  // --- Pie chart: expense by category based on date range ---
  const filteredTransactions = transactions.filter((t) => {
    const txDate = new Date(t.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (start && txDate < start) return false;
    if (end && txDate > end) return false;
    return true;
  });

  const categoryData = Object.values(
    filteredTransactions.reduce((acc, t) => {
      if (t.type === "expense") {
        acc[t.category] = acc[t.category] || { name: t.category, value: 0 };
        acc[t.category].value += t.amount;
      }
      return acc;
    }, {})
  );

  // --- Monthly bar chart (full data) ---
  const monthlyData = groupByMonth(transactions);

  return (
    <div className="charts-container">

      {/*  Date Range Filter */}
      <div className="top-bars">
        <label>
          Start Date:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      {/*  Line Chart & Pie Chart */}
      <div className="charts-row">
        <div className="chart-box">
          <h3>💹 Daily Transactions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={filteredData}
              margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis
                width="auto"
                label={{ value: "Amount", position: "insideLeft", angle: -90 }}
              />
              <Legend />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} name="Total" />
              <Line type="monotone" dataKey="income" stroke="#00C49F" strokeWidth={2} name="Income" />
              <Line type="monotone" dataKey="expense" stroke="#FF4560" strokeWidth={2} name="Expense" />
            </LineChart>
          </ResponsiveContainer>
          <RechartsDevtools />
        </div>

        <div className="chart-box">
          <h3>🥧 Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Comparison Bar Chart  */}
      <div className="chart-box">
        <h3>📊 Monthly Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#22c55e" />
            <Bar dataKey="expense" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}