import { X_SHORT_DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import {
  testUrl, content, listValueInput, listIndexInput,
  listAddToHeadButton, listAddToTailButton,
  listRemoveFromHeadButton, listRemoveFromTailButton,
  listAddByIndexButton, listRemoveByIndexButton
} from '../../src/constants/dom-content';

describe("Testing list-page", () => {
  it("List-page is available", () => {
    cy.visit(`${testUrl}/list`);
  });

  it("While input's is empty, the add button is not available", () => {
    cy.get(listValueInput).clear().should("have.value", "");
    cy.get(listIndexInput).clear().should("have.value", "");

    cy.get(listAddToHeadButton).should("be.disabled");
    cy.get(listAddToTailButton).should("be.disabled");
    cy.get(listRemoveFromHeadButton).should("not.be.disabled");
    cy.get(listRemoveFromTailButton).should("not.be.disabled");

    cy.get(listAddByIndexButton).should("be.disabled");
    cy.get(listRemoveByIndexButton).should("be.disabled");
  })


  it("Check render default data", () => {
    cy.get(content)
      .each((value, index) => {
        cy.wrap(value).find('[class*=circle_default]');
        if (index === 0) cy.wrap(value).contains("head");

        if (index === index.length - 1) cy.wrap(value).contains("tail");
      });
  });


  it("Check adding data to head", () => {
    cy.get(listValueInput).type("five");
    cy.get(listAddToHeadButton).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(content)
      .should("have.length", 5)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).contains("five");
        if (index === 0) cy.wrap(value).contains("head");
      });
  });


  it("Check adding element to tail", () => {
    cy.get(listValueInput).type("svn");
    cy.get(listAddToTailButton).click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(content)
      .should("have.length", 6)
      .each((value, index) => {
        if (index === index - 1) cy.wrap(value).contains("svn");
        if (index === index - 1) cy.wrap(value).contains("tail");
      });
  });


  it("Check adding element from index", () => {
    cy.get(listValueInput).type("eght");
    cy.get(listIndexInput).type("1");
    cy.get(listAddByIndexButton).click();
    cy.wait(X_SHORT_DELAY_IN_MS * 4);

    cy.get(content).should("have.length", 7);
    cy.get(content)
      .each((value, index) => {
        if (index === 1) cy.wrap(value).contains("eght");
      });
  });


  it("Check remove element from head", () => {
    cy.get(listRemoveFromHeadButton).click();
    cy.get(content).should("have.length", 6);
    cy.get(content)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).contains("head");

        if (index === 5) cy.wrap(value).contains("tail");
      });
  });

  it('Check remove element from tail', () => {
    cy.get(listRemoveFromTailButton).click();
    cy.get(content).should("have.length", 5);
    cy.get(content)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).contains("head");

        if (index === 4) cy.wrap(value).contains("tail");
      });
  });

  it("Check remove element from index", () => {
    cy.get(listIndexInput).type("2");
    cy.get(listRemoveByIndexButton).click();
    cy.wait(X_SHORT_DELAY_IN_MS * 4);

    cy.get(content).should("have.length", 4);

    cy.get(content)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).contains("head");

        if (index === 3) cy.wrap(value).contains("tail");
      });
  });
});
