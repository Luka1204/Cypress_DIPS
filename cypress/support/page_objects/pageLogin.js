

class pageLogin {
  typeUserName(name) {
        cy.get('input[formcontrolname="username"]').type(name)
    }

    typeUserPassword(password) {
        cy.get('input[formcontrolname="password"]').type(password)
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
        if(response.status === 200){
          return {
            token: response.body.token,
            user_id: response.body.userDetails.userId,
          };
        }
        return response;
        
      });
  }
}
module.exports = new pageLogin();
