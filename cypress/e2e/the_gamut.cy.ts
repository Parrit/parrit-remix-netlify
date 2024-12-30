describe("The Gamut", () => {
  let projectName: string;
  let projectId: string;
  const password = "cypress";
  const baseUrl = Cypress.config().baseUrl ?? "https://parrit.rurai.dev";

  before(() => {
    const now = new Date().getTime();
    projectName = `cypress-${now}`;
    cy.visit(baseUrl);
    cy.get("[data-cy=goToSignup]").click();
    cy.get("[data-cy=projectName]").type(projectName);
    cy.get("[data-cy=password]").type(password);
    cy.get("[data-cy=submit]").click();
    // wait until the project page loads
    cy.url().should("include", `/project/`);
    // get the project id from the url
    cy.url().then((url) => {
      const match = url.match(/project\/(.*)/);
      if (match) {
        projectId = match[1];
      }
      throw new Error("Could not find project id in url");
    });

    // if banner-action exists, click it
    // if banner-action does not exist, continue
    cy.get("[data-cy=banner-action]").then(($el) => {
      if ($el.length) {
        cy.get("[data-cy=banner-action]").click();
      }
    });

    // out of office exists
    cy.get("[data-cy=pairingBoard-out of office]");
  });

  after(() => {
    cy.visit(`${baseUrl}/project/${projectId}/delete`);
    cy.get("[data-cy=delete-project]").click();
    cy.get("[data-cy=confirm-delete]").click();
  });

  it("runs through all of the interactions", () => {
    cy.get("[data-cy=addParritButton]").click();
    cy.get("[data-cy=parritName]").type("Alice");
    cy.get("[data-cy=submit]").click();
    cy.get("[data-cy=addParritButton]").click();
    cy.get("[data-cy=parritName]").type("Bob");
    cy.get("[data-cy=submit]").click();
    cy.get("[data-cy=addBoardButton]").click();
    cy.get("[data-cy=pairingBoardName]").type("Macaw");
    cy.get("[data-cy=submit]").click();
    cy.get("[data-cy=recommendPairs]").click();
    // expect Macaw to have Alice and Bob
    cy.get("[data-cy=pairingBoard-Macaw]").contains("Alice");
    cy.get("[data-cy=pairingBoard-Macaw]").contains("Bob");
    // refresh the page
    cy.reload();
    // expect Macaw to have Alice and Bob
    cy.get("[data-cy=pairingBoard-Macaw]").contains("Alice");
    cy.get("[data-cy=pairingBoard-Macaw]").contains("Bob");
    // delete Macaw
    cy.get("[data-cy=delete-pairing-board-Macaw]").click();
    // expect Macaw to be gone
    cy.get("[data-cy=pairingBoard-Macaw]").should("not.exist");
    // expect Alice and Bob to be in the floating board
    cy.get("[data-cy=floatingParrits]").contains("Alice");
    cy.get("[data-cy=floatingParrits]").contains("Bob");
  });
});
