import user from "../fixtures/user_luka.json";
describe("Casos de prueba de APIs", () => {
  it.only("API | Comprar carrito exitosamente | Bianca Cascio", () => {
    cy.loginApi(user.username, user.password).then((res) => {
      cy.postCheckOutAPI(res.user_id, res.token, 200);
    });
  });

  it.only("API | Error al comprar carrito sin token | Bianca Cascio", () => {
    cy.loginApi(user.username, user.password).then((res) => {
      cy.postCheckOutAPI(res.user_id, "", 401);
    });
  });

  it.only("API | Agregar un libro a favoritos | Emmanuel Delorenzo", () => {
    cy.loginApi(user.username, user.password).then((res) => {
      cy.AddToFavorite(res.user_id, 3, res.token, 200);
    });
  });

  it.only("API | Error al agregar un libro a favoritos sin token | Emmanuel Delorenzo", () => {
    cy.loginApi(user.username, user.password).then((res) => {
      cy.AddToFavorite(res.user_id, 3, "", 401);
    });
  });

  it.only("API | Generar orden de compra | Juan Yovera", () => {
    cy.loginApi(user.username, user.password).then((res) => {
      cy.PlaceOrder(res.user_id, res.token, 200);
    });
  });

  it.only("API | Generar orden de compra | Juan Yovera", () => {
    cy.loginApi(user.username, user.password).then((res) => {
      cy.PlaceOrder(res.user_id, "", 401);
    });
  });

  it.only("API | Verificar respuesta 200 al intentar loguearse con datos correctos | Luka Reyes", () => {
    cy.loginApi(user.username, user.password).then((response) => {
      expect(response.token).to.not.be.null;
      expect(response.user_id).to.not.be.null;
    });
  });
  it("Verificar respuesta 401 al intentar loguearse con contraseña incorrecta", () => {
    cy.loginApi(user.username, "Automata699").then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
