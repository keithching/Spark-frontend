import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthenticatedUtilites from "../components/header/AuthenticatedUtilities";
import { CurrentUser } from "./testProps";

// TO REFACTOR: make logic into reusable modules
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
  render(<AuthenticatedUtilites />);
}

describe("Authenticated Utilities", () => {
  describe("when user is signed in", () => {
    test("should display dashboard button", () => {
      renderComponent(true);
      const dashboardButton = screen.getByRole("link", {
        name: /dashboard/i,
      });
      expect(dashboardButton).toBeInTheDocument();
    });
    test("should display profile button", () => {
      renderComponent(true);
      const profileButton = screen.getByRole("link", {
        name: /profile/i,
      });
      expect(profileButton).toBeInTheDocument();
    });
  });
  describe("when user is not signed in", () => {
    test("should not display dashboard button or profile button", () => {
      renderComponent(false);
      const dashboardButton = screen.queryByRole("link", {
        name: /dashboard/i,
      });
      expect(dashboardButton).not.toBeInTheDocument();
      const profileButton = screen.queryByRole("link", {
        name: /profile/i,
      });
      expect(profileButton).not.toBeInTheDocument();
    });
  });
});
