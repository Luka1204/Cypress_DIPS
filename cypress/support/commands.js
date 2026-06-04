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

const pageRequest = require('./page_objects/pageRequest.js');
const compraExito = require('./page_objects/pageCompraExito.js');
const pageLogin = new require('./page_objects/pageLogin.js');
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
    pageLogin.typeUseName(username);
    pageLogin.typePassword(password);
    pageLogin.clickButtonLogin();
});

Cypress.Commands.add('compraExitoAPI', () => {
    
    pageLogin.loginApi().then((response)=>{
        var token = response.token
        var user_id = response.user_id
        compraExito.comparCarrito(token, user_id);
        compraExito.checkOut(token, user_id);
        compraExito.verOrder(token, user_id);
    });
})