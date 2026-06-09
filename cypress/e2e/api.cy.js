import user from "../fixtures/user_luka.json";
describe("Casos de prueba de APIs", () => {
  it("API | Comprar carrito exitosamente | Bianca Cascio", () => {
    cy.loginAPI(user.name, user.password).then((token) => {
      cy.postCheckOutAPI(user.userId, token, 200);
    });
  });

  it("API | Error al comprar carrito sin token | Bianca Cascio", () => {
    cy.loginAPI(user.name, user.password).then((token) => {
      cy.postCheckOutAPI(user.userId, "", 401);
    });
  });

  it("API | Agregar un libro a favoritos | Emmanuel Delorenzo", () => {
    cy.loginAPI(user.name, user.password).then((token) => {
      cy.AddToFavorite(user.userId, 3, token, 200);
    });
  });

  it("API | Error al agregar un libro a favoritos sin token | Emmanuel Delorenzo", () => {
    cy.loginAPI(user.name, user.password).then((token) => {
      cy.AddToFavorite(user.userId, 3, "", 401);
    });
  });

  it.only("API | Generar orden de compra | Juan Yovera", () => {
    cy.loginAPI(user.name, user.password).then((token) => {
      cy.PlaceOrder(user.userId, token, 200);
    });
  });

  it.only("API | Generar orden de compra | Juan Yovera", () => {
    cy.loginAPI(user.name, user.password).then((token) => {
      cy.PlaceOrder(user.userId, "", 401);
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
