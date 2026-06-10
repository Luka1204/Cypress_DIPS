

import pageSlider from "../support/page_objects/pageSlider"

describe("Casos de prueba de FRONT", () => {
  it("FRONT | Comprar carrito exitosamente y visualizar orden de compra | Bianca Cascio", () => {
    cy.CompraExitosa();
  });

  it("FRONT | borrar todos los productos del carrito utilizando el boton de Cart cleared | Emmanuel Delorenzo", () => {
    cy.EliminarCarritoFront();
  });

  it("FRONT | Verificar login exitoso | Luka Reyes", () => {
    cy.LoginClickLibro();
  });
  it('Debería mover el slider haciendo clic a la izquierda | Juan Yovera', () => {
    cy.visit(pageSlider.url);
    cy.get(pageSlider.priceSlider).click('left');
  });


  it("FRONT | Buscar Libro | Paul Soria", () => {
    cy.BuscarLibro();
  });
});
