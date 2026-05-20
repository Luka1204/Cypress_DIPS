describe('Casos de prueba de FRONT', () => {

  it.only('Comprar carrito exitosamente y visualizar orden de compra', () => {
    //Accion paso 1:
    cy.visit('https://app.bookdbqa.online/login')
    cy.get('input[formcontrolname="username"]').type('Automata.')
    cy.get('input[formcontrolname="password"]').type('Automata1234')
    cy.get('app-login button').contains('Login').click()

    //Respuesta del sistema paso 1:
    cy.url().should('include', 'https://app.bookdbqa.online/')
    cy.get('app-book-card').contains('Harry Potter and the Chamber of Secrets').should('be.visible')
    //cy.get('#mat-badge-content-0').contains('0').should('be.visible')

    //Accion paso 2:
    cy.get('button').contains('Add to Cart').click()

    //Respuesta del sistema paso 2:
    cy.contains('One Item added to cart').should('be.visible')
    //cy.get('#mat-badge-content-0').contains('1').should('be.visible')

    //Accion paso 3:
    cy.get('.mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed').contains('shopping_cart').click()
    
    
    //Respuesta del sistema paso 3:
    cy.get('.mdc-data-table__content').should('be.visible')

    //Accion paso 4:
    cy.get('.mdc-button.mat-mdc-button-base.my-2.mdc-button--raised.mat-mdc-raised-button.mat-warn').click()
  
    //Respuesta del sistema paso 4:
    cy.url().should('include','https://app.bookdbqa.online/checkout')
    cy.get('.table') //orden
    cy.get('.mat-mdc-card-content') //formulario
    
    //Accion paso 5:
    cy.get('input[formcontrolname="name"]').type('prueba')
    cy.get('input[formcontrolname="addressLine1"]').type('prueba1')
    cy.get('input[formcontrolname="addressLine2"]').type('prueba2')
    cy.get('input[formcontrolname="pincode"]').type('123456')
    cy.get('input[formcontrolname="state"]').type('prueba2')
  
    //Accion paso 6:  
    cy.get('button').contains(' Place Order').click()
  
    //Respuesta del sistema paso 6:
    cy.get('.mdc-data-table__content.ng-star-inserted').should('be.visible')
    cy.url().should('include','https://app.bookdbqa.online/myorders')

    //Accion paso 7:
    
    cy.contains('tr.mat-mdc-row','210-452222').click()
  
  
  })
})