describe('Verificar respuesta 200 al intentar loguearse con datos correctos  | API | Luka Reyes', () => {
it('Verificar respuesta 200 al intentar loguearse con datos correctos', () => {

        cy.request({
            method: 'POST',
            url: 'https://app.bookdbqa.online/api/login',
            body: {
                username: 'lukareyes',
                password: 'Automata67'
            }

        }).then((response) => {

            expect(response.status).to.eq(200);
        })

    })

});