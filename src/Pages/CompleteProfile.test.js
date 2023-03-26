import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import CompleteProfile from "./CompleteProfile";
import store from "../../src/components/store/store";

describe("Checking Complete Profile component", () => {
  test("rendering full name label ", () => {
    //Access
    render(
      <Provider store={store}>
        <CompleteProfile />
      </Provider>
    );
    //Act
    //Assert
    const profileNameElement = screen.getByText(
      "Full Name",
      {
        exact: false,
      }
    );
    expect(profileNameElement).toBeInTheDocument;
  });
  test("rendering profile completion", () => {
    //Access
    render(
      <Provider store={store}>
        <CompleteProfile />
      </Provider>
    );
    //Act
    //Assert
    const profileCompletionElement = screen.getByText(
      "Your profile is 64% completed.",
      {
        exact: false,
      }
    );
    expect(profileCompletionElement).toBeInTheDocument;
  });
});
