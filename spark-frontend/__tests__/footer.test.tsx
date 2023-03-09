import { render, screen } from "@testing-library/react";
import React from "react";
import Footer from "../components/Footer";
import "@testing-library/jest-dom";

const PORTFOLIO_URL: string = "https://keith-ng-pc.netlify.app/";
const TWITTER_URL: string = "https://twitter.com/KeithNgPC";
const GITHUB_URL: string = "https://github.com/keithching";
const LINKEDIN_URL: string = "https://www.linkedin.com/in/keith-pak-chung-ng/";
const GITHUB_SRC: string = "/images/github.png";
const TWITTER_SRC: string = "/images/twitter.png";
const LINKEDIN_SRC: string = "/images/linkedin.png";

interface Props {
  priority?: boolean;
  src: string;
  alt: string;
  width: number;
  height: number;
  objectFit: string;
}

// mock the image with a default img html element
// https://github.com/vercel/next.js/discussions/32325
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Props) => {
    const modProps = {
      ...props,
      priority: props.priority.toString(), // convert boolean to string
    };
    // eslint-disable-next-line
    return <img {...modProps} />;
  },
}));

describe("Footer", () => {
  test("renders a div that says my name", () => {
    render(<Footer />);

    const link = screen.getByRole("link", {
      name: /keith ng/i,
    });

    expect(link).toBeInTheDocument();
  });

  test("div should contain external link to my portfolio page", () => {
    render(<Footer />);

    const link = screen.getByRole("link", {
      name: /keith ng/i,
    });
    expect(link).toHaveAttribute("href", PORTFOLIO_URL);
  });

  test("renders social media icons and contains corresponding URLs", () => {
    render(<Footer />);

    const githubIcon = screen.getByRole("img", {
      name: /github/i,
    });

    const twitterIcon = screen.getByRole("img", {
      name: /twitter/i,
    });

    const linkedinIcon = screen.getByRole("img", {
      name: /linkedin/i,
    });
    expect(githubIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
    expect(linkedinIcon).toBeInTheDocument();

    expect(githubIcon).toHaveAttribute("src", GITHUB_SRC);
    expect(twitterIcon).toHaveAttribute("src", TWITTER_SRC);
    expect(linkedinIcon).toHaveAttribute("src", LINKEDIN_SRC);

    expect(githubIcon.parentElement).toHaveAttribute("href", GITHUB_URL);
    expect(twitterIcon.parentElement).toHaveAttribute("href", TWITTER_URL);
    expect(linkedinIcon.parentElement).toHaveAttribute("href", LINKEDIN_URL);
  });
});
