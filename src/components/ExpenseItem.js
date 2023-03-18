import { useContext } from "react";
import classes from "./ExpenseItem.module.css";
import { CartContext } from "./store/cart-context";

const ExpenseItem = () => {
  const ctx = useContext(CartContext);
  const allExpenses = ctx.expenses.map((item) => {
    return (
      <div className={classes.items}>
        <h2>{item.productName}</h2>
        <h2>{item.productPrice}</h2>
        <h2>{item.productCategory}</h2>
        <h2>{item.productDes}</h2>
      </div>
    );
  });
  return (
    <>
      { ctx.isData && <div className={classes.items}>
        <h2>Product Name</h2>
        <h2>Product Category</h2>
        <h2>Product Price</h2>
        <h2>Product Description</h2>
      </div>}
      {allExpenses}
    </>
  );
};
export default ExpenseItem;
