
// hooks - trechos de código que executam antes ou depois dos testes
beforeEach(() => { //executa antes de cada caso de teste
  cy.visit('./src/index.html') //visita a página do aplicativo
})

// ex 1
describe('Central de Atendimento ao Cliente TAT', () => { //descrição do conjunto de testes
  // Exercicio aula 1
  it('verifica o título da aplicação', () => { //descrição do caso de teste + bloco de teste
    cy.visit('./src/index.html') //visita a página do aplicativo
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') //verifica o título da página
  })

  // Exercicio aula 2
  it('preenche os campos obrigatórios e envia o formulário', () => { //descrição do caso de teste + bloco de teste
    cy.get('#firstName').type('Henrique') //preenche o campo nome
    cy.get('#lastName').type('Marques') //preenche o campo sobrenome
    cy.get('#email').type('Henrique@gmail.com') //preenche o campo email
    cy.get('#open-text-area').type('Teste '.repeat(35), { delay: 0 }) //preenche a área de texto (Exercicio 1 Extra)
    cy.get('button[type="submit"]').click() //clica no botão enviar
    cy.get('.success').should('be.visible') //verifica se a mensagem de sucesso está visível
  })

  // Exercicio aula 2 - Extra 2
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => { //descrição do caso de teste + bloco de teste
    cy.get('#firstName').type('Henrique') //preenche o campo nome
    cy.get('#lastName').type('Marques') //preenche o campo sobrenome
    cy.get('#email').type('Henrique@gmail,com') //preenche o campo email com formatação inválida
    cy.get('#open-text-area').type('Teste') //preenche a área de texto
    cy.get('button[type="submit"]').click() //clica no botão enviar
    cy.get('.error').should('be.visible') //verifica se a mensagem de erro está visível
  })
})