import pageLogin from "../page_objects/pageLogin";


//Cypress.Commands.add('login', (name, password) => {

    //pageLogin.typeUserName(name);
    //pageLogin.typeUserPassword(password);
    //pageLogin.clickLoginButton();

//})

Cypress.Commands.add('deleteCartAPI', (name, password) => {
    cy.request({
        method: 'DELETE',
        url: 'https://app.bookdbqa.online/api/shoppingcart/1038',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRW1tYTc2ODkyIiwic3ViIjoiVXNlciIsImp0aSI6ImQ5ZDAxMjU0LTc0ZWQtNGUyMC1iNmYzLWNhNzhkYTJiZmY5YSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJ1c2VySWQiOiIxMDM4IiwiZXhwIjoxNzc5NDA0OTgxLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM2NC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM2NC8ifQ.O6lOeY4VYeuv_M7xJzxnhoX3lrtp4A-9RInaJpurZQU'
        }
    }).then((Response) => {
        expect(Response.status).to.eq(200)
    })

})
