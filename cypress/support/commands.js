// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import './page_objects/pageRequest.js'
import './page_objects/pageLogin.js'
import './page_objects/pageCompraExito.js'
import user from "../fixtures/user_luka.json";
import pageHome from "./page_objects/pageHome";
import componentNav from "./page_objects/componentNav";


const pageRequest = require('./page_objects/pageRequest.js');
const compraExito = require('./page_objects/pageCompraExito.js');
const pageLogin = new require('./page_objects/pageLogin.js');
const pageCarrito = require('./page_objects/pageCarrito.js');
const pageCheckout = require('./page_objects/pageCheckout.js');
Cypress.Commands.add('getRequest', (url, headers, body) => {
    return pageRequest.getRequest(url, headers, body);
})
Cypress.Commands.add('postRequest', (url, headers, body) => {
    return pageRequest.postRequest(url, headers, body);
})

Cypress.Commands.add('loginApi', (username,password) => {
    return pageLogin.loginApi(username,password);
});

Cypress.Commands.add('completarDatosLogin', (username,password) => {
    pageLogin.typeUserName(username);
    pageLogin.typeUserPassword(password);
    pageLogin.clickButtonLogin();
});

Cypress.Commands.add('compraExitoAPI', () => {
    
    pageLogin.loginApi(user.username,user.password).then((response)=>{
        var token = response.token
        var user_id = response.user_id
        compraExito.comparCarrito(token, user_id);
        compraExito.checkOut(token, user_id);
        compraExito.verOrder(token, user_id);
    });
})

Cypress.Commands.add('agregarLibroCarrito', (nombre_libro) => {
    pageCarrito.añadirLibroCarrito(nombre_libro);
});

Cypress.Commands.add('completarDatosCheckout', (name, addressLine1, addressLine2, pincode, state) => {
    pageCheckout.completarDatosCheckout(name, addressLine1, addressLine2, pincode, state);
});
Cypress.Commands.add('anadirLibroCarritoAPI', (token, user_id, book_id) => {
    pageCarrito.anadirLibroCarritoAPI(token, user_id, book_id);
});
Cypress.Commands.add('checkOutAPI', (token, user_id) => {
    pageCheckout.realizarCheckoutAPI(token, user_id);
});

Cypress.Commands.add('login', (name, password) => {
    pageLogin.typeUserName(name);
    pageLogin.typeUserPassword(password);
    pageLogin.clickButtonLogin();
})

Cypress.Commands.add('addBookToCart', (cant) => {
    pageHome.clicAddToCartButton()
    pageHome.MessageAddBook()
    componentNav.validation(cant)
})


Cypress.Commands.add('deleteCartAPI', (userId) => {
    cy.request({
        method: 'DELETE',
        url: `https://app.bookdbqa.online/api/shoppingcart/${userId}`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: user.token
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('loginAPI', (username, password) => {
    return cy.request({
        method: 'POST',
        url: 'https://app.bookdbqa.online/api/login',
        body: {
            username: username, // Cambiado de 'user' a 'username'
            password: password
        }
    }).then((response) => {
        
        return response.body.token; 
    });
}); 


Cypress.Commands.add('postCheckOutAPI', (userId, token, codeResponse) => {

    cy.request({
        method: 'POST',
        url: `https://app.bookdbqa.online/api/CheckOut/${userId}`, 
        failOnStatusCode: false, // importante para que cypress no falle automaticamente ante un error 400 o 500
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
             authorization: token ?` Bearer ${token}` : ''
        },
        body:
        {
            "orderDetails": [
                {
                    "book": {
                        "bookId": 3,
                        "title": "Harry Potter and the Prisoner of Azkaban",
                        "author": "JKR",
                        "category": "Romance",
                        "price": 213,
                        "coverFileName": "c63ade52-3f90-41fa-980a-1136b6ad2128HP3.jpg"
                    },
                    "quantity": 1
                }
            ],
            "cartTotal": 213
        }
    }).then((response) => {
        expect(response.status).to.eq(codeResponse)
    })

})



Cypress.Commands.add('AddToFavorite', (userId, itemId, token,codeResponse = 200) => {
    cy.request({
        method: 'POST',
        
        url: `https://app.bookdbqa.online/api/Wishlist/ToggleWishlist/${userId}/${itemId}`,
        failOnStatusCode: false, 
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            
            'authorization': token ? `Bearer ${token}` : ''
        },
        
        body: {} 
    }).then((response) => {
        expect(response.status).to.eq(codeResponse);
    });
});




Cypress.Commands.add('PlaceOrder', (userId, token,codeResponse = 200) => {
    cy.request({
        method: 'GET',
        
        url: `https://app.bookdbqa.online/api/Order/${userId}`,
        failOnStatusCode: false, 
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            
            'authorization': token ? `Bearer ${token}` : ''
        },
        
        body: {} 
    }).then((response) => {
        expect(response.status).to.eq(codeResponse);
    });
});