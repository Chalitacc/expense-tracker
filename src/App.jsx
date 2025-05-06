import { useState, useEffect } from "react";
import styles from "./App.module.css";
import ExpenseForm from "./Components/ExpenseForm/ExpenseForm";
import ExpenseList from "./Components/ExpenseList/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filterMonth, setFilterMonth] = useState("");

  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpenses = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const handleAddOrEdit = (expense) => {
    if (editingExpense) {
      const updatedExpenses = expenses.map((exp) =>
        exp.id === expense.id ? expense : exp
      );
      setExpenses(updatedExpenses);
      setEditingExpense(null);
    } else {
      setExpenses((prev) => [...prev, expense]);
    }
  };

  const handleStartEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleDelete = (id) => {
    const updateExpense = expenses.filter((exp) => exp.id !== id);
    setExpenses(updateExpense);
  };

  const filtereExpense = filterMonth
    ? expenses.filter((exp) => exp.date.slice(5, 7) === filterMonth)
    : expenses;

  const totalAmount = filtereExpense.reduce(
    (acc, curr) => acc + parseFloat(curr.amount),
    0
  );

  return (
    <div>
      <div className={styles.headerContainer}>
        <h1>Expense Tracker</h1>
      </div>

      {/* Expense form */}
      <div className={styles.formContainer}>
        <ExpenseForm
          onAddExpenses={handleAddExpenses}
          onAddOrEditExpense={handleAddOrEdit}
          editingExpense={editingExpense}
          clearEditing={() => setEditingExpense(null)}
        ></ExpenseForm>
      </div>

      {/* Expense list */}
      <div className={styles.expenseListContainer}>
        <div className={styles.totalExpenseContainer}>
          <h2>Total Expense: ${totalAmount.toFixed(2)}</h2>
          <ExpenseList
            expenses={filtereExpense}
            onDelete={handleDelete}
            onEdit={handleStartEdit}
          ></ExpenseList>
        </div>
      </div>
    </div>
  );
}

export default App;
