import pageLogin from '../support/page_objects/pageLogin';


Cypress.Commands.add('login', (name,password) => {

    pageLogin.typeUserName(name);
    pageLogin.typeUserPassword(password);
    pageLogin.clickLoginButton();

})