import { X_SHORT_DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe("Testing list-page", () => {
  it("List-page is available", () => {
    cy.visit('http://localhost:3000/list');
  });

  it("While input's is empty, the add button is not available", () => {
    cy.get('[data-cy="value-input"]').clear().should("have.value", "");
    cy.get('[data-cy="index-input"]').clear().should("have.value", "");

    cy.get('[data-cy="add-to-head"]').should("be.disabled");
    cy.get('[data-cy="add-to-tail"]').should("be.disabled");
    cy.get('[data-cy="remove-from-head"]').should("not.be.disabled");
    cy.get('[data-cy="remove-from-tail"]').should("not.be.disabled");

    cy.get('[data-cy="add-by-index"]').should("be.disabled");
    cy.get('[data-cy="remove-by-index"]').should("be.disabled");
  })


  it("Check render default data", () => {
    cy.get('[class*=circle_content]')
      .each((value, index) => {
        cy.wrap(value).find('[class*=circle_default]');
        if (index === 0) cy.wrap(value).contains("head");

        if (index === index.length - 1) cy.wrap(value).contains("tail");
      });
  });


  it("Check adding data to head", () => {
    cy.get('[data-cy="value-input"]').type("five");
    cy.get('[data-cy="add-to-head"]').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should("have.length", 5)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).contains("five");
        if (index === 0) cy.wrap(value).contains("head");
      });
  });


  it("Check adding element to tail", () => {
    cy.get('[data-cy="value-input"]').type("svn");
    cy.get('[data-cy="add-to-tail"]').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should("have.length", 6)
      .each((value, index) => {
        if (index === index - 1) cy.wrap(value).contains("svn");
        if (index === index - 1) cy.wrap(value).contains("tail");
      });
  });


  it("Check adding element from index", () => {
    cy.get('[data-cy="value-input"]').type("eght");
    cy.get('[data-cy="index-input"]').type("1");
    cy.get('[data-cy="add-by-index"]').click();
    cy.wait(X_SHORT_DELAY_IN_MS * 4);

    cy.get('[class*=circle_content]').should("have.length", 7);
    cy.get('[class*=circle_content]')
      .each((value, index) => {
        if (index === 1) cy.wrap(value).contains("eght");
      });
  });


  it("Check remove element from head", () => {
    cy.get('[data-cy="remove-from-head"]').click();
    cy.get('[class*=circle_content]').should("have.length", 6);
    cy.get('[class*=circle_content]')
      .each((value, index) => {
        if (index === 0) cy.wrap(value).contains("head");

        if (index === 5) cy.wrap(value).contains("tail");
      });
  });

  it('Check remove element from tail', () => {
    cy.get('[data-cy="remove-from-tail"]').click();
    cy.get('[class*=circle_content]').should("have.length", 5);
    cy.get('[class*=circle_content]')
      .each((value, index) => {
        if (index === 0) cy.wrap(value).contains("head");

        if (index === 4) cy.wrap(value).contains("tail");
      });
  });

  it("Check remove element from index", () => {
    cy.get('[data-cy="index-input"]').type("2");
    cy.get('[data-cy="remove-by-index"]').click();
    cy.wait(X_SHORT_DELAY_IN_MS * 4);

    cy.get('[class*=circle_content]').should("have.length", 4);

    cy.get('[class*=circle_content]')
      .each((value, index) => {
        if (index === 0) cy.wrap(value).contains("head");

        if (index === 3) cy.wrap(value).contains("tail");
      });
  });
});