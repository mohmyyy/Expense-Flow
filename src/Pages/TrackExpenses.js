import React from "react";
import ExpenseItem from "../components/ExpenseItem";
import TrackExpenseForm from "../components/TrackExpenseForm";

const TrackExpenses = () => {
  return (
    <React.Fragment>
      <TrackExpenseForm />
      <ExpenseItem />
    </React.Fragment>
  );
};

export default TrackExpenses;
