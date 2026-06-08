import user from "../../fixtures/user_luka.json";
describe('API | Casos de prueba 401 Compra', () => {

    let token
    let user_id

    before(() => {

       cy.loginApi(user.username,user.password).then((response) => {
            token = response.token
            user_id = response.user_id
             
        })

    })

    it('Comprar carrito exitosamente', () => {

        cy.anadirLibroCarritoAPI(token, user_id, 2)
    })

    it('CheckOut', () => {

            cy.checkOutAPI('', user_id).then((response) => {
                expect(response.status).to.eq(401);
            })


    })

})