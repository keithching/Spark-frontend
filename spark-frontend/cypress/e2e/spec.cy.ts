/// <reference types="Cypress" />

describe("home page", () => {
  it("should visit the homepage", () => {
    cy.visit("/");
  });
});

export {};
