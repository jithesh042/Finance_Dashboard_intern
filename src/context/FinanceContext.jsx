import { createContext, useContext, useState, useEffect } from "react";
import { transactionsData } from "../data/mockData";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  //  Load only added transactions from localStorage
  const [localTransactions, setLocalTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [role, setRole] = useState("viewer");
  const [filter, setFilter] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  //  Combine mock + local
  const transactions = [...transactionsData, ...localTransactions];

  //  Save only local transactions
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(localTransactions));
  }, [localTransactions]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const addTransaction = (tx) => {
    setLocalTransactions((prev) => [...prev, tx]);
  };
const editTransaction = (updatedTx) => {
  setLocalTransactions((prev) =>
    prev.map((tx) =>
      tx.id === updatedTx.id ? updatedTx : tx
    )
  );
};

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        role,
        setRole,
        filter,
        setFilter,
        addTransaction,
        editTransaction,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);