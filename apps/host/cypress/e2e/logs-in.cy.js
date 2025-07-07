describe("loga no sistema inserindo um nome e desloga", () => {
  it("deve logar no sistema inserindo um nome", () => {
    cy.visit("/");

    cy.get('input[name="name"]').type("João Silva");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/clients/list");
  });

  it("deve deslogar do sistema clicando em sair na topbar", () => {
    cy.visit("/");
    cy.get('input[name="name"]').type("João Silva");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/clients/list");

    cy.contains("Sair").click();
    cy.url().should("include", "/auth/login");
  });
});
