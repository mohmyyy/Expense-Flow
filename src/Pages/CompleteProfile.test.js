import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import CompleteProfile from "./CompleteProfile";
import store from "../../src/components/store/store";

describe("Checking Complete Profile component", () => {
  test("rendering quote ", () => {
    //Access
    render(
      <Provider store={store}>
        <CompleteProfile />
      </Provider>
    );
    //Act
    //Assert
    const profileQuoteElement = screen.getByText("Winners never quit", {
      exact: false,
    });
    expect(profileQuoteElement).toBeInTheDocument;
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

  test("fetching profile name from data from database", async () => {
    //Access
    render(
      <Provider store={store}>
        <CompleteProfile />
      </Provider>
    );
    //Act
    //Assert
    const getDataNameDataBase = await screen.findByText("Full Name", {
      exact: false,
    });

    expect(getDataNameDataBase).toBeInTheDocument;
  });
  test("fetching url from data from database", async () => {
    //Access
    render(
      <Provider store={store}>
        <CompleteProfile />
      </Provider>
    );
    //Act
    //Assert
    const getDataURLDataBase = await screen.findByText("Profile Phot URL", {
      exact: false,
    });

    expect(getDataURLDataBase).toBeInTheDocument;
  });
});
