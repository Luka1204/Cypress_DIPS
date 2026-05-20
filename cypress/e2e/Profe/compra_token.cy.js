/* 
Título: API | Error al comprar carrito sin token

Descripción: El objetivo de este test es verificar que el endpoint de compra del carrito valide correctamente la autenticación del usuario y devuelva un error cuando no se proporciona el token JWT Bearer.

Precondiciones:

    Tener un UserId de un usuario registrado
*/

describe('Casos de prueba API Compra Exitosa',()=>{
it('Comprar carrito exitosamente',()=>{
        /* cy.request({
            method:'POST',
            url:'https://app.bookdbqa.online/api/login',
            body:{
                "username":"lukareyes",
                "password":"Automata67"
            }
        }).then((response)=>{
            expect(response.status).to.eq(200)
            const token = response.body.token
            let user_id = response.body.userDetails.userId
            cy.log(token)
            cy.log(user_id) */
            cy.request({
                method:'POST',
                url:'https://app.bookdbqa.online/api/ShoppingCart/AddToCart/'+'1058'+'/2',
            })
        /* })
    }) */
})
})