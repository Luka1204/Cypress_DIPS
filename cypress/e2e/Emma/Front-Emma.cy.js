describe('Casos de prueba de FRONT', () => {    
    it.only('Borrar todos los productos del carrito utilizando el boton de atajo | Emmanuel Delorenzo', () => {
      cy.request({
        method:'DELETE',
        url:'https://app.bookdbqa.online/api/shoppingcart/1038',
        headers: {
          accept: 'application/json',
          'content-type':'application/json',
          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRW1tYTc2ODkyIiwic3ViIjoiVXNlciIsImp0aSI6ImQ5ZDAxMjU0LTc0ZWQtNGUyMC1iNmYzLWNhNzhkYTJiZmY5YSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJ1c2VySWQiOiIxMDM4IiwiZXhwIjoxNzc5NDA0OTgxLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM2NC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM2NC8ifQ.O6lOeY4VYeuv_M7xJzxnhoX3lrtp4A-9RInaJpurZQU'
        }
      }).then((Response) => {
        expect(Response.status).to.eq(200)})
      //Accion paso 1:
      cy.visit('https://app.bookdbqa.online/login')
      cy.get('input[placeholder="Username"]').type('Emma76892')
      cy.get('input[formcontrolname="password"]').type('Lugano1y2')
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
      cy.get('button').contains('Add to Cart').click()

      //Respuesta del sistema paso 3:
      cy.contains('One Item added to cart').should('be.visible')
      //cy.get('#mat-badge-content-0').contains('2').should('be.visible')

      //Accion paso 4:
      cy.get('.mat-icon.notranslate.mat-badge.mat-badge-warn.material-icons.mat-ligature-font.mat-icon-no-color.mat-badge-overlap.mat-badge-above.mat-badge-after.mat-badge-medium').contains('shopping_cart').click()

      //Respuesta del sistema paso 4:
      cy.url().should('include','https://app.bookdbqa.online/shopping-cart')

      //Accion paso 5:
      cy.get('button').contains(' Clear cart ').click()

      //Respuesta del sistema paso 5:
      cy.contains('Cart cleared').should('be.visible')
      cy.get('.container').contains('Your shopping cart is empty.')
      cy.get('button').contains(' Continue shopping ')
    })
  })