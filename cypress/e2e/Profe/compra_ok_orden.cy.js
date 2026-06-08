import user from "../../fixtures/user_luka.json";
describe('FRONT | BIANCA | Casos de prueba Comprar carrito exitosamente y visualizar orden de compra ', () => {

  it.only('Comprar carrito exitosamente y visualizar orden de compra', () => {
    //Accion paso 1:
    cy.visit('https://app.bookdbqa.online/login');
    cy.completarDatosLogin(user.username, user.password);

    //Respuesta del sistema paso 1:
    cy.url().should('include', 'https://app.bookdbqa.online/')
    cy.agregarLibroCarrito('Harry Potter and the Chamber of Secrets')
    //cy.get('#mat-badge-content-0').contains('1').should('be.visible')

   cy.completarDatosCheckout("Luka Reyes","Calle Falsa 123","Departamento 4B","123456","CABA")
   
  
    //Respuesta del sistema paso 6:
    cy.get('.mdc-data-table__content.ng-star-inserted').should('be.visible')
    cy.url().should('include','https://app.bookdbqa.online/myorders')  
  })
})