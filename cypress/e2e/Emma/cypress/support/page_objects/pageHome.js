class Pagehome {

isBookVisible(){
    cy.get('app-book-card').contains('Harry Potter and the Chamber of Secrets').should('be.visible')
    }

clicAddToCartButton(){
    cy.get('button').contains('Add to Cart').click()
    }

MessageAddBook(){
    cy.contains('One Item added to cart').should('be.visible')
}
}module.exports = new Pagehome();