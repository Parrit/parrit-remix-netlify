describe("Basic Test", () => {
  it("should visit the app", () => {
    cy.visit(Cypress.config().baseUrl ?? "https://parrit.rurai.dev");
  });
});
