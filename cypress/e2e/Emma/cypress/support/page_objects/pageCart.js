class PageCart {

visualize_book_title(){
    cy.get('.mdc-data-table__content').should('be.visible')
    }

clicCheckOutButton(){
    cy.get('.mdc-button.mat-mdc-button-base.my-2.mdc-button--raised.mat-mdc-raised-button.mat-warn').click()
    }
}module.exports = new PageCart();