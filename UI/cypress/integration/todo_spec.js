import {
  login
} from '../support/pages/login.js';

before(function () {
  return cy
    .loginUI(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
});

describe("todoist verify", function () {
  it("verifies login", function () {
    cy.get("title").should("contain", "Todoist")

  });
});
