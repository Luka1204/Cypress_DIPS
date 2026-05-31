class Pagehome {

isBookVisible(){
    cy.get('app-book-card').contains('Harry Potter and the Chamber of Secrets').should('be.visible')
    }

clicAddToCartButton(){
    cy.get('button').contains('Add to Cart').click()
    }

}module.exports = new Pagehome();