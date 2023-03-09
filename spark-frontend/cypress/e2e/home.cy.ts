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

  it("should switch themes when the theme toggle switch is or is not activated", () => {
    // https://glebbahmutov.com/blog/dark-cypress-tips/
    cy.get("body").should("not.have.class", "dark");
    cy.get('[data-cy="theme-switch"]')
      .click({ multiple: true })
      .as("themeSwitchButton");
    cy.get("body").should("have.class", "dark");
    cy.get("@themeSwitchButton").click();
    cy.get("body").should("not.have.class", "dark");
  });

  // TO REFACTOR: use a testing database
  it(
    "should display a list of fetched events",
    { defaultCommandTimeout: 10000 },
    () => {
      cy.get('[data-cy^="event-card"]').should("have.length", 5);
    }
  );

  // TO REFACTOR: use a testing database
  it(
    "should navigate to an event page when an event is clicked",
    { defaultCommandTimeout: 10000 },
    () => {
      cy.get('[data-cy^="event-card"]')
        .first()
        .then((eventCard) => {
          const string = eventCard.attr("data-cy");
          const id = string.split("event-card-")[1];
          console.log(id);

          cy.get('[data-cy^="event-card"]').first().click(); // click the first event
          cy.location("pathname").should("eq", `/events/${id}`);
        });
    }
  );
});

export {};
