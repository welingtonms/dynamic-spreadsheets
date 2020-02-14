import { asTestAttr } from '../../../src/test/helpers';
import { INITIAL_AMOUNT_OF_ROWS } from '../../../src/containers/spreadsheet/constants';
import { range, map } from 'ramda';
import generator from '../../../src/test/data-generator';

describe('Add spreadsheet', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  });

  describe('Adding new column of type text', () => {
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
        .eq(0)
        .contains(title);
    });

    it('should indicate error when blurring out of required text/number/date field', () => {
      cy.get(asTestAttr('c-spreadsheet-body'))
        .find('tr')
        .eq(0)
        .find('td')
        .eq(0)
        .find(asTestAttr('c-input'))
        .focus()
        .blur();

      cy.get(asTestAttr('c-alert'))
        .should('exist')
        .should('have.class', '-error');

      cy.get(asTestAttr('c-spreadsheet-body'))
        .find('tr')
        .eq(0)
        .find('td')
        .eq(0)
        .should('have.class', 'u-has-error');
    });
  });

  describe('Adding new column of type number', () => {
    it('should add new column of type number', () => {
      const title = generator.word();

      cy.get(asTestAttr('c-open-add-column-modal')).click();
      cy.get(asTestAttr('c-add-column-modal-title')).type(title);
      cy.get(asTestAttr('c-checkbox')).click();
      cy.get(asTestAttr('c-radio'))
        .eq(1)
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
        .eq(1)
        .contains(title);
    });
  });

  describe('Adding new column of type date', () => {
    it('should add new column of type date', () => {
      const title = generator.word();
      cy.get(asTestAttr('c-open-add-column-modal')).click();
      cy.get(asTestAttr('c-add-column-modal-title')).type(title);
      cy.get(asTestAttr('c-checkbox')).click();
      cy.get(asTestAttr('c-radio'))
        .eq(2)
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
        .eq(2)
        .contains(title);
    });
  });

  describe('Adding new column of type select', () => {
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
      cy.get(asTestAttr('c-alert'))
        .should('exist')
        .should('have.class', '-success')
        .contains(`Column ${title} added!`);
      cy.get(asTestAttr('c-spreadsheet')).should('exist');
      cy.get(asTestAttr('c-column-header'))
        .eq(3)
        .contains(title);
    });

    it('should indicate error when blurring out of required select field', () => {
      cy.get(asTestAttr('c-spreadsheet-body'))
        .find('tr')
        .eq(0)
        .find('td')
        .eq(3)
        .find(asTestAttr('c-select'))
        .focus()
        .blur();

      cy.get(asTestAttr('c-alert'))
        .should('exist')
        .should('have.class', '-error');

      cy.get(asTestAttr('c-spreadsheet-body'))
        .find('tr')
        .eq(0)
        .find('td')
        .eq(3)
        .should('have.class', 'u-has-error');
    });
  });

  describe('Spreadsheet', () => {
    it(`should have initially ${INITIAL_AMOUNT_OF_ROWS} rows`, () => {
      cy.get(asTestAttr('c-spreadsheet-body'))
        .find('tr')
        .should($trs => {
          expect($trs).to.have.length(INITIAL_AMOUNT_OF_ROWS);
        });
    });

    it(`should show the Add more rows button`, () => {
      cy.get(asTestAttr('c-add-rows-button')).should('exist');
      cy.get(asTestAttr('c-add-rows-button')).click();

      cy.get(asTestAttr('c-spreadsheet-body'))
        .find('tr')
        .should($trs => {
          expect($trs).to.have.length(2 * INITIAL_AMOUNT_OF_ROWS);
        });
    });
  });
});
