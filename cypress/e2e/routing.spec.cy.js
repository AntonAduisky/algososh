describe('Checking application routing', function() {
  it('Visit main-page', function() {
    cy.visit('/');
  });

  it('Visit string-page', () => {
    cy.visit('/recursion');
  });

  it('Visit fibonacci-page', () => {
    cy.visit('/fibonacci');
  });

  it('Visit sort-page', () => {
    cy.visit('/sorting');
  });

  it('Visit stack-page', () => {
    cy.visit('/stack');
  });

  it('Visit queue-page', () => {
    cy.visit('/queue');
  });

  it('Visit list-page', () => {
    cy.visit('/list');
  });
});