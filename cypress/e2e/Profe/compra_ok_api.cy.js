describe('API | Casos de prueba Compra Exitosa', () => {

    it('Comprar carrito exitosamente', () => {
        cy.compraExitoAPI()
    })
/* 
    let token
    let user_id

    before(() => {

        cy.request({
            method: 'POST',
            url: 'https://app.bookdbqa.online/api/login',
            body: {
                username: 'lukareyes',
                password: 'Automata67'
            }

        }).then((response) => {

            expect(response.status).to.eq(200)

            token = response.body.token
            user_id = response.body.userDetails.userId

            cy.log(token)
            cy.log(user_id)

        })

    })

    it('Comprar carrito exitosamente', () => {

        cy.request({
            method: 'POST',
            url: `https://app.bookdbqa.online/api/ShoppingCart/AddToCart/${user_id}/2`,
            headers: {
                Authorization: `Bearer ${token}`
            }

        }).then((response) => {

            expect(response.status).to.eq(200)

        })

    })

    it('CheckOut', () => {

        cy.request({
            method: 'POST',
            url: `https://app.bookdbqa.online/api/CheckOut/${user_id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {"orderDetails":[{"book":{"bookId":2,"title":"Harry Potter and the Chamber of Secrets","author":"JKR","category":"Mystery","price":236,"coverFileName":"9d8f4978-0ef8-42d0-873a-4eb583439237HP2.jpg"},"quantity":1}],"cartTotal":236}

        }).then((response) => {

            expect(response.status).to.eq(200)

        })

    })

    it('VerOrder', () => {

        cy.request({
            method: 'GET',
            url: `https://app.bookdbqa.online/api/Order/${user_id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }

        }).then((response) => {

            expect(response.status).to.eq(200)

        })

    }) */

})