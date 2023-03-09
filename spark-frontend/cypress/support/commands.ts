/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      //       login(email: string, password: string): Chainable<void>
      //       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
      addToCart(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("addToCart", () => {
  cy.get('[data-cy="cart"]').should("be.visible");
  cy.get('[data-cy="cart"]').contains(0);
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

// the below code snippet is required to handle a React hydration bug that would cause tests to fail
// it's only a workaround until this React behavior / bug is fixed
// Cypress.on("uncaught:exception", (err) => {
//   // we check if the error is
//   if (
//     err.message.includes("Minified React error #418;") ||
//     err.message.includes("Minified React error #423;") ||
//     err.message.includes("hydrating") ||
//     err.message.includes("Hydration")
//   ) {
//     return false;
//   }
// });

export {};
