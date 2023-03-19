import axios from "axios";
import React, { useEffect, useState } from "react";
export const CartContext = React.createContext({
  expenses: [],
  isData: false,
  addExpense: (expense) => {},
});

const BASE_URL = "https://expense-flow-project-default-rtdb.firebaseio.com";

const CartContextProvider = (props) => {
  const [expense, setExpense] = useState([]);
  // const [items,]
  console.log(expense);

  useEffect(() => {
    try {
      const asyncFun = async () => {
        const response = await axios.get(`${BASE_URL}/expenses.json`);
        const data = response.data;
        const keys = Object.keys(data);
        console.log(keys);
        const allData = [];
        for (const keys in data) {
          const expenseObj = {
            key: Math.random(),
            ...data[keys],
          };
          allData.push(expenseObj);
        }
        setExpense(() => {
          return allData;
        });
      };
      asyncFun();
    } catch {}
  }, []);

  const addExpenseHandler = async (expens) => {
    console.log(expense);
    try {
      const response = await axios.post(`${BASE_URL}/expenses.json`, expens);
      // const data = await response.json();
      console.log(response.data);
    } catch (error) {}
    setExpense((prevValue) => {
      return [...prevValue, expens];
    });
  };

  const checkingData = !!expense[0];

  const cartObj = {
    expenses: expense,
    isData: checkingData,
    addExpense: addExpenseHandler,
  };
  console.log(cartObj.expenses);
  return (
    <CartContext.Provider value={cartObj}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
