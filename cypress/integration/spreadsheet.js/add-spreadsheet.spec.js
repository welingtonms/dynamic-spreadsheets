import { asTestAttr } from '../../../src/test/helpers';
import generator from '../../../src/test/data-generator';
import { range, map } from 'ramda';
import { INITIAL_AMOUNT_OF_ROWS } from '../../../src/containers/spreadsheet/constants';

context('Add spreadsheet', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  });

  // https://on.cypress.io/interacting-with-elements

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

  it('should add new column of type text', () => {
    const title = generator.word();

    cy.get(asTestAttr('c-open-add-column-modal')).click();
    cy.get(asTestAttr('c-add-column-modal-title')).type(title);
    cy.get(asTestAttr('c-checkbox')).click();
    cy.get(asTestAttr('c-radio'))
      .eq(0)
      .click();

    cy.get(asTestAttr('c-add-column-modal-title'))
      .focus()
      .blur();

    cy.get(asTestAttr('c-add-column-button')).click();
    cy.get(asTestAttr('c-alert'))
      .should('exist')
      .should('have.class', '-success')
      .contains(`Column ${title} added!`);
    cy.get(asTestAttr('c-spreadsheet')).should('exist');
    cy.get(asTestAttr('c-column-header'))
      .eq(0) // text
      .contains(title);
  });

  it('should add new column of type number', () => {
    const title = generator.word();

    cy.get(asTestAttr('c-open-add-column-modal')).click();
    cy.get(asTestAttr('c-add-column-modal-title')).type(title);
    cy.get(asTestAttr('c-checkbox')).click();
    cy.get(asTestAttr('c-radio'))
      .eq(1) // number
      .click();

    cy.get(asTestAttr('c-add-column-modal-title'))
      .focus()
      .blur();

    cy.get(asTestAttr('c-add-column-button')).click();
    cy.get(asTestAttr('c-spreadsheet')).should('exist');
    cy.get(asTestAttr('c-column-header'))
      .eq(1)
      .contains(title);
  });

  it('should add new column of type date', () => {
    const title = generator.word();

    cy.get(asTestAttr('c-open-add-column-modal')).click();
    cy.get(asTestAttr('c-add-column-modal-title')).type(title);
    cy.get(asTestAttr('c-checkbox')).click();
    cy.get(asTestAttr('c-radio'))
      .eq(2) // date
      .click();

    cy.get(asTestAttr('c-add-column-modal-title'))
      .focus()
      .blur();

    cy.get(asTestAttr('c-add-column-button')).click();
    cy.get(asTestAttr('c-spreadsheet')).should('exist');
    cy.get(asTestAttr('c-column-header'))
      .eq(2)
      .contains(title);
  });

  it('should add new column of type select', () => {
    const title = generator.word();

    cy.get(asTestAttr('c-open-add-column-modal')).click();
    cy.get(asTestAttr('c-add-column-modal-title')).type(title);
    cy.get(asTestAttr('c-checkbox')).click();
    cy.get(asTestAttr('c-radio'))
      .eq(3) // select
      .click();

    const list = map(() => generator.word(), range(0, 5)).join(',');
    console.log(list);
    cy.get(asTestAttr('c-add-column-modal-list'))
      .type(list)
      .focus()
      .blur();

    cy.get(asTestAttr('c-add-column-button')).click();
    cy.get(asTestAttr('c-spreadsheet')).should('exist');
    cy.get(asTestAttr('c-column-header'))
      .eq(3)
      .contains(title);
  });

  it(`should have initially ${INITIAL_AMOUNT_OF_ROWS} rows`, () => {
    cy.get(asTestAttr('c-spreadsheet-body'))
      .find('tr')
      .should($trs => {
        expect($trs).to.have.length(INITIAL_AMOUNT_OF_ROWS);
      });
  });

  it(`should show the Add more rows button`, () => {
    cy.get(asTestAttr('c-add-rows-button')).should('exist');
  });
});
