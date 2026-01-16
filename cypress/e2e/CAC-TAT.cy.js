
describe('Central de Atendimento ao Cliente TAT', () => { //descrição do conjunto de testes
  it('verifica o título da aplicação', () => { //descrição do caso de teste + bloco de teste
    cy.visit('./src/index.html') //visita a página do aplicativo
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') //verifica o título da página
  })
})