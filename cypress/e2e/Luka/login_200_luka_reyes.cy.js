import user_luka from "../../fixtures/user_luka.json";
describe('Verificar respuesta 200 al intentar loguearse con datos correctos  | API | Luka Reyes', () => {
it('Verificar respuesta 200 al intentar loguearse con datos correctos', () => {

    cy.loginApi(user_luka.username, user_luka.password).then((response)=>{
        expect(response.token).to.not.be.null;
        expect(response.user_id).to.not.be.null;
    });
        /* cy.request({
            method: 'POST',
            url: 'https://app.bookdbqa.online/api/login',
            body: {
                username: 'lukareyes',
                password: 'Automata67'
            }

        }).then((response) => {

            expect(response.status).to.eq(200);
        }) */

    })

});