class PageBook {
  // 1. Definición de los Selectores (Locators)
  get searchInput() {
    return cy.get('input[placeholder="Search books or authors"]');
  }

  get autocompleteDropdown() {
    return cy.get('#mat-autocomplete-0');
  }

  get bookTooltipLink() {
    return cy.get('a.mat-mdc-tooltip-trigger');
  }

  // 2. Métodos de Acción
  visit() {
    cy.visit('https://app.bookdbqa.online/');
  }

  buscarLibro(libro) {
    this.searchInput.type(libro);
  }

  seleccionarSugerencia() {
    this.autocompleteDropdown.click();
  }

  verDetalleLibro() {
    this.bookTooltipLink.click({ multiple: true });
  }
}module.exports= new PageBook();