// eslint-disable-next-line
/// <reference types="cypress" />

context('Aliasing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Renders Star Wars by default', () => {
    cy.contains('Star Wars').should('exist');
  });

  it('Navigation', () => {
    cy.contains('Home').should('have.class', 'active');
    cy.contains('About').should('not.have.class', 'active');

    cy.contains('About').click();

    cy.contains('Home').should('not.have.class', 'active');
    cy.contains('About').should('have.class', 'active');

    // This doesn't add coverage
    // cy.contains('This is the about page').should('be.visible');
    cy.url().should('include', '/about');
  });
});
