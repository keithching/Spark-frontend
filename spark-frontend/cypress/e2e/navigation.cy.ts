/// <reference types="Cypress" />

describe("Navigation between pages", () => {
  it("should navigate to the login page when login button is clicked", () => {
    cy.visit("/");
    cy.get("[data-cy=header-login-btn]").click();
    cy.location("pathname").should("eq", "/login");
    cy.go("back");
    cy.location("pathname").should("eq", "/");
  });

  it("should navigate to the signup page when signup button is clicked", () => {
    cy.visit("/");
    cy.get("[data-cy=header-signup-btn]").click();
    cy.location("pathname").should("eq", "/signup");
    cy.go("back");
    cy.location("pathname").should("eq", "/");
  });

  it("should navigate to the home page when the brand is clicked", () => {
    cy.visit("/");
    cy.get("[data-cy=header-brand-nav]").click();
    cy.location("pathname").should("eq", "/");

    cy.get("[data-cy=header-signup-btn]").click();
    cy.get("[data-cy=header-brand-nav]").click();
    cy.location("pathname").should("eq", "/");

    cy.get("[data-cy=header-login-btn]").click();
    cy.get("[data-cy=header-brand-nav]").click();
    cy.location("pathname").should("eq", "/");
  });
});

export {};
