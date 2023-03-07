/// <reference types="Cypress" />

describe("Event", () => {
  beforeEach(() => {
    cy.visit("/events/17"); // TO REFACTOR to use testing database
  });
  it("should show add to cart button and join event button", () => {
    cy.get('[data-cy="add-to-cart-button"]').should("be.visible");
    cy.get('[data-cy="join-event-button"]').should("be.visible");
  });
  it("should show the joiners div", () => {
    cy.get('[data-cy="event-joiners"]').should("be.visible");
  });
  it("should add event to the cart", () => {
    cy.addToCart();
    cy.get('[data-cy="cart"]').contains(1);
    cy.get('[data-cy="cart"]').click();
    // make sure current event page's title is included in the cart popup
    cy.get('[data-cy="event-title"]').then((el) => {
      cy.get('[data-cy="popup"]').contains(el.text());
    });
  });
  it('should display "add to cart" from "added to cart" when in-cart item is removed', () => {
    cy.addToCart();
    cy.get('[data-cy="cart"]').click();
    cy.get('[data-cy="event-title"]').then((el) => {
      cy.get('[data-cy="popup-event"]')
        .contains(el.text())
        .parent()
        .contains("remove")
        .click();
    });
    cy.get('[data-cy="add-to-cart-button"]').contains("add to cart");
    cy.get('[data-cy="cart"]').contains(0);
  });
});

export {};
