describe('Casos de prueba API Compra Exitosa',()=>{
    it('Comprar carrito exitosamente',()=>{
        cy.request({
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
            cy.log(user_id)
            cy.request({
                method:'POST',
                url:'https://app.bookdbqa.online/api/ShoppingCart/AddToCart/'+user_id+'/2',
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
        })
    })
})