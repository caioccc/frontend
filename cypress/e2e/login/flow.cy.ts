import { defaultInterceptors } from "../../interceptors/dashboard";

describe("Teste de Fluxo de Login", () => {
    beforeEach(() => {
      defaultInterceptors();
      cy.visit("http://localhost:3000/login");
      cy.wait(1000);
    });

    it("Realiza login invalido na plataforma", () => {
      cy.get(".username").type("supertest");
      cy.get(".password").type("Admin123!");
      cy.get(".test-button").click();

      cy.wait("@login_invalid");

      cy.url().should("include", "/login");
    });

    it("Realiza login válido na plataforma", () => {
      cy.get(".test-button-register").click();

      cy.get(".username").type("testuser");
      cy.get(".email").type("emailteste@gmail.com");
      cy.get(".password").type("Admin123!");
      cy.get(".confirmpassword").type("Admin123!");
      cy.get(".test-button").click();

      cy.wait("@register");

      cy.url().should("include", "/login");

      cy.get(".username").type("testuser");
      cy.get(".password").type("Admin123!");
      cy.get(".test-button").click();

      cy.wait("@login");

      cy.url().should("include", "/tasks");
    });
  });
