import { useState, useEffect } from "react";
import styles from "./App.module.css";
import ExpenseForm from "./Components/ExpenseForm/ExpenseForm";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filterMonth, setFilterMonth] = useState("");

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

  return (
    <div>
      <div className={styles.headerContainer}>
        <h1>Expense Tracker</h1>
      </div>

      <ExpenseForm onAddExpenses={handleAddExpenses}></ExpenseForm>
    </div>
  );
}

export default App;
