import user from "../../fixtures/user_luka.json";
describe('Verificar respuesta 401 al intentar loguearse con contraseña incorrecta  | API | Luka Reyes', () => {
it('Verificar respuesta 401 al intentar loguearse con contraseña incorrecta', () => {

    cy.loginApi(user.username,"Automata699").then((response)=>{
        expect(response.status).to.eq(401);
    });
        /* cy.request({
            method: 'POST',
            url: 'https://app.bookdbqa.online/api/login',
            failOnStatusCode: false,
            body: {
                username: 'lukareyes',
                password: 'Automata699'
            }

        }).then((response) => {

            expect(response.status).to.eq(401);
        }) */

    })

});