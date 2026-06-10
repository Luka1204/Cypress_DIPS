class ComponentNav {

    validation(cant){
        cy.get('.mat-badge-content').should('have.text', '0'+cant)
    }

    ClickShoppingCart(){
        cy.get('.mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed').contains('shopping_cart').click()
    }

}module.exports = new ComponentNav();