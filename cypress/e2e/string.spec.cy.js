import {testUrl, content, reverseInput, reverseButton} from '../../src/constants/dom-content';

describe("Testing string-page", () => {
  beforeEach(() => {
    cy.visit(`${testUrl}/recursion`);
  })

  it("While input is empty, the add button is not available", () => {
    cy.get(reverseInput).clear().should("have.value", "");
    cy.get(reverseButton).should("be.disabled");
  })


  it("String-page should render circles correctly", () => {
    const TYPED_VALUE = "test";

    cy.get(reverseInput).type(TYPED_VALUE);
    cy.get(reverseButton).click();

    cy.get(content)
      .should('have.length', 4)
      .each((value, index) => {
        cy.wrap(value).contains(TYPED_VALUE[index]);

        if (index === 0 || index === 3) {
          cy.wrap(value).find('[class*=circle_changing]');
        }

        if (index === 1) {
          cy.wrap(value).find('[class*=circle_default]');
        }
      });


    cy.get(content)
      .should('have.length', 4)
      .each((value, index) => {

        cy.wrap(value).contains(TYPED_VALUE[TYPED_VALUE.length - 1 - index]);
        cy.wrap(value).find('[class*=modified]');
      });
  })
})
