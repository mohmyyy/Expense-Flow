import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../components/store/store";
import ChangePassword from "../ChangePassword";
import AuthPage from "./AuthPage";

describe("chnage Password component", () => {
  test("Change Password", () => {
    render(<ChangePassword />); //Arrange
    //Act ---
    //Assert
    const changePasswordElement = screen.getByText("Forgot Password?");
    expect(changePasswordElement).toBeInTheDocument;
  });

  test("don't worry messgae", () => {
    render(<ChangePassword />); //Arrange
    //Act ---
    //Assert
    const changePasswordMessageElement = screen.getByText("Don't Worry", {
      exact: false,
    });
    expect(changePasswordMessageElement).toBeInTheDocument;
  });

  test("change password button", () => {
    render(<ChangePassword />); //Arrange
    //Act ---
    //Assert
    const changePasswordButton = screen.getByRole("button");
    expect(changePasswordButton).toBeInTheDocument;
  });

  test("change password input", () => {
    render(<ChangePassword />); //Arrange
    //Act ---
    //Assert
    const changePasswordForm = screen.getByPlaceholderText(
      "Enter your Email here"
    );
    expect(changePasswordForm).toBeRequired;
  });
});

describe("AuthPage component", () => {
  test("rendering signUp element", () => {
    //Access
    render(
      <Provider store={store}>
        <AuthPage />
      </Provider>
    );
    //Act
    //Assert
    const getSignUpElement = screen.getByText("Have an account? (Log In)", {
      exact: false,
    });
    expect(getSignUpElement).toBeInTheDocument;
  });

  test("not rendering logIn element", () => {
    //Access
    render(
      <Provider store={store}>
        <AuthPage />
      </Provider>
    );
    //Act
    //Assert
    const getInElement = screen.queryByText("Don't Have an Account? (Sign Up)");
    expect(getInElement).toBeNull;
  });

  test("rendering comfirm password input", () => {
    //Access
    render(
      <Provider store={store}>
        <AuthPage />
      </Provider>
    );
    //Act
    //Assert
    const confirmPasswordInput =
      screen.getAllByPlaceholderText("Confirm Password");
    expect(confirmPasswordInput).toBeValid;
  });
  test("not rendering logIn form signUp form if the Have an account button not clicked", () => {
    //Access
    render(
      <Provider store={store}>
        <AuthPage />
      </Provider>
    );
    //Act
    const changeToLogInButton = screen.getByText("Have an account? (Log In)");
    userEvent.click(changeToLogInButton);
    //Assert
    const changeToLogInElement = screen.getByText("Log In", { exact: false });
    expect(changeToLogInElement).toBeNull;
  });
});
