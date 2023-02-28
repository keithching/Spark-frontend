import { render, screen } from "@testing-library/react";
import React from "react";
import Footer from "../components/Footer";
import "@testing-library/jest-dom";

describe("Footer", () => {
  test("renders a div that says my name", () => {
    render(<Footer />);

    const link = screen.getByRole("link", {
      name: /keith ng/i,
    });

    expect(link).toBeInTheDocument();
  });
});
