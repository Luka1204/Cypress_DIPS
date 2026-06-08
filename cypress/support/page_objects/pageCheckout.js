class pageCheckout {
  completarDatosCheckout(name, addressLine1, addressLine2, pincode, state) {
    //Accion paso 3:
    cy.get(
      ".mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed",
    )
      .contains("shopping_cart")
      .click();

    //Respuesta del sistema paso 3:
    cy.get(".mdc-data-table__content").should("be.visible");

    //Accion paso 4:
    cy.get(
      ".mdc-button.mat-mdc-button-base.my-2.mdc-button--raised.mat-mdc-raised-button.mat-warn",
    ).click();

    //Respuesta del sistema paso 4:
    cy.url().should("include", "https://app.bookdbqa.online/checkout");
    cy.get(".table"); //orden
    cy.get(".mat-mdc-card-content"); //formulario

    //Accion paso 5:
    cy.get('input[formcontrolname="name"]').type(name);
    cy.get('input[formcontrolname="addressLine1"]').type(addressLine1);
    cy.get('input[formcontrolname="addressLine2"]').type(addressLine2);
    cy.get('input[formcontrolname="pincode"]').type(pincode);
    cy.get('input[formcontrolname="state"]').type(state);

    //Accion paso 6:
    cy.get("button").contains(" Place Order").click();
  }

  realizarCheckoutAPI(token, user_id) {
    var headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
      };
      if(token.length > 0){ 
        headers["Authorization"] = `Bearer ${token}`;
      }
    cy.postRequest(
      `https://app.bookdbqa.online/api/Checkout/${user_id}`,
      headers,
      {
        orderDetails: [
          {
            book: {
              bookId: 2,
              title: "Harry Potter and the Chamber of Secrets",
              author: "JKR",
              category: "Mystery",
              price: 236,
              coverFileName: "9d8f4978-0ef8-42d0-873a-4eb583439237HP2.jpg",
            },
            quantity: 1,
          },
        ],
        cartTotal: 236,
      },
    ).then((response) => {
      return response;
    });

  }
}
module.exports = new pageCheckout();
