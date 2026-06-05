describe('Prueba de filtrado por precio', () => {
it('Verificacion de slider', () => {
  cy.visit('https://app.bookdbqa.online/')
  cy.get('input[matsliderthumb=""]')
  .invoke('val', 200) // cambiamos el valor del filtro dentro del imput
    .trigger('change')   // mandamos el cambio
    .trigger('input');   // se manda sobre el input
})
});