import { getMainPageHeader } from '../support/app.po';

describe('pair-matching', () => {
  beforeEach(() => cy.visit('/'));

  it('should have header', () => {
    getMainPageHeader().contains('Pair Matching')
  });
});
