describe("adição de clientes", () => {
  it("deve fazer login e adicionar um novo cliente", () => {
    cy.visit("/");
    cy.get('input[name="name"]').type("Jonas Santos");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/clients/list");

    cy.get('[data-testid="client-card"]', { timeout: 10000 }).should("exist");
    cy.get('[data-testid="client-card"]').should("have.length.greaterThan", 0);

    cy.contains("Criar cliente").click();

    cy.get('input[name="name"]').type("Maria Oliveira");
    cy.get('input[name="salary"]').type("5000");
    cy.get('input[name="companyValuation"]').type("100000");

    cy.get(".bg-white.rounded.shadow-lg").should("be.visible");
    cy.get('button[type="submit"]').click();

    cy.get(".bg-white.rounded.shadow-lg").should("not.exist");

    cy.get('[data-testid="client-card"]').should("contain", "Maria Oliveira");
  });
});
