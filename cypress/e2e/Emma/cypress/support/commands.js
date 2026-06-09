const pageLogin = require('../support/page_objects/pageLogin')
import pageHome from "./page_objects/pageHome";
import componentNav from "./page_objects/componentNav";


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
        
        url: `https://app.bookdbqa.online/api/Order/${itemId}`,
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