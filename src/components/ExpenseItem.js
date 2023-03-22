import { useContext, useState } from "react";
import classes from "./ExpenseItem.module.css";
import { CartContext } from "./store/cart-context";

const ExpenseItem = (props) => {
  const ctx = useContext(CartContext);
  console.log(ctx.expenses);
  const totalPrice = ctx.expenses.reduce((total, cur) => {
    return +total + Number(cur.productPrice);
  }, 0);
  const upgrateToPremium = totalPrice >= 12000;

  const editHandler = (expense) => {
    console.log(expense);
    props.onEdit(expense);
    ctx.editExpense(expense);
  };
  const deleteHandler = (id) => {
    ctx.deleteExpense(id);
  };

  const allExpenses = ctx.expenses.map((item) => {
    return (
      <div className={classes.card}>
        <div className={classes.items}>
          <h2>{item.productName}</h2>
          <h2>{item.productPrice}</h2>
          <h2>{item.productCategory}</h2>
          <h2>{item.productDes}</h2>
        </div>
        <div className={classes.button}>
          <button
            onClick={() => {
              editHandler(item);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteHandler(item.key);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });
  return (
    <div className={classes.container}>
      {ctx.isData && (
        <div className={classes.items}>
          <h2>Product Name</h2>
          <h2>Product Price</h2>
          <h2>Product Category</h2>
          <h2>Product Description</h2>
        </div>
      )}
      {allExpenses}
      <div>
        {upgrateToPremium && (
          <button className={classes.premium}>UPGRATE TO PREMIUM</button>
        )}
      </div>
    </div>
  );
};
export default ExpenseItem;
