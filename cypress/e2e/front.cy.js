import user from "../fixtures/user.json";
import user_luka from "../fixtures/user_luka.json";


import url from "../fixtures/url.json";

import componentNav from "../support/page_objects/componentNav";

import pageForm from "../support/page_objects/pageForm";
import pageMyOrders from "../support/page_objects/pageMyOrders";

const Pagehome = require("../support/page_objects/pageHome");
const PageCart = require("../support/page_objects/pageCart");

describe("Casos de prueba de FRONT", () => {
  it("FRONT | Comprar carrito exitosamente y visualizar orden de compra | Bianca Cascio", () => {
    cy.deleteCartAPI(user.userId);

    cy.visit(url.login);
    cy.login(user.name, user.password);

    cy.url().should("include", url.home);
    Pagehome.isBookVisible();
    componentNav.validation("0");

    Pagehome.clicAddToCartButton();

    Pagehome.MessageAddBook();
    componentNav.validation("1");

    componentNav.ClickShoppingCart();

    PageCart.visualizeBookTitle();

    PageCart.clicCheckOutButton();

    cy.url().should("include", url.checkout);
    pageForm.viewOrder();
    pageForm.viewForm();

    pageForm.typeName("prueba");
    pageForm.typeaddressLine1("prueba1");
    pageForm.typeaddressLine2("prueba2");
    pageForm.typepincode("123456");
    pageForm.typestate("prueba2");

    pageForm.clickPlaceOrder();

    cy.url().should("include", url.My_Orders);
    pageMyOrders.visualizeMyOrders();

    pageMyOrders.clickFirstPurchaseOrder();
    pageMyOrders.VisializeOrders();
  });

  it("FRONT | borrar todos los productos del carrito utilizando el boton de Cart cleared | Emmanuel Delorenzo", () => {
    cy.deleteCartAPI(user.userId);

    cy.visit(url.login);
    cy.login(user.name, user.password);

    cy.url().should("include", url.home);
    Pagehome.isBookVisible();
    componentNav.validation("0");

    cy.addBookToCart(1);

    cy.addBookToCart(2);

    componentNav.ClickShoppingCart();

    cy.url().should("include", url.ShoppingCart);

    PageCart.clickClearCartButton();

    PageCart.MessageClearCleared();
    PageCart.MessageEmpty_carty();
    PageCart.clickContinueShopping();
  });

  it("FRONT | Verificar login exitoso | Luka Reyes", () => {
    cy.visit("https://app.bookdbqa.online/login");
    cy.completarDatosLogin(user_luka.username, user_luka.password);
    cy.url().should("include", "https://app.bookdbqa.online/");
    cy.get("app-book-card")
      .contains("Harry Potter and the Chamber of Secrets")
      .should("be.visible");
  });
});
