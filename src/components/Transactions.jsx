import { useFinance } from "../context/FinanceContext";
import { useState } from "react";

export default function Transactions() {
  const {
    transactions,
    filter,
    setFilter,
    role,
    editTransaction,
  } = useFinance();

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  //  Filter transactions
  const filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(filter.toLowerCase())
  );

  //  Only allow editing local transactions
  const isLocal = (id) => id > 1000;

  //  Start editing
  const startEdit = (tx) => {
    setEditId(tx.id);
    setEditForm(tx);
  };

  //  Save edited transaction
  const handleSave = () => {
    if (!editForm.category || editForm.amount <= 0) {
      alert("Please enter valid data");
      return;
    }

    const updatedTx = {
      ...editForm,
      amount: Number(editForm.amount),
    };

    editTransaction(updatedTx); //  updates context + localStorage

    setEditId(null);
    setEditForm({});
  };

  //  Cancel editing
  const handleCancel = () => {
    setEditId(null);
    setEditForm({});
  };

  return (
    <div>
      <h2>Transactions</h2>

      {/*  Search */}
      <input
        placeholder="Search..."
        onChange={(e) => setFilter(e.target.value)}
      />

      {/*  Empty State */}
      {filtered.length === 0 && <p>No transactions found</p>}

      {/*  MOBILE VIEW */}
      {filtered.map((tx) => (
        <div className="tx-card" key={tx.id}>
          {editId === tx.id ? (
            <>
              <input
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({ ...editForm, category: e.target.value })
                }
              />

              <input
                type="number"
                value={editForm.amount}
                onChange={(e) =>
                  setEditForm({ ...editForm, amount: e.target.value })
                }
              />

              <select
                value={editForm.type}
                onChange={(e) =>
                  setEditForm({ ...editForm, type: e.target.value })
                }
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>

              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <>
              <p><strong>Date:</strong> {tx.date}</p>
              <p><strong>Amount:</strong> ₹{tx.amount}</p>
              <p><strong>Category:</strong> {tx.category}</p>
              <p><strong>Type:</strong> {tx.type}</p>

              {role === "admin" && isLocal(tx.id) && (
                <button onClick={() => startEdit(tx)}>Edit</button>
              )}
            </>
          )}
        </div>
      ))}

      {/*  DESKTOP TABLE */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((tx) => (
            <tr key={tx.id}>
              {editId === tx.id ? (
                <>
                  <td>{tx.date}</td>

                  <td>
                    <input
                      type="number"
                      value={editForm.amount}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          amount: e.target.value,
                        })
                      }
                    />
                  </td>

                  <td>
                    <input
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          category: e.target.value,
                        })
                      }
                    />
                  </td>

                  <td>
                    <select
                      value={editForm.type}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          type: e.target.value,
                        })
                      }
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </td>

                  <td>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{tx.date}</td>
                  <td>₹{tx.amount}</td>
                  <td>{tx.category}</td>
                  <td>{tx.type}</td>

                  <td>
                    {role === "admin" && isLocal(tx.id) && (
                      <button onClick={() => startEdit(tx)}>Edit</button>
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}