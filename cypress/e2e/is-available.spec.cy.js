describe('Application is available', function() {
  it('Should be available on localhost:3000', function() {
    cy.visit('http://localhost:3000');
  });
}); 