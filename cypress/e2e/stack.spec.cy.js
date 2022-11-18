import { X_SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {testUrl, content, stackInput, stackAddButton, stackRemoveButton} from '../../src/constants/dom-content';

describe("Testing stack-page", () => {
  beforeEach(() => {
    cy.visit(`${testUrl}/stack`);
  });

  
  it("While input is empty, the add button is not available", () => {
    cy.get(stackInput).clear().should("have.value", "");
    cy.get(stackAddButton).should("be.disabled");
  })


  it("Stack-page should render circles correctly when they add to the stack", () => {
    cy.get(stackInput).clear();
    cy.get(stackInput).type(1);
    cy.get(stackAddButton).click();

    cy.get(content)
      .should('have.length', 1)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).find('[class*=circle_changing]');
      });

    cy.get(content)
      .should('have.length', 1)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).find('[class*=circle_default]');
      });

    cy.get(stackInput).type(2);
    cy.get(stackAddButton).click();

    cy.get(content)
      .should('have.length', 2)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).find('[class*=circle_default]');
        if (index === 1) cy.wrap(value).find('[class*=circle_changing]');
      });

    cy.get(content)
      .should('have.length', 2)
      .each((value, index) => {
        if (index === 0 || index === 1) cy.wrap(value).find('[class*=circle_default]');
      });
  });


  it("Stack-page should render circles correctly when they remove from stack", () => {
    cy.get(stackInput).type(1);
    cy.get(stackAddButton).click();
    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get(stackInput).type(2);
    cy.get(stackAddButton).click();
    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get(stackInput).type(3);
    cy.get(stackAddButton).click();
    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get(stackRemoveButton).click();

    cy.get(content)
      .should('have.length', 3)
      .each((value, index) => {
        if (index === 0 || index === 1) cy.wrap(value).find('[class*=circle_default]');
        if (index === 2) cy.wrap(value).find('[class*=circle_changing]');
      });

    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get(content)
      .should('have.length', 2)
      .each((value, index) => {
        if (index === 0 || index === 1) cy.wrap(value).find('[class*=circle_default]');
      });

    cy.get(stackRemoveButton).click();

    cy.get(content)
      .should('have.length', 2)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).find('[class*=circle_default]');
        if (index === 1) cy.wrap(value).find('[class*=circle_changing]');
      });

    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get(content)
      .should('have.length', 1)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).find('[class*=circle_default]');
      });

    cy.get(stackRemoveButton).click();

    cy.get(content)
      .should('have.length', 1)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).find('[class*=circle_changing]');
      });

    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get(content).should('have.length', 0);
    cy.get(stackRemoveButton).should('be.disabled');
    cy.get('[data-cy="stack-clear-button"]').should('be.disabled');
  });


  it("Stack-page should render circles absence correctly when they clear from stack", function () {
    cy.get(stackInput).type(1);
    cy.get(stackAddButton).click();
    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get(stackInput).type(2);
    cy.get(stackAddButton).click();
    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get(stackInput).type(3);
    cy.get(stackAddButton).click();
    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get('[data-cy="stack-clear-button"]').click();
    cy.get(content).should("have.length", 0);

    cy.get(stackInput).should("have.value", "");
    cy.get(stackAddButton).should("have.attr", "disabled");
    cy.get(stackRemoveButton).should("have.attr", "disabled");
    cy.get('[data-cy="stack-clear-button"]').should("have.attr", "disabled");
  });
})
