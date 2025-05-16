import React, { useState } from "react";
import styles from "../ExpenseList/ExpenseList.module.css";

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  return (
    <div>
      {/* <h2 className={styles.titleForExpenseList}>Expenses</h2> */}
      {expenses.length === 0 ? (
        <p className={styles.expenseNotFound}>No expenses found</p>
      ) : (
        <>
          <div className={styles.listHeader}>
            <p>Title</p>
            <p>Amount</p>
            <p>Date</p>
            <p>Category</p>
            <p>Action</p>
          </div>

          <ul className={styles.listContainer}>
            {expenses.map((expense) => (
              <li key={expense.id} className={styles.listItems}>
                <p>{expense.title}</p>
                <p>{expense.amount}</p>
                <p>{expense.date}</p>
                <p>{expense.category}</p>

                {/* <div className={styles.textContainer}>
                Expense for {expense.title} is on ${expense.amount} on{" "}
                {expense.date}. Category: {expense.category}
              </div> */}
                <div className={styles.toolsContainer}>
                  <button
                    onClick={() => onEdit(expense)}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ExpenseList;
