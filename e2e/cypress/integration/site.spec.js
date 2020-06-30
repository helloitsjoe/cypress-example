/// <reference types="cypress" />

context('Aliasing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Renders Star Wars by default', () => {
    cy.contains('Star Wars').should('exist');
  });

  it('Navigation', () => {
    cy.contains(/home/i).should('have.class', 'link-active');
    cy.contains(/about/i).should('not.have.class', 'link-active');

    cy.contains(/about/i).click();

    cy.contains(/home/i).should('not.have.class', 'link-active');
    cy.contains(/about/i).should('have.class', 'link-active');

    cy.contains('This is the about page').should('be.visible');
    cy.url().should('include', '/about');
  });

  it('Person', () => {
    cy.get('[data-testid="search"').type('luke');
    cy.contains(/submit/i).click();
    cy.contains('Name: Luke Skywalker').should('be.visible');
  });
});
