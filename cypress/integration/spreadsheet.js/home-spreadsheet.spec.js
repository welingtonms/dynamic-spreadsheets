import { asTestAttr } from '../../../src/test/helpers';

context('Home spreadsheet', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should open the spreadsheet container', () => {
    cy.get(asTestAttr('c-spreadsheet-container')).should('exist');
  });

  it('should open with no open spreadsheet', () => {
    cy.get(asTestAttr('c-spreadsheet')).should('not.exist');
  });

  it('should show an Add Column button', () => {
    cy.get(asTestAttr('c-open-add-column-modal')).should('exist');
  });

  it('should open Add Column modal when Add Column button is clicked', () => {
    cy.get(asTestAttr('c-open-add-column-modal')).click();
    cy.get(asTestAttr('c-add-column-modal')).should('exist');
    cy.get(asTestAttr('c-modal-close')).click();
  });
});
