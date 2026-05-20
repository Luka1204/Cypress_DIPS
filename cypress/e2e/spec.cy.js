describe('Pruebas de Login', () => {
it('Verificar login exitoso', () => {
  cy.visit('https://app.bookdbqa.online/login');
  cy.get('input[id="mat-input-0"]').type('userTest');
  cy.get('input[id="mat-input-1"]').type('passtest#43');
  cy.get('button').contains('Login').click();
  cy.url().should('include', '/');
});
it('Verificar respuesta 401 al intentar loguearse con contraseña incorrecta', () => {

  cy.intercept('POST', 'https://app.bookdbqa.online/api/login')
    .as('loginRequest');

  cy.visit('https://app.bookdbqa.online/login');

  cy.get('input[id="mat-input-0"]').type('userTest');
  cy.get('input[id="mat-input-1"]').type('claveIncorrecta');

  cy.get('button').contains('Login').click();

  cy.wait('@loginRequest')
    .its('response.statusCode')
    .should('eq', 401);

});
});