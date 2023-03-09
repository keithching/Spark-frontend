import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserGreeting from "../components/header/UserGreeting";

interface User {
  displayName: string;
  photoURL: string;
}

type CurrentUser = User | undefined | null;

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  objectFit: string;
}

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

// mock the image with a default img html element
// https://github.com/vercel/next.js/discussions/32325
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    const modProps = {
      ...props,
      objectfit: props.objectFit,
    };
    delete modProps.objectFit;
    // eslint-disable-next-line
    return <img {...modProps} />;
  },
}));

// render the component to the fake dom for EACH test
function renderComponent(isLoggedIn: boolean) {
  MOCK_CURRENT_USER = isLoggedIn
    ? { displayName: MOCK_DISPLAY_NAME, photoURL: MOCK_PHOTO_URL }
    : undefined;
  render(<UserGreeting hamburgerIsClicked={false} />);
}

describe("UserGreeting", () => {
  describe("when user is logged in", () => {
    test("current user name is displayed", () => {
      renderComponent(true);
      const greet = screen.getByText(new RegExp(MOCK_DISPLAY_NAME));
      expect(greet).toBeInTheDocument();
    });

    test("current user photo is displayed", async () => {
      renderComponent(true);

      const image = screen.getByRole("img");
      expect(image).toBeInTheDocument();
      await waitFor(() => {
        expect(image).toHaveAttribute("src", MOCK_PHOTO_URL);
      });
    });
  });

  describe("when user is not logged in", () => {
    test("shows a text of こんにちは", () => {
      renderComponent(false);

      const greet = screen.getByText(/こんにちは/i);
      expect(greet).toBeInTheDocument();
    });
  });
});
