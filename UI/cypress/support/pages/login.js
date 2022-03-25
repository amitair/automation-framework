/// <reference types="cypress" />

export class Login {
    pageTitle = "#kc-page-title"
    username = "#email"
    password = "#password"
    loginbtn = 'button[class^="submit_btn"]'
    rememberMe = "input#rememberMe"
    clickForgotPassword() {
      return cy.get("a").contains("Forgot Password?").click();
    }

    // forgotten password form
    forgottenPasswordForm = "form#kc-reset-password-form"
    submitForgottenPasswordForm() {
      return cy.get("button").contains("Submit").click();
    }
};

export const login = new Login();
