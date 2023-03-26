import { render, screen } from "@testing-library/react";
import ProfilePage from "./ProfilePage";
import store from '../components/store/store'
import { Provider } from "react-redux";

describe("Testing profile Page component", () => {
  test("testing profile is incomplete header", () => {
    render(
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    );
    const profileIncompletionElement = screen.getByText('Your profile is incomplete')
    expect(profileIncompletionElement).toBeInTheDocument
  });
  test("testing complete now anchor link", () => {
    render(
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    );
    const completeProfileElement = screen.getByText('Complete Now')
    expect(completeProfileElement).toBeInTheDocument
  });
  test("testing verify email button", () => {
    render(
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    );
    const verifyEmailButton = screen.getByRole('button')
    expect(verifyEmailButton).toBeInTheDocument
  });
});
