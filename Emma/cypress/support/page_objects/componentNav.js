class ComponentNav {

    validation(cant){
        cy.get('#mat-badge-content-0').contains(cant).should('be.visible')
    }

    ClicShopping_cart(){
    cy.get('.mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed').contains('shopping_cart').click()
    }

}module.exports = new ComponentNav();