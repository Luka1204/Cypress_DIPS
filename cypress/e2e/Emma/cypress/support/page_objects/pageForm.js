class PageForm {

typeName(name){
cy.get('input[formcontrolname="name"]').type(name)
}
typeaddressLine1(address1){
cy.get('input[formcontrolname="addressLine1"]').type(address1)
}
typeaddressLine2(address2){
cy.get('input[formcontrolname="addressLine2"]').type(address2)
}

typepincode(pincode){
cy.get('input[formcontrolname="pincode"]').type(pincode)
}

typestate(state){
cy.get('input[formcontrolname="state"]').type(state)
}

view_order(){
    cy.get('.table')
}

view_form(){
    cy.get('.mat-mdc-card-content')
}

}module.exports = new PageForm();