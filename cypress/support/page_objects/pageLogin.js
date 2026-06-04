import user from "../../fixtures/user.json";
import user_luka from "../../fixtures/user_luka.json";

class pageLogin {
  typeUseName(name) {
    cy.get('input[id="mat-input-0"]').type(name);
  }
  typePassword() {
    cy.get('input[id="mat-input-1"]').type(user.password);
  }
  clickButtonLogin() {
    cy.get("app-login button").contains("Login").click();
  }

  loginApi(username, password) {
    return cy
      .postRequest(
        "https://app.bookdbqa.online/api/login",
        { "Content-Type": "application/json", "Accept": "application/json" },
        {
          username: username,
          password: password,
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
