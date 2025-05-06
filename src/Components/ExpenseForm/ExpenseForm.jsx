import React, { useState } from "react";
import styles from "../ExpenseForm/ExpenseForm.module.css";
import { v4 as uuidv4 } from "uuid";

const ExpenseForm = ({ onAddExpenses }) => {
  const [expenseDetails, setExpenseDetails] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    id: uuidv4(),
  });

  const [errorMessage, setErrorMessage] = useState("");

  //   const [expenseList, setExpenseList] = useState([]);

  const handleValidation = (inputName, inputValue) => {
    const errors = { ...errorMessage };
    let isValid = true;

    if (!expenseDetails.title.trim()) {
      errors.titleError = "Title for expense is required!";
    } else {
      errors.titleError = "";
    }

    if (!expenseDetails.amount.trim()) {
      errors.amountError = "Amount of expense is required!";
    } else {
      errors.amountError = "";
    }

    if (!expenseDetails.date) {
      errors.dateError = "Date is required";
    } else {
      errors.date = "";
    }

    if (!expenseDetails.category) {
      errors.categoryError = "Please choose a category for the expense!";
    } else {
      errors.categoryError = "";
    }

    setErrorMessage(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseDetails((prevDetails) => ({ ...prevDetails, [name]: value }));

    // for validation
    setErrorMessage((prevDetails) => ({
      ...prevDetails,
      [`${name}Error`]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = handleValidation();

    // if (!isFormValid) {
    //   return;
    // } else {
    //   //   onAddExpense(expenseDetails);
    //   setExpenseList((prev) => [...prev, expenseDetails]);
    //   setExpenseDetails({
    //     title: "",
    //     amount: "",
    //     date: "",
    //     category: "",
    //     id: uuidv4(),
    //   });
    // }

    if (!isFormValid) return;
    onAddExpenses(expenseDetails);
    setExpenseDetails({
      title: "",
      amount: "",
      date: "",
      category: "",
      id: uuidv4(),
    });
    setErrorMessage({});
  };

  return (
    <div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {/* ---------------- */}
        <div className={styles.formGroup}>
          <label htmlFor="title">Title of Expense:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={expenseDetails.title}
            onChange={handleChange}
          />
          <p className={styles.errorMessage}>{errorMessage.titleError}</p>
        </div>
        {/* ---------------- */}
        <div className={styles.formGroup}>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={expenseDetails.amount}
            onChange={handleChange}
          />
          <p className={styles.errorMessage}>{errorMessage.amountError}</p>
        </div>

        {/* ---------------- */}
        <div className={styles.formGroup}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            id="date"
            value={expenseDetails.date}
            onChange={handleChange}
          />
          <p className={styles.errorMessage}>{errorMessage.dateError}</p>
        </div>

        {/* ---------------- */}
        <div className={styles.formGroup}>
          <label htmlFor="category">Expense Category:</label>
          <select
            name="category"
            id="category"
            value={expenseDetails.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            <option value="housing">Housing</option>
            <option value="utilities">Utilities</option>
            <option value="grocery">Grocery</option>
            <option value="transportation">Transportation</option>
            <option value="clothing">Clothing</option>
            <option value="other">Other</option>
          </select>
          <p className={styles.errorMessage}>{errorMessage.categoryError}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
