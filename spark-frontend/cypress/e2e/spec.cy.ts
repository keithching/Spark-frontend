describe("home page", () => {
  it("should pass", () => {
    cy.visit("/");
  });

  it("should navigate to the log in page when log in is clicked", () => {
    cy.visit("/");
    cy.get("[data-cy=header-login-btn]").click();
    cy.location("pathname").should("eq", "/login");
  });
});

export {};
