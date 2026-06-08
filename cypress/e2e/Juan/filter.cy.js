describe('Prueba de filtro por precio con slider | Juan Yovera', () => {
it('Prueba de filtro por precio con slider', () => {
  cy.visit('https://app.bookdbqa.online/')
  cy.get('input[matsliderthumb=""]')
  .invoke('val', 200) // cambiamos el valor del filtro dentro del imput
    .trigger('change')   // mandamos el cambio
    .trigger('input');   // se manda sobre el input
})
});