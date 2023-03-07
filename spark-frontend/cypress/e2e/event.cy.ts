/// <reference types="Cypress" />

describe("Event", () => {
  beforeEach(() => {
    cy.visit("/events/17");
  });
  it("should show add to cart button and join event button", () => {
    cy.get('[data-cy="add-to-cart-button"]').should("be.visible");
    cy.get('[data-cy="join-event-button"]').should("be.visible");
  });
  it("should show the joiners div", () => {
    cy.get('[data-cy="event-joiners"]').should("be.visible");
  });
  it("should add event to the cart", () => {
    cy.get('[data-cy="add-to-cart-button"]')
      .as("addToCartButton")
      .contains("add to cart")
      .should("be.visible"); // make sure is rendered and visible
    // https://github.com/cypress-io/cypress/issues/5275
    cy.get('[data-cy="add-to-cart-button"]')
      .as("addToCartButton")
      .click({ force: true });
    cy.get("@addToCartButton").contains("added to cart");
  });
});

export {};
