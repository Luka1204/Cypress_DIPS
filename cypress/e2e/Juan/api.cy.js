    /*it('API | Añadir a favoritos exitosamente', () => {

        cy.request({
            method: 'DELETE',
            url: 'https://app.bookdbqa.online/api/shoppingcart/1038',
            failOnStatusCode: false, // importante para que cypress no falle automaticamente ante un error 400 o 500
            headers:{
                accept:"application/json", 
                "content-type" :"application/json"
                },
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRW1tYTc2ODkyIiwic3ViIjoiVXNlciIsImp0aSI6ImMxNDg3ZTgyLTIzZmItNDAyNS1iMmFlLTE3NGZiMDYwNjIyNSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJ1c2VySWQiOiIxMDM4IiwiZXhwIjoxNzgwOTU1MzAzLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM2NC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM2NC8ifQ.RYPPC3IpWt2GG3juweb2A5givDvOL9kmfCSl0N-maKE"
        })
    import user from '../fixtures/user.json'
*/


describe('Prueba de filtro por precio con slider | Juan Yovera', () => {
it('Prueba de filtro por precio con slider', () => {
  cy.visit('https://app.bookdbqa.online/')
  cy.get('input[matsliderthumb=""]')
  .invoke('val', 200) // cambiamos el valor del filtro dentro del imput
    .trigger('change')   // mandamos el cambio
    .trigger('input');   // se manda sobre el input
})
});