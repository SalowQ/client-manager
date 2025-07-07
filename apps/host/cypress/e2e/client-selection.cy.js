describe("seleção de clientes e navegação", () => {
  it("deve fazer login, verificar clientes, selecionar 2 clientes e navegar para página de selecionados", () => {
    cy.visit("/");
    cy.get('input[name="name"]').type("Maria Santos");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/clients/list");

    cy.get('[data-testid="client-card"]', { timeout: 10000 }).should("exist");
    cy.get('[data-testid="client-card"]').should("have.length.greaterThan", 0);

    cy.get('[data-testid="client-card"]')
      .first()
      .find('button[aria-label="Adicionar"]')
      .click();
    cy.get('[data-testid="client-card"]')
      .eq(1)
      .find('button[aria-label="Adicionar"]')
      .click();

    cy.contains("Clientes selecionados").click();

    cy.url().should("include", "/clients/list-selected");
    cy.get('[data-testid="client-card"]').should("have.length", 2);

    cy.get('[data-testid="client-card"]')
      .first()
      .find('button[aria-label="Remover"]')
      .should("exist");
    cy.get('[data-testid="client-card"]')
      .eq(1)
      .find('button[aria-label="Remover"]')
      .should("exist");
  });
});
