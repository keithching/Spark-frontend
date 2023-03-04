/// <reference types="Cypress" />

describe("home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should visit the homepage", () => {});

  it("should display the hero header and subheader", () => {
    cy.get('[data-cy="hero-header"]');
    cy.get('[data-cy="hero-subheader"]');
  });

  it("should navigate to the events when view events button is clicked", () => {
    cy.get('[data-cy="hero-subheader"]')
      .find("button")
      .contains("View Events")
      .click({ force: true });
    cy.hash().should("eq", "#events");
  });
});

export {};
