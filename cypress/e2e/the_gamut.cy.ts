describe("The Gamut", () => {
  let projectName: string;
  let projectId: string;
  const password = "cypress";
  const baseUrl = Cypress.config().baseUrl ?? "https://parrit.rurai.dev";

  before(() => {
    const now = new Date().getTime();
    projectName = `cypress-${now}`;
    cy.visit(baseUrl);
    cy.get("[data-test-id=goToSignup]").click();
    cy.get("[data-test-id=projectName]").type(projectName);
    cy.get("[data-test-id=password]").type(password);
    cy.get("[data-test-id=submit]").click();
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
    cy.get("[data-test-id=banner-action]").then(($el) => {
      if ($el.length) {
        cy.get("[data-test-id=banner-action]").click();
      }
    });

    // out of office exists
    cy.get("[data-test-id=pairingBoard-out of office]");
  });

  after(() => {
    cy.visit(`${baseUrl}/project/${projectId}/delete`);
    cy.get("[data-test-id=delete-project]").click();
    cy.get("[data-test-id=confirm-delete]").click();
  });

  it("runs through all of the interactions", () => {
    cy.get("[data-test-id=addParritButton]").click();
    cy.get("[data-test-id=parritName]").type("Alice");
    cy.get("[data-test-id=submit]").click();
    cy.get("[data-test-id=addParritButton]").click();
    cy.get("[data-test-id=parritName]").type("Bob");
    cy.get("[data-test-id=submit]").click();
    cy.get("[data-test-id=addBoardButton]").click();
    cy.get("[data-test-id=pairingBoardName]").type("Macaw");
    cy.get("[data-test-id=submit]").click();
    cy.get("[data-test-id=recommendPairs]").click();

    // expect Macaw to have Alice and Bob
    cy.get("[data-test-id=pairingBoard-Macaw]").contains("Alice");
    cy.get("[data-test-id=pairingBoard-Macaw]").contains("Bob");

    // refresh the page
    cy.reload();

    // expect Macaw to have Alice and Bob
    cy.get("[data-test-id=pairingBoard-Macaw]").contains("Alice");
    cy.get("[data-test-id=pairingBoard-Macaw]").contains("Bob");

    // record pairs
    cy.get("[data-test-id=historyButton]").click();
    cy.get("[data-test-id=pairingHistoryPanel]").should("be.visible");
    cy.get("[data-test-id=savePairing]").click();

    // there should be a pairing history record
    const record = cy.get("[data-test-id=pairingHistoryRecord]");
    record.should("exist");

    // record should contain Macaw, Alice, and Bob
    record.contains("Macaw");
    record.contains("Alice");
    record.contains("Bob");

    // delete Macaw
    cy.get("[data-test-id=delete-pairing-board-Macaw]").click();

    // expect Macaw to be gone
    cy.get("[data-test-id=pairingBoard-Macaw]").should("not.exist");

    // expect Alice and Bob to be in the floating board
    cy.get("[data-test-id=floatingParrits]").contains("Alice");
    cy.get("[data-test-id=floatingParrits]").contains("Bob");

    // add 2 new parrits
    cy.get("[data-test-id=addParritButton]").click();
    cy.get("[data-test-id=parritName]").type("Charlie");
    cy.get("[data-test-id=submit]").click();
    cy.get("[data-test-id=addParritButton]").click();
    cy.get("[data-test-id=parritName]").type("David");
    cy.get("[data-test-id=submit]").click();

    // create 2 new boards
    cy.get("[data-test-id=addBoardButton]").click();
    cy.get("[data-test-id=pairingBoardName]").type("Parrot");
    cy.get("[data-test-id=submit]").click();
    cy.get("[data-test-id=addBoardButton]").click();
    cy.get("[data-test-id=pairingBoardName]").type("Penguin");
    cy.get("[data-test-id=submit]").click();

    // recommend pairs
    cy.get("[data-test-id=recommendPairs]").click();

    // Alice and Bob should NOT be paired together
    const parrot = cy.get("[data-test-id=pairingBoard-Parrot]");
    if (parrot.contains("Alice")) {
      // parrot should not contain bob
      parrot.should("not.contain", "Bob");
    }
    if (parrot.contains("Bob")) {
      // parrot should not contain alice
      parrot.should("not.contain", "Alice");
    }

    // reset pairs
    cy.get("[data-test-id=resetPairs]").click();

    // all parrits should be in the floating board
    cy.get("[data-test-id=floatingParrits]").contains("Alice");
    cy.get("[data-test-id=floatingParrits]").contains("Bob");
    cy.get("[data-test-id=floatingParrits]").contains("Charlie");
    cy.get("[data-test-id=floatingParrits]").contains("David");

    // move Alice and Bob to Parrot
    cy.get("[data-test-id=parrit-Alice]").trigger("dragstart");
    cy.get("[data-test-id=pairingBoard-Parrot]").trigger("drop");
    cy.get("[data-test-id=parrit-Bob]").trigger("dragstart");
    cy.get("[data-test-id=pairingBoard-Parrot]").trigger("drop");

    // recommend pairs
    cy.get("[data-test-id=recommendPairs]").click();

    // Penguin should contain Charlie and David
    cy.get("[data-test-id=pairingBoard-Penguin]").contains("Charlie");
    cy.get("[data-test-id=pairingBoard-Penguin]").contains("David");

    // Rename Penguin to Cockatiel
    cy.get("[data-test-id=rename-pairing-board-penguin]").click();
    cy.get("[data-test-id=pairingBoardNameInput]").type("Cockatiel");
    cy.get("[data-test-id=pairingBoardNameInput]").type("{enter}");

    // Cockatiel should contain Charlie and David
    cy.get("[data-test-id=pairingBoard-Cockatiel]").contains("Charlie");
    cy.get("[data-test-id=pairingBoard-Cockatiel]").contains("David");

    // reset pairs
    cy.get("[data-test-id=resetPairs]").click();

    // move Charlie to out of office
    cy.get("[data-test-id=parrit-Charlie]").trigger("dragstart");
    cy.get("[data-test-id=pairingBoard-out of office]").trigger("drop");

    // recommend pairs
    cy.get("[data-test-id=recommendPairs]").click();

    // Alice and Bob should not be paired together
    // Parrot should not contain both alice and bob
    const parrot2 = cy.get("[data-test-id=pairingBoard-Parrot]");
    if (parrot2.contains("Alice")) {
      // parrot should not contain bob
      parrot2.should("not.contain", "Bob");
    }
    if (parrot2.contains("Bob")) {
      // parrot should not contain alice
      parrot2.should("not.contain", "Alice");
    }

    // Cockatiel should not contain both alice and bob
    const cockatiel = cy.get("[data-test-id=pairingBoard-Cockatiel]");
    if (cockatiel.contains("Alice")) {
      cockatiel.should("not.contain", "Bob");
    }
    if (cockatiel.contains("Bob")) {
      cockatiel.should("not.contain", "Alice");
    }
  });
});
