import React, { useEffect, useState } from "react";
import styles from "../ExpenseForm/ExpenseForm.module.css";
import { v4 as uuidv4 } from "uuid";

const ExpenseForm = ({
  onAddExpenses,
  onAddOrEditExpense,
  editingExpense,
  clearEditing,
}) => {
  const [expenseDetails, setExpenseDetails] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    id: uuidv4(),
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setExpenseDetails(editingExpense);
    }
  }, [editingExpense]);

  const handleValidation = (inputName, inputValue) => {
    const errors = { ...errorMessage };
    let isValid = true;

    if (!expenseDetails.title.trim()) {
      errors.titleError = "Title for expense is required!";
      isValid = false;
    } else {
      errors.titleError = "";
    }

    if (!expenseDetails.amount.trim()) {
      errors.amountError = "Amount of expense is required!";
      isValid = false;
    } else {
      errors.amountError = "";
    }

    if (!expenseDetails.date) {
      errors.dateError = "Date is required";
      isValid = false;
    } else {
      errors.date = "";
    }

    if (!expenseDetails.category) {
      errors.categoryError = "Please choose a category for the expense!";
      isValid = false;
    } else {
      errors.categoryError = "";
    }

    setErrorMessage(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseDetails((prevDetails) => ({ ...prevDetails, [name]: value }));

    setErrorMessage((prevDetails) => ({
      ...prevDetails,
      [`${name}Error`]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = handleValidation();

    if (!isFormValid) {
      setUploadStatus("Please fill out all the fields!");
      return;
    } else {
      setUploadStatus("Expense submitted successfully! ");
      onAddOrEditExpense(expenseDetails);

      setExpenseDetails({
        title: "",
        amount: "",
        date: "",
        category: "",
        id: uuidv4(),
      });
      setErrorMessage({});
    }
  };

  // cancel
  const handleCancel = () => {
    clearEditing();
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
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <button type="submit" className={styles.submitButton}>
          {editingExpense ? "Update expense" : "Add Expense"}
        </button>
        {editingExpense && <button onClick={handleCancel}>Cancel Edit</button>}
        {uploadStatus && <p>{uploadStatus}</p>}
      </form>
    </div>
  );
};

export default ExpenseForm;
