import user from '../fixtures/user.json'
import url from '../fixtures/url.json'
import componentNav from '../support/page_objects/componentNav'
import pageHome from '../support/page_objects/pageHome'
import pageForm from '../support/page_objects/pageForm'
import pageMyOrders from '../support/page_objects/pageMyOrders'


const Pagehome = require('../support/page_objects/pageHome')
const PageCart = require('../support/page_objects/pageCart')
const pageLogin = require('../support/page_objects/pageLogin')



describe('Casos de prueba de FRONT', () => {
  it('Comprar carrito exitosamente y visualizar orden de compra', () => {


    cy.deleteCartAPI();

    cy.visit(url.login)
    //cy.login();
    pageLogin.typeUserName(user.name);
    pageLogin.typeUserPassword(user.password);
    pageLogin.clickLoginButton();

    cy.url().should('include', url.home)
    Pagehome.isBookVisible();
    componentNav.validation('0')

    Pagehome.clicAddToCartButton()

    pageHome.MessageAddBook()
    componentNav.validation('1')

    componentNav.ClicShopping_cart()

    PageCart.visualize_book_title()

    PageCart.clicCheckOutButton()

    cy.url().should('include', url.checkout)
    pageForm.view_order()
    pageForm.view_form

    pageForm.typeName('prueba')
    pageForm.typeaddressLine1('prueba1')
    pageForm.typeaddressLine2('prueba2')
    pageForm.typepincode('123456')
    pageForm.typestate('prueba2')

    pageForm.clickPlace_Order()

    cy.url().should('include', url.My_Orders)
    pageMyOrders.visualize_My_Orders()

    pageMyOrders.clickFirst_purchase_Order()
  })
})
