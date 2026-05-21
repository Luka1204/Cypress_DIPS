describe('Verificar login exitoso | FRONT | Luka Reyes', () => {
it('Verificar login exitoso', () => {
  cy.visit('https://app.bookdbqa.online/login');
  cy.get('input[id="mat-input-0"]').type('lukareyes');
  cy.get('input[id="mat-input-1"]').type('Automata67');
  cy.get('app-login button').contains('Login').click()
  cy.url().should('include', 'https://app.bookdbqa.online/');
  cy.get('app-book-card').contains('Harry Potter and the Chamber of Secrets').should('be.visible')

});
});