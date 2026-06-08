describe('Verificar login exitoso | FRONT | Luka Reyes', () => {
it('Verificar login exitoso', () => {
  cy.visit('https://app.bookdbqa.online/login');
  cy.completarDatosLogin("lukareyes","Automata67");
  cy.url().should('include', 'https://app.bookdbqa.online/');
  cy.get('app-book-card').contains('Harry Potter and the Chamber of Secrets').should('be.visible')
});
});