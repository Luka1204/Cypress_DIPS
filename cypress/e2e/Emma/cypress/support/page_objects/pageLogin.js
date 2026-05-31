import user from '../../fixtures/user.json'


class login {

typeUseName(name){
cy.get('input[placeholder="Username"]').type(name)
}
typePassword(){
cy.get('input[formcontrolname="password"]').type(user.password)
}
clickButtonLogin(){
cy.get('app-login button').contains('Login').click()
}

}module.exports = new login();