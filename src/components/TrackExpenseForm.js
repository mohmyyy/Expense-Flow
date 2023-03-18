import { useContext, useRef } from "react";
import { CartContext } from "../components/store/cart-context";
import classes from "./TrackExpenseForm.module.css";
const TrackExpenseForm = () => {
  const productNameRef = useRef();
  const productPriceRef = useRef();
  const productDesRef = useRef();
  const productCategoryRef = useRef();
  const ctx = useContext(CartContext);

  const expenseSubmitHandler = (event) => {
    event.preventDefault();
    const expense = {
      productName: productNameRef.current.value,
      productPrice: productPriceRef.current.value,
      productDes: productDesRef.current.value,
      productCategory: productCategoryRef.current.value,
    };
    ctx.addExpense(expense);
  };
  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <label>Product Name</label>
        <input type="text" ref={productNameRef} />
        <label>Amount Spent</label>
        <input type="number" ref={productPriceRef} />
        <label>Description</label>
        <textarea ref={productDesRef} />
        <label>Category</label>
        <select ref={productCategoryRef}>
          <option value="">Select a Category </option>
          <option value="Accomadation">Rent</option>
          <option value="stocks">Stocks</option>
          <option value="food">Food</option>
        </select>
        <button onClick={expenseSubmitHandler}>Submit</button>
      </form>
    </div>
  );
};

export default TrackExpenseForm;
