class PageMyOrders {
    
visualize_My_Orders(){
    cy.get('.mdc-data-table__content.ng-star-inserted').should('be.visible')
    }

clickFirst_purchase_Order(){
    cy.get('.mdc-data-table__content.ng-star-inserted').children().first().click()
    }

}module.exports = new PageMyOrders();