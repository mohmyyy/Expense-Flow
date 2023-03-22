import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = { expenses: [], isData: false };

const storeSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    addExpense(expense) {},
    deleteExpense() {},
    editExpense() {},
  },
});
