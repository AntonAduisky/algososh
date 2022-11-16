import { X_SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe("Testing fibonacci-page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");
  })

  it("While input is empty, the add button is not available", () => {
    cy.get('[data-cy="fibonacci-input"]').clear().should("have.value", "");
    cy.get('[data-cy="fibonacci-button"]').should("be.disabled");
  })

  it("Fibonacci-page should render circles correctly", () => {
    cy.get('[data-cy="fibonacci-input"]').type('19');
    cy.get('[data-cy="fibonacci-button"]').click()

    // eslint-disable-next-line testing-library/await-async-utils
    cy.wait(X_SHORT_DELAY_IN_MS * 19);

    cy.get('[class*=circle_content]')
      .should('have.length', 19)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).contains(1);
        if (index === 1) cy.wrap(value).contains(1);
        if (index === 2) cy.wrap(value).contains(2);
        if (index === 3) cy.wrap(value).contains(3);
        if (index === 4) cy.wrap(value).contains(5);
        if (index === 5) cy.wrap(value).contains(8);
        if (index === 6) cy.wrap(value).contains(13);
        if (index === 7) cy.wrap(value).contains(21);
        if (index === 8) cy.wrap(value).contains(34);
        if (index === 9) cy.wrap(value).contains(55);
        if (index === 10) cy.wrap(value).contains(89);
        if (index === 11) cy.wrap(value).contains(144);
        if (index === 12) cy.wrap(value).contains(233);
        if (index === 13) cy.wrap(value).contains(377);
        if (index === 14) cy.wrap(value).contains(610);
        if (index === 15) cy.wrap(value).contains(987);
        if (index === 16) cy.wrap(value).contains(1597);
        if (index === 17) cy.wrap(value).contains(2584);
        if (index === 18) cy.wrap(value).contains(4181);
        if (index === 19) cy.wrap(value).contains(6765);
      });
  })
})