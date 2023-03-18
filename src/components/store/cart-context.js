import React, { useState } from "react";
export const CartContext = React.createContext({
  expenses: [],
  isData: false,
  addExpense: (expense) => {},
});

const CartContextProvider = (props) => {
  const [expense, setExpense] = useState([]);

  const addExpenseHandler = (expense) => {
    setExpense((prevValue) => {
      return [...prevValue, expense];
    });
  };

  const checkingData = !!expense[0];

  const cartObj = {
    expenses: expense,
    isData: checkingData,
    addExpense: addExpenseHandler,
  };
  return (
    <CartContext.Provider value={cartObj}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
