import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthBtns } from "../components/header/AuthBtns";

interface User {
  displayName: string;
  photoURL: string;
}

type CurrentUser = User | undefined | null;

let MOCK_CURRENT_USER: CurrentUser = undefined;
let MOCK_DISPLAY_NAME: string = "Test";
let MOCK_PHOTO_URL: string = "/images/linkedin.png";

// mock the useAuth hook
jest.mock("../contexts/AuthContext", () => ({
  useAuth: (): { currentUser: CurrentUser } => {
    return {
      currentUser: MOCK_CURRENT_USER,
    };
  },
}));

function renderComponent(isLoggedIn: boolean = false) {
  MOCK_CURRENT_USER = isLoggedIn
    ? { displayName: MOCK_DISPLAY_NAME, photoURL: MOCK_PHOTO_URL }
    : undefined;
  render(<AuthBtns />);
}

describe("Auth Buttons", () => {
  describe("when user is not signed in", () => {
    test("should display login button", () => {
      renderComponent(false);

      const loginButton = screen.getByRole("link", {
        name: /log in/i,
      });
      expect(loginButton).toBeInTheDocument();
    });
    test("should display signup button", () => {
      renderComponent(false);

      const signupButton = screen.queryByRole("link", {
        name: /sign up/i,
      });
      expect(signupButton).toBeInTheDocument();
    });
    test("should not display logout button", () => {
      renderComponent(false);

      const logoutButton = screen.queryByRole("link", {
        name: /log out/i,
      });
      expect(logoutButton).not.toBeInTheDocument();
    });
  });
  describe("when user is signed in", () => {
    test("should display logout button", () => {
      renderComponent(true);

      const logoutButton = screen.getByRole("button", {
        name: /log out/i,
      });
      expect(logoutButton).toBeInTheDocument();
    });
    test("should not display login button", () => {
      renderComponent(true);

      const loginButton = screen.queryByRole("button", {
        name: /log in/i,
      });
      expect(loginButton).not.toBeInTheDocument();
    });
    test("should not display signup button", () => {
      renderComponent(true);

      const signupButton = screen.queryByRole("button", {
        name: /sign up/i,
      });
      expect(signupButton).not.toBeInTheDocument();
    });
  });
});
