import { X_SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Testing stack-page", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stack');
  });

  
  it("While input is empty, the add button is not available", () => {
    cy.get('[data-cy="stack-input"]').clear().should("have.value", "");
    cy.get('[data-cy="stack-add-button"]').should("be.disabled");
  })


  it("Stack-page should render circles correctly when they add to the stack", () => {
    cy.get('[data-cy="stack-input"]').clear();
    cy.get('[data-cy="stack-input"]').type(1);
    cy.get('[data-cy="stack-add-button"]').click();

    cy.get('[class*=circle_content]')
      .should('have.length', 1)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).find('[class*=circle_changing]');
      });

    cy.get('[class*=circle_content]')
      .should('have.length', 1)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).find('[class*=circle_default]');
      });

    cy.get('[data-cy="stack-input"]').type(2);
    cy.get('[data-cy="stack-add-button"]').click();

    cy.get('[class*=circle_content]')
      .should('have.length', 2)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).find('[class*=circle_default]');
        if (index === 1) cy.wrap(value).find('[class*=circle_changing]');
      });

    cy.get('[class*=circle_content]')
      .should('have.length', 2)
      .each((value, index) => {
        if (index === 0 || index === 1) cy.wrap(value).find('[class*=circle_default]');
      });
  });


  it("Stack-page should render circles correctly when they remove from stack", () => {
    cy.get('[data-cy="stack-input"]').type(1);
    cy.get('[data-cy="stack-add-button"]').click();
    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get('[data-cy="stack-input"]').type(2);
    cy.get('[data-cy="stack-add-button"]').click();
    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get('[data-cy="stack-input"]').type(3);
    cy.get('[data-cy="stack-add-button"]').click();
    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get('[data-cy="stack-remove-button"]').click();

    cy.get('[class*=circle_content]')
      .should('have.length', 3)
      .each((value, index) => {
        if (index === 0 || index === 1) cy.wrap(value).find('[class*=circle_default]');
        if (index === 2) cy.wrap(value).find('[class*=circle_changing]');
      });

    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 2)
      .each((value, index) => {
        if (index === 0 || index === 1) cy.wrap(value).find('[class*=circle_default]');
      });

    cy.get('[data-cy="stack-remove-button"]').click();

    cy.get('[class*=circle_content]')
      .should('have.length', 2)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).find('[class*=circle_default]');
        if (index === 1) cy.wrap(value).find('[class*=circle_changing]');
      });

    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 1)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).find('[class*=circle_default]');
      });

    cy.get('[data-cy="stack-remove-button"]').click();

    cy.get('[class*=circle_content]')
      .should('have.length', 1)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).find('[class*=circle_changing]');
      });

    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]').should('have.length', 0);
    cy.get('[data-cy="stack-remove-button"]').should('be.disabled');
    cy.get('[data-cy="stack-clear-button"]').should('be.disabled');
  });


  it("Stack-page should render circles absence correctly when they clear from stack", function () {
    cy.get('[data-cy="stack-input"]').type(1);
    cy.get('[data-cy="stack-add-button"]').click();
    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get('[data-cy="stack-input"]').type(2);
    cy.get('[data-cy="stack-add-button"]').click();
    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get('[data-cy="stack-input"]').type(3);
    cy.get('[data-cy="stack-add-button"]').click();
    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get('[data-cy="stack-clear-button"]').click();
    cy.get("[class*=circle_content]").should("have.length", 0);

    cy.get('[data-cy="stack-input"]').should("have.value", "");
    cy.get('[data-cy="stack-add-button"]').should("have.attr", "disabled");
    cy.get('[data-cy="stack-remove-button"]').should("have.attr", "disabled");
    cy.get('[data-cy="stack-clear-button"]').should("have.attr", "disabled");
  });
})