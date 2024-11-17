beforeEach("Should render the home page", () => {
  cy.visit("/home");
});

describe("Signup Form Tests", () => {
  it("It should render a the home page ", () => {
    cy.visit("/home");
  });

  it("It should render a Signup Form for Creating an account", () => {
    cy.get("Form").contains("Create an account");
  });

  it("It should fill the form", () => {
    cy.get("Form[name='sign-up-form']").should("exist");
  });
});
