import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./ExpenseItem.module.css";
import { CartContext } from "./store/cart-context";
import { themeSliceAction } from "./store/theme";

const ExpenseItem = (props) => {
  const ctx = useContext(CartContext);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  console.log(ctx.expenses);
  const totalPrice = ctx.expenses.reduce((total, cur) => {
    return +total + Number(cur.productPrice);
  }, 0);

  const upgrateToPremium = totalPrice >= 12000;

  const premiumFeatures = useSelector((state) => state.theme.activatePremium);
  console.log(premiumFeatures)

  useEffect(() => {
    if (upgrateToPremium < 12000) {
      dispatch(themeSliceAction.activatePremium(false));
    }
  }, [upgrateToPremium, dispatch]);

  const premiumButtonHandler = () => {
    dispatch(themeSliceAction.activatePremium(true));
    alert("All the premium features have been updated");
  };

  const editHandler = (expense) => {
    console.log(expense);
    props.onEdit(expense);
    ctx.editExpense(expense);
  };

  const deleteHandler = (id) => {
    ctx.deleteExpense(id);
  };

  const blob = new Blob([JSON.stringify(ctx.expenses)]);
  console.log(blob)
  const url = URL.createObjectURL(blob);

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
      <div className={classes.premium}>
        {upgrateToPremium && (
          <button  onClick={premiumButtonHandler}>
            UPGRATE TO PREMIUM
          </button>
        )}
        {premiumFeatures && (
          <a href={url} download="file.csv">
            Download
          </a>
        )}
      </div>
    </div>
  );
};
export default ExpenseItem;
