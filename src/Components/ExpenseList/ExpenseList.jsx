import React, { useState } from "react";
import styles from "../ExpenseList/ExpenseList.module.css";

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              <div className={styles.textContainer}>
                Expense for {expense.title} is on ${expense.amount} on{" "}
                {expense.date}. Category: {expense.category}
              </div>
              <div className={styles.toolsContainer}>
                <button onClick={() => onEdit(expense)}>Edit</button>
                <button onClick={() => onDelete(expense.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
