import '../fixtures/user.json'


class pagelogin {
    typeName(name) {
        cy.get('input[placeholder="Username"]').type('name')
    }

    typepassword(password) {
        cy.get('input[formcontrolname="password"]').type('password')
    }

    clickbuttonlogin(login) {
        cy.get('app-login button').contains('Login').click()
    }
} module.exports = new_pageLogin();