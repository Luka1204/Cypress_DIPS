import user from "../fixtures/user.json";
import url from "../fixtures/url.json";

const componentNav = require("./page_objects/componentNav");

const pageRequest = require("./page_objects/pageRequest.js");
const compraExito = require("./page_objects/pageCompraExito.js");
const pageLogin = new require("./page_objects/pageLogin.js");
const pageCarrito = require("./page_objects/pageCarrito.js");
const pageCheckout = require("./page_objects/pageCheckout.js");
const pageBook = require("./page_objects/pageBook.js");

const pageHome = require("./page_objects/pageHome.js");
const pageCart = require("./page_objects/pageCart.js");
const pageForm = require("./page_objects/pageForm.js");
const pageMyOrders = require("./page_objects/pageMyOrders.js");

Cypress.Commands.add("getRequest", (url, headers, body) => {
  return pageRequest.getRequest(url, headers, body);
});
Cypress.Commands.add("postRequest", (url, headers, body) => {
  return pageRequest.postRequest(url, headers, body);
});

Cypress.Commands.add("loginApi", (username, password) => {
  return pageLogin.loginApi(username, password);
});

Cypress.Commands.add("completarDatosLogin", (username, password) => {
  pageLogin.typeUserName(username);
  pageLogin.typeUserPassword(password);
  pageLogin.clickButtonLogin();
});

Cypress.Commands.add("compraExitoAPI", () => {
  pageLogin.loginApi(user.username, user.password).then((response) => {
    var token = response.token;
    var user_id = response.user_id;
    compraExito.comparCarrito(token, user_id);
    compraExito.checkOut(token, user_id);
    compraExito.verOrder(token, user_id);
  });
});

Cypress.Commands.add("agregarLibroCarrito", (nombre_libro) => {
  pageCarrito.añadirLibroCarrito(nombre_libro);
});

Cypress.Commands.add(
  "completarDatosCheckout",
  (name, addressLine1, addressLine2, pincode, state) => {
    pageCheckout.completarDatosCheckout(
      name,
      addressLine1,
      addressLine2,
      pincode,
      state,
    );
  },
);
Cypress.Commands.add("anadirLibroCarritoAPI", (token, user_id, book_id) => {
  pageCarrito.anadirLibroCarritoAPI(token, user_id, book_id);
});
Cypress.Commands.add("checkOutAPI", (token, user_id) => {
  pageCheckout.realizarCheckoutAPI(token, user_id);
});

Cypress.Commands.add("login", (name, password) => {
  pageLogin.typeUserName(name);
  pageLogin.typeUserPassword(password);
  pageLogin.clickButtonLogin();
});

Cypress.Commands.add("addBookToCart", (cant) => {
  pageHome.clicAddToCartButton();
  pageHome.MessageAddBook();
  componentNav.validation(cant);
});

Cypress.Commands.add("deleteCartAPI", (userId) => {
  cy.request({
    method: "DELETE",
    url: `https://app.bookdbqa.online/api/shoppingcart/${userId}`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: user.token,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add("loginAPI", (username, password) => {
  return cy
    .request({
      method: "POST",
      url: "https://app.bookdbqa.online/api/login",
      body: {
        username: username,
        password: password,
      },
    })
    .then((response) => {
      return response.body.token;
    });
});

Cypress.Commands.add("postCheckOutAPI", (userId, token, codeResponse) => {
  cy.request({
    method: "POST",
    url: `https://app.bookdbqa.online/api/CheckOut/${userId}`,
    failOnStatusCode: false,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: token ? ` Bearer ${token}` : "",
    },
    body: {
      orderDetails: [
        {
          book: {
            bookId: 3,
            title: "Harry Potter and the Prisoner of Azkaban",
            author: "JKR",
            category: "Romance",
            price: 213,
            coverFileName: "c63ade52-3f90-41fa-980a-1136b6ad2128HP3.jpg",
          },
          quantity: 1,
        },
      ],
      cartTotal: 213,
    },
  }).then((response) => {
    expect(response.status).to.eq(codeResponse);
  });
});

Cypress.Commands.add(
  "AddToFavorite",
  (userId, itemId, token, codeResponse = 200) => {
    cy.request({
      method: "POST",

      url: `https://app.bookdbqa.online/api/Wishlist/ToggleWishlist/${userId}/${itemId}`,
      failOnStatusCode: false,
      headers: {
        accept: "application/json",
        "content-type": "application/json",

        authorization: token ? `Bearer ${token}` : "",
      },

      body: {},
    }).then((response) => {
      expect(response.status).to.eq(codeResponse);
    });
  },
);

Cypress.Commands.add("ApiBook", (itemId, codeResponse = 200) => {
  cy.request({
    method: "GET",

    url: `https://app.bookdbqa.online/api/Book/${itemId}`,
    failOnStatusCode: false,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: {},
  }).then((response) => {
    expect(response.status).to.eq(codeResponse);
  });
});

Cypress.Commands.add("PlaceOrder", (userId, token, codeResponse = 200) => {
  cy.request({
    method: "GET",

    url: `https://app.bookdbqa.online/api/Order/${userId}`,
    failOnStatusCode: false,
    headers: {
      accept: "application/json",
      "content-type": "application/json",

      authorization: token ? `Bearer ${token}` : "",
    },

    body: {},
  }).then((response) => {
    expect(response.status).to.eq(codeResponse);
  });
});
Cypress.Commands.add("LoginClickLibro", () => {
  cy.visit("https://app.bookdbqa.online/login");
  cy.completarDatosLogin(user.username, user.password);
  cy.url().should("include", "https://app.bookdbqa.online/");
  cy.get("app-book-card")
    .contains("Harry Potter and the Chamber of Secrets")
    .should("be.visible");
});
Cypress.Commands.add("BuscarLibro", (userId, token, codeResponse = 200) => {
  pageBook.visit();
  pageBook.buscarLibro("Red Rising");
  pageBook.seleccionarSugerencia();
});

Cypress.Commands.add("EliminarCarritoFront", () => {
    cy.loginApi(user.username, user.password).then((response) => {
        cy.deleteCartAPI(response.user_id);
    });

    cy.visit(url.login);
    cy.login(user.username, user.password);

    cy.url().should("include", url.home);
    pageHome.isBookVisible();
    componentNav.validation("0");

    cy.addBookToCart(1);

    cy.addBookToCart(2);

    componentNav.ClickShoppingCart();

    cy.url().should("include", url.ShoppingCart);

    pageCart.clickClearCartButton();

    pageCart.MessageClearCleared();
    pageCart.MessageEmpty_carty();
    pageCart.clickContinueShopping();
});

Cypress.Commands.add("CompraExitosa", () => {
  cy.visit(url.login);
  cy.loginApi(user.username, user.password).then((response) => {
    cy.deleteCartAPI(response.user_id);
  });
  cy.login(user.username, user.password);

  cy.url().should("include", url.home);
  pageHome.isBookVisible();
  componentNav.validation("0");

  pageHome.clicAddToCartButton();

  pageHome.MessageAddBook();
  componentNav.validation("1");

  componentNav.ClickShoppingCart();

  pageCart.visualizeBookTitle();

  pageCart.clicCheckOutButton();

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
