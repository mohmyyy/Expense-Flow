import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
export const CartContext = React.createContext({
  expenses: [],
  isData: false,
  addExpense: (expense) => {},
  deleteExpense: (id) => {},
  editExpense: (id) => {},
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
        // if(!response.code){
        //   throw new Error('Error')
        // }
        const keys = Object.keys(data);
        console.log(keys);
        const allData = [];
        for (const keys in data) {
          const expenseObj = {
            key: keys,
            ...data[keys],
          };
          allData.push(expenseObj);
        }
        setExpense(() => {
          return allData;
        });
      };
      asyncFun();
    } catch (error) {
      alert(error);
    }
  }, []);

  const addExpenseHandler = async (expens,isPresent) => {
    console.log(expense);
    if (isPresent) {
      try {
        const response = await axios.put(`${BASE_URL}/expenses/${isPresent}.json`, expens);
        // const data = await response.json();
        console.log(response.data);
      } catch (error) {}
    } else {
      try {
        const response = await axios.post(`${BASE_URL}/expenses.json`, expens);
        // const data = await response.json();
        console.log(response.data);
      } catch (error) {}
    }
    setExpense((prevValue) => {
      return [...prevValue, expens];
    });
  };

  const deleteExpenseHandler = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/expenses/${id}.json`);
      console.log(expense);
      console.log(id);
      const updatedExpenses = expense.filter((item) => {
        return item.key !== id;
      });
      console.log(updatedExpenses);
      setExpense(() => {
        return [...updatedExpenses];
      });
    } catch (error) {}
  };
  const editExpenseHandler = async (id) => {
    console.log(id);
    const updatedExpenses = expense.filter((item) => {
      return item.key !== id.key;
    });
    console.log(updatedExpenses);
    setExpense(() => {
      return [...updatedExpenses];
    });

    // setExpense(() => {
    //   return [...updatedExpenses];
    // });
    // try {
    //   const response = await axios.post(`${BASE_URL}/expenses.json/${id}`);
    //   // const data = await response.json();
    //   console.log(response.data);
    // } catch (error) {}
    // setExpense((prevValue) => {
    //   return [...prevValue];
    // });
  };
  const checkingData = !!expense[0];

  const cartObj = {
    expenses: expense,
    isData: checkingData,
    
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
    editExpense: editExpenseHandler,
  };
  console.log(cartObj.expenses);
  return (
    <CartContext.Provider value={cartObj}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
