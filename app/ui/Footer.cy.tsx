import React from "react";
import { Footer } from "./Footer";

describe("Component test Footer", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Footer />);
  });
});
