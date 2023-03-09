import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Brand from "../components/header/Brand";

describe("Brand", () => {
  test("contains brand name", () => {
    render(<Brand />);

    const link = screen.getByRole("link", {
      name: /spark/i,
    });
    expect(link).toBeInTheDocument();
  });
  test("contains link to index page", () => {
    render(<Brand />);

    const link = screen.getByRole("link", {
      name: /spark/i,
    });
    expect(link).toHaveAttribute("href", "/");
  });
});
