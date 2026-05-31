import user from '../fixtures/user.json'   
import url from '../fixtures/url.json'
import componentNav from '../support/page_objects/componentNav'
import pageHome from '../support/page_objects/pageHome'
import pageForm from '../support/page_objects/pageForm'
import pageMyOrders from '../support/page_objects/pageMyOrders'

const pageLogin  = require('../support/page_objects/pageLogin')
const Pagehome  = require('../support/page_objects/pageHome')
const PageCart  = require('../support/page_objects/pageCart')




describe('Casos de prueba de FRONT', () => {
  it('Comprar carrito exitosamente y visualizar orden de compra', () => {
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

    cy.visit(url.login)
    
    pageLogin.typeUseName(user.name);
    pageLogin.typePassword(user.password);
    pageLogin.clickButtonLogin();

    cy.url().should('include', url.home)
    Pagehome.isBookVisible();
    componentNav.validation('0')
    
    Pagehome.clicAddToCartButton()

    pageHome.MessageAddBook()
    componentNav.validation('1')
     
    componentNav.ClicShopping_cart()
    
    PageCart.visualize_book_title()
    
    PageCart.clicCheckOutButton()
    
    cy.url().should('include',url.checkout)
    pageForm.view_order()
    pageForm.view_form
    
    pageForm.typeName('prueba')
    pageForm.typeaddressLine1('prueba1')
    pageForm.typeaddressLine2('prueba2')
    pageForm.typepincode('123456')
    pageForm.typestate('prueba2')  
      
    pageForm.clickPlace_Order()
   
    cy.url().should('include',url.My_Orders)
    pageMyOrders.visualize_My_Orders()
    
    pageMyOrders.clickFirst_purchase_Order()
  })
})
  