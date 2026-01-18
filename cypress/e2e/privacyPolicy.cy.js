// Exercício 7: Teste Independente da Página de Política de Privacidade
it('testa a página de política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html');

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
        .should('be.visible');
    cy.contains('p', 'Talking About Testing').should('be.visible');
    cy.get('p').should('have.length.greaterThan', 0);
});