import { X_SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { testUrl, content, queueInput, queueAddButton, queueRemoveButton } from '../../src/constants/dom-content';

describe("Testing queue-page", () => {
  it("Queue-page is available", () => {
    cy.visit("/queue");
  });


  it("While input is empty, the add button is not available", () => {
    cy.get(queueInput).clear().should("have.value", "");
    cy.get(queueAddButton).should("be.disabled");
  })


  it("Queue-page should render values correctly when they add to the queue", () => {
    cy.get(queueInput).type(1);
    cy.get(queueAddButton).click();
    cy.get(content).each((value, index) => {
      if (index === 0) {
        expect(value).to.contain(1);
        expect(value).to.contain("head");
        expect(value).to.contain("tail");
        expect(value).to.contain('0');
        cy.wrap(value).find('[class*=circle_changing]');
      }
    });

    cy.wait(X_SHORT_DELAY_IN_MS);

    cy.get(queueInput).type(2);
    cy.get(queueAddButton).click();
    cy.get(content).each((value, index) => {
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

    cy.get(content).each((value, index) => {
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

    cy.get(queueRemoveButton).should('not.be.disabled');
    cy.get('[data-cy="queue-clear-button"]').should('not.be.disabled');
  });

  it("Queue-page should render values correctly when they remove from queue", () => {
    cy.get(content).each((value, index) => {
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

    cy.get(queueRemoveButton).click();

    cy.get(content).each((value, index) => {
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

    cy.get(content).each((value, index) => {
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

    cy.get(queueRemoveButton).click();
    cy.get(content).each((value) => {
      expect(value).to.contain('');
    });

    cy.get(queueRemoveButton).should("have.attr", "disabled");
    cy.get('[data-cy="queue-clear-button"]').should("have.attr", "disabled");
  });

  it("Queue-page should render values absence correctly when they clear from queue", () => {
    cy.get(queueInput).type(1)
    cy.get(queueAddButton).click()
    cy.wait(X_SHORT_DELAY_IN_MS)

    cy.get(queueInput).type(2)
    cy.get(queueAddButton).click()
    cy.wait(X_SHORT_DELAY_IN_MS)

    cy.get(queueInput).type(3)
    cy.get(queueAddButton).click()
    cy.wait(X_SHORT_DELAY_IN_MS)

    cy.get('[data-cy="queue-clear-button"]').click()

    cy.get(content)
      .each((value) => {
        expect(value).to.contain('');
        cy.wrap(value).find('[class*=circle_default]');
      });

    cy.get(queueAddButton).should("have.attr", "disabled");
    cy.get(queueRemoveButton).should("have.attr", "disabled");
    cy.get('[data-cy="queue-clear-button"]').should("have.attr", "disabled");
  })
});
