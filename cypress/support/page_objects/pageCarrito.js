class pageCarrito
{
    añadirLibroCarrito(nombre_libro){
        cy.get('app-book-card').contains(nombre_libro).should('be.visible')
        //cy.get('#mat-badge-content-0').contains('0').should('be.visible')

        //Accion paso 2:
        cy.get('button').contains('Add to Cart').click()

        //Respuesta del sistema paso 2:
        cy.contains('One Item added to cart').should('be.visible')
    }

    anadirLibroCarritoAPI(user_id, token, book_id){
        cy.postRequest(
            `https://app.bookdbqa.online/api/ShoppingCart/AddToCart/${user_id}/${book_id}`,
            { "Authorization": `Bearer ${token}`, "Content-Type": "application/json", "Accept": "application/json" },
            {},
        ).then((response) => {

            expect(response.status).to.eq(200)

        })

    }
} module.exports = new pageCarrito();