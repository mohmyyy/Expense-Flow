import { useContext, useRef } from "react";
import { CartContext } from "../components/store/cart-context";
import ExpenseItem from "../components/ExpenseItem";
import { useDispatch, useSelector } from "react-redux";
import { themeSliceAction } from "../components/store/theme";
import classes from "./TrackExpenseForm.module.css";

let existingExpense = null;

const TrackExpenseForm = () => {
  const ctx = useContext(CartContext);
  const productNameRef = useRef();
  const productPriceRef = useRef();
  const productDesRef = useRef();
  const productCategoryRef = useRef();

  const mode = useSelector((state) => state.theme.darkMode);
  console.log(mode)
  const premiumFeatures = useSelector((state) => state.theme.activatePremium);

  console.log(premiumFeatures)
  const dispatch = useDispatch();

  console.log(mode);

  const changeModeHandler = () => {
    dispatch(themeSliceAction.darkModeActivate());
  };

  const editExpenseHandler = (expense) => {
    console.log(expense);
    productNameRef.current.value = expense.productName;
    productPriceRef.current.value = expense.productPrice;
    productDesRef.current.value = expense.productDes;
    productCategoryRef.current.value = expense.productCategory;
    existingExpense = expense.key;
  };

  const expenseSubmitHandler = (event) => {
    event.preventDefault();
    const expenseObj = {
      productName: productNameRef.current.value,
      productPrice: productPriceRef.current.value,
      productDes: productDesRef.current.value,
      productCategory: productCategoryRef.current.value,
    };
    const isPresent = existingExpense;
    ctx.addExpense(expenseObj, isPresent);
    existingExpense = null;
  };
  return (
    <div className={`${mode ? classes.dark : ""}`}>
      {premiumFeatures && <button className={classes.themeButton} onClick={changeModeHandler}>darkMode</button>}
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
        <ExpenseItem onEdit={editExpenseHandler} />
      </div>
    </div>
  );
};

export default TrackExpenseForm;
