import user from "../../fixtures/user.json";

class pageLogin {
  typeUseName(name) {
    cy.get('input[placeholder="Username"]').type(name);
  }
  typePassword() {
    cy.get('input[formcontrolname="password"]').type(user.password);
  }
  clickButtonLogin() {
    cy.get("app-login button").contains("Login").click();
  }

  loginApi() {
    return cy
      .postRequest(
        "https://app.bookdbqa.online/api/login",
        { "Content-Type": "application/json", "Accept": "application/json" },
        {
          username: user.name,
          password: user.password,
        }
      )
      .then((response) => {
        return {
          token: response.body.token,
          user_id: response.body.userDetails.userId,
        };
      });
  }
}
module.exports = new pageLogin();
