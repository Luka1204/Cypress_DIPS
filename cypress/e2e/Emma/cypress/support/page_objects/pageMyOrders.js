class PageMyOrders {
    
visualizeMyOrders(){
    cy.get('.mdc-data-table__content.ng-star-inserted').should('be.visible')
    }

clickFirstPurchaseOrder(){
    cy.get('.mdc-data-table__content.ng-star-inserted').children().first().click()
    }

VisializeOrders(){
    cy.get('.ng-tns-c151581814-0.ng-star-inserted').should('be.visible')
    }

}module.exports = new PageMyOrders();