describe("Testing string-page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
  })

  it("While input is empty, the add button is not available", () => {
    cy.get('[data-cy="reverse-input"]').clear().should("have.value", "");
    cy.get('[data-cy="reverse-button"]').should("be.disabled");
  })

  it("String-page should render circles correctly", () => {
    const TYPED_VALUE = "test";

    cy.get('[data-cy="reverse-input"]').type(TYPED_VALUE);
    cy.get('[data-cy="reverse-button"]').click();

    cy.get('[class*=circle_content]')
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


    cy.get('[class*=circle_content]')
      .should('have.length', 4)
      .each((value, index) => {

        cy.wrap(value).contains(TYPED_VALUE[TYPED_VALUE.length - 1 - index]);
        cy.wrap(value).find('[class*=modified]');
      });
  })
})