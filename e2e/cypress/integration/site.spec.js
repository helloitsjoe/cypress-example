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

    // This doesn't add coverage - why?
    // cy.contains('This is the about page').should('be.visible');
    cy.url().should('include', '/about');
  });

  it('Person', () => {
    cy.get('[data-testid="search"').type('luke');
    cy.contains(/submit/i).click();
    cy.contains('Name: Luke Skywalker').should('be.visible');
  });
});
