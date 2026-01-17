// ex 1
describe('Central de Atendimento ao Cliente TAT', () => { //descrição do conjunto de testes
  // hooks - trechos de código que executam antes ou depois dos testes
  beforeEach(() => { //executa antes de cada caso de teste
    cy.visit('./src/index.html') //visita a página do aplicativo
  })

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

  // Exercicio aula 2 - Extra 3
  it('campo telefone continua vazio quando preenchido com valor não numérico', () => { //descrição do caso de teste + bloco de teste
    cy.get('#phone') //seleciona o campo telefone
      .type('abcdefghij') //tenta preencher com valor não numérico
      .should('have.value', '') //verifica se o campo continua vazio
  })

  // Exercicio aula 2 - Extra 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => { //descrição do caso de teste + bloco de teste
    cy.get('#firstName').type('Henrique') //preenche o campo nome
    cy.get('#lastName').type('Marques') //preenche o campo sobrenome
    cy.get('#email').type('Henrique@gmail.com') //preenche o campo email
    cy.get('#phone-checkbox').check() //marca o checkbox para tornar o telefone obrigatório
    cy.get('#open-text-area').type('Teste') //preenche a área de texto

    cy.get('button[type="submit"]').click() //clica no botão enviar
    cy.get('.error').should('be.visible') //verifica se a mensagem de erro está visível
  })

  // Exercicio aula 2 - Extra 5
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => { //descrição do caso de teste + bloco de teste
    cy.get('#firstName') //seleciona o campo nome
      .type('Henrique') //preenche o campo nome
      .should('have.value', 'Henrique') //verifica se o campo foi preenchido corretamente
      .clear() //limpa o campo nome
      .should('have.value', '') //verifica se o campo está vazio

    cy.get('#lastName') //seleciona o campo sobrenome
      .type('Marques') //preenche o campo sobrenome
      .should('have.value', 'Marques') //verifica se o campo foi preenchido corretamente
      .clear() //limpa o campo sobrenome
      .should('have.value', '') //verifica se o campo está vazio

    cy.get('#email') //seleciona o campo email
      .type('Henrique@gmail.com') //preenche o campo email
      .should('have.value', 'Henrique@gmail.com') //verifica se o campo foi preenchido corretamente
      .clear() //limpa o campo email
      .should('have.value', '') //verifica se o campo está vazio

    cy.get('#phone') //seleciona o campo telefone
      .type('1234567890') //preenche o campo telefone
      .should('have.value', '1234567890') //verifica se o campo foi preenchido corretamente
      .clear() //limpa o campo telefone
      .should('have.value', '') //verifica se o campo está vazio
  })

  // Exercicio aula 2 - Extra 6
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => { //descrição do caso de teste + bloco de teste
    cy.get('button[type="submit"]').click() //clica no botão enviar sem preencher os campos
    cy.get('.error').should('be.visible') //verifica se a mensagem de erro está visível
  })

  // Exercicio aula 2 - Extra 7 - Comando Customizado
  it('envia o formulário com sucesso usando um comando customizado', () => { //descrição do caso de teste + bloco de teste
    const data = {
      firstName: 'Henrique',
      lastName: 'Marques',
      email: 'Henrique@gmail.com',
      textArea: 'Teste'
    }

    cy.fillMandatoryFieldsAndSubmit(data) //usa o comando customizado para preencher os campos obrigatórios e enviar o formulário

    cy.get('.success').should('be.visible') //verifica se a mensagem de sucesso está visível
  })

  // Exercicio aula 2 - Extra 8 - Selecionando um botão utilizando método contains
  it('seleciona um botão por seu texto', () => { //descrição do caso de teste + bloco de teste
    cy.contains('button', 'Enviar').click() //seleciona o botão com o texto 'Enviar' e clica nele
    cy.get('.error').should('be.visible') //verifica se a mensagem de erro está visível
  })
})