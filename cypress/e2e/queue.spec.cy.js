import { X_SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe("Testing queue-page", () => {
  it("Queue-page is available", () => {
    cy.visit('http://localhost:3000/queue');
  });


  it("While input is empty, the add button is not available", () => {
    cy.get('[data-cy="queue-input"]').clear().should("have.value", "");
    cy.get('[data-cy="queue-add-button"]').should("be.disabled");
  })


  it("Queue-page should render values correctly when they add to the queue", () => {
    cy.get('[data-cy="queue-input"]').type(1);
    cy.get('[data-cy="queue-add-button"]').click();
    cy.get('[class*=circle_content]').each((value, index) => {
      if (index === 0) {
        expect(value).to.contain(1);
        expect(value).to.contain("head");
        expect(value).to.contain("tail");
        expect(value).to.contain('0');
        cy.wrap(value).find('[class*=circle_changing]');
      }
    });

    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get('[data-cy="queue-input"]').type(2);
    cy.get('[data-cy="queue-add-button"]').click();
    cy.get('[class*=circle_content]').each((value, index) => {
      if (index === 0) {
        expect(value).to.contain(1);
        expect(value).to.contain("head");
        expect(value).to.contain('0');
        cy.wrap(value).find('[class*=circle_default]');
      }

      if (index === 1) {
        expect(value).to.contain(2);
        expect(value).to.contain("tail");
        expect(value).to.contain('1');
        cy.wrap(value).find('[class*=circle_changing]');
      }
    });

    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]').each((value, index) => {
      if (index === 0) {
        expect(value).to.contain(1);
        expect(value).to.contain("head");
        expect(value).to.contain('0');
        cy.wrap(value).find('[class*=circle_default]');
      }

      if (index === 1) {
        expect(value).to.contain(2);
        expect(value).to.contain("tail");
        expect(value).to.contain('1');
        cy.wrap(value).find('[class*=circle_default]');
      }
    });

    cy.get('[data-cy="queue-remove-button"]').should('not.be.disabled');
    cy.get('[data-cy="queue-clear-button"]').should('not.be.disabled');
  });

  it("Queue-page should render values correctly when they remove from queue", () => {
    cy.get('[class*=circle_content]').each((value, index) => {
      if (index === 0) {
        expect(value).to.contain(1);
        expect(value).to.contain("head");
        expect(value).to.contain('0');
        cy.wrap(value).find('[class*=circle_default]');
      }

      if (index === 1) {
        expect(value).to.contain(2);
        expect(value).to.contain("tail");
        expect(value).to.contain('1');
        cy.wrap(value).find('[class*=circle_default]');
      }
    });

    cy.get('[data-cy="queue-remove-button"]').click();

    cy.get('[class*=circle_content]').each((value, index) => {
      if (index === 0) {
        expect(value).to.contain(1);
        expect(value).to.contain('0');
        expect(value).to.contain("head");
        cy.wrap(value).find('[class*=circle_changing]');
      }

      if (index === 1) {
        expect(value).to.contain(2);
        expect(value).to.contain("tail");
        expect(value).to.contain('1');
        cy.wrap(value).find('[class*=circle_default]');
      }
    });

    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]').each((value, index) => {
      if (index === 0) {
        expect(value).to.contain('');
        expect(value).to.contain('0');
        cy.wrap(value).find('[class*=circle_default]');
      }

      if (index === 1) {
        expect(value).to.contain(2);
        expect(value).to.contain("tail");
        expect(value).to.contain('1');
        cy.wrap(value).find('[class*=circle_default]');
      }
    });

    cy.get('[data-cy="queue-remove-button"]').click();
    cy.get('[class*=circle_content]').each((value) => {
      expect(value).to.contain('');
    });

    cy.get('[data-cy="queue-remove-button"]').should("have.attr", "disabled");
    cy.get('[data-cy="queue-clear-button"]').should("have.attr", "disabled");
  });

  it("Queue-page should render values absence correctly when they clear from queue", () => {
    cy.get('[data-cy="queue-input"]').type(1)
    cy.get('[data-cy="queue-add-button"]').click()
    cy.wait(X_SHORT_DELAY_IN_MS)

    cy.get('[data-cy="queue-input"]').type(2)
    cy.get('[data-cy="queue-add-button"]').click()
    cy.wait(X_SHORT_DELAY_IN_MS)

    cy.get('[data-cy="queue-input"]').type(3)
    cy.get('[data-cy="queue-add-button"]').click()
    cy.wait(X_SHORT_DELAY_IN_MS)

    cy.get('[data-cy="queue-clear-button"]').click()

    cy.get('[class*=circle_content]')
      .each((value) => {
        expect(value).to.contain('');
        cy.wrap(value).find('[class*=circle_default]');
      });

    cy.get('[data-cy="queue-add-button"]').should("have.attr", "disabled");
    cy.get('[data-cy="queue-remove-button"]').should("have.attr", "disabled");
    cy.get('[data-cy="queue-clear-button"]').should("have.attr", "disabled");
  })
});