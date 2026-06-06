class CompraExito {
  comparCarrito(token, user_id) {
    cy.postRequest(
      `https://app.bookdbqa.online/api/ShoppingCart/AddToCart/${user_id}/2`,{
          Authorization: `Bearer ${token}`,
        },
      {},
    ).then((response) => {
      expect(response.status).to.eq(200);
    });
  }

  checkOut(token, user_id) {
    cy.postRequest(
      `https://app.bookdbqa.online/api/CheckOut/${user_id}`,
      {
        Authorization: `Bearer ${token}`,
      },
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
      expect(response.status).to.eq(200);
    });
  }

  verOrder(token, user_id) {
    cy.getRequest(`https://app.bookdbqa.online/api/Order/${user_id}`,{
        Authorization: `Bearer ${token}`,
      } ,{}).then((response) => {
      expect(response.status).to.eq(200);
    });
  }
}
module.exports = new CompraExito();
