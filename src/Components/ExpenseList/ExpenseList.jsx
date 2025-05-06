import React from "react";

const ExpenseList = ({ expenses }) => {
  return (
    <div>
      <h2>Expense List</h2>
      {expenses.map((expense) => (
        <li key={expense.id}>
          <strong>{expense.title}</strong> — ${expense.amount} on {expense.date}{" "}
          [{expense.category}]
          <button onClick={() => onDelete(expense.id)}>Delete</button>
        </li>
      ))}
    </div>
  );
};

export default ExpenseList;
