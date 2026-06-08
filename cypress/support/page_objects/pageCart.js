class PageCart {

visualizeBookTitle(){
    cy.get('.mdc-data-table__content').should('be.visible')
    }

clicCheckOutButton(){
    cy.get('.mdc-button.mat-mdc-button-base.my-2.mdc-button--raised.mat-mdc-raised-button.mat-warn').click()
    }

clickClearCartButton(){
    cy.get('button').contains(' Clear cart ').click()

    }
    
MessageClearCleared(){
    cy.contains('Cart cleared').should('be.visible')
    }
MessageEmpty_carty(){
    cy.get('.container').contains('Your shopping cart is empty.')
    }
    
clickContinueShopping(){
    cy.get('button').contains(' Continue shopping ')

    }
    
}module.exports = new PageCart();