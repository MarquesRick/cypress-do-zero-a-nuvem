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
    cy.clock() //congela o relógio do navegador para controlar o tempo

    cy.get('#firstName').type('Henrique') //preenche o campo nome
    cy.get('#lastName').type('Marques') //preenche o campo sobrenome
    cy.get('#email').type('Henrique@gmail.com') //preenche o campo email
    cy.get('#open-text-area').type('Teste '.repeat(35), { delay: 0 }) //preenche a área de texto (Exercicio 1 Extra)
    cy.get('button[type="submit"]').click() //clica no botão enviar

    cy.get('.success').should('be.visible') //verifica se a mensagem de sucesso está visível

    cy.tick(3000) //avança o relógio em 3 segundos
    cy.get('.success').should('not.be.visible') //verifica se a mensagem de sucesso desapareceu
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

  // Exercicio aula 3 - Selecionando um produto (YouTube) por seu texto
  it('seleciona um produto (YouTube) por seu texto', () => { //descrição do caso de teste + bloco de teste
    cy.get('#product') //seleciona o campo de seleção de produtos
      .select('YouTube') //seleciona a opção 'YouTube'
      .should('have.value', 'youtube') //verifica se o valor selecionado é 'youtube'
  })

  // Exercicio aula 3 - Extra 1 - Selecionando um produto (Mentoria) por seu valor
  it('seleciona um produto (Mentoria) por seu valor', () => { //descrição do caso de teste + bloco de teste
    cy.get('#product') //seleciona o campo de seleção de produtos
      .select('mentoria') //seleciona a opção com valor 'mentoria'
      .should('have.value', 'mentoria') //verifica se o valor selecionado é 'mentoria'
  })

  // Exercicio aula 3 - Extra 2 - Selecionando um produto (Blog) por seu índice
  it('seleciona um produto (Blog) por seu índice', () => { //descrição do caso de teste + bloco de teste
    cy.get('#product') //seleciona o campo de seleção de produtos
      .select(1) //seleciona a segunda opção (índice 1)
      .should('have.value', 'blog') //verifica se o valor selecionado é 'blog'
  })

  // Exercicio aula 4 - Marca o tipo de atendimento "Feedback"
  it('marca o tipo de atendimento "Feedback"', () => { //descrição do caso de teste + bloco de teste
    cy.get('input[type="radio"][value="feedback"]') //seleciona o botão de rádio com valor 'Feedback'
      .check() //marca o botão de rádio
      .should('be.checked') //verifica se o botão de rádio está marcado
  })

  // Exercicio aula 4 - Extra 1 - Marca cada tipo de atendimento
  it('marca cada tipo de atendimento', () => { //descrição do caso de teste + bloco de teste
    cy.get('input[type="radio"]') //seleciona todos os botões de rádio
      .should('have.length', 3) //verifica se há 3 botões de rádio
      .each($radio => { //itera sobre cada botão de rádio
        cy.wrap($radio) //embrulha o elemento jQuery para usar comandos Cypress
          .check() //marca o botão de rádio
          .should('be.checked') //verifica se o botão de rádio está marcado
      })
  })

  // Exercicio aula 5 - Marca ambos checkboxes, depois desmarca o último
  it('marca ambos checkboxes, depois desmarca o último', () => { //descrição do caso de teste + bloco de teste
    cy.get('input[type="checkbox"]') //seleciona todos os checkboxes
      .check() //marca todos os checkboxes
      .should('be.checked') //verifica se todos os checkboxes estão marcados
      .last() //seleciona o último checkbox
      .uncheck() //desmarca o último checkbox
      .should('not.be.checked') //verifica se o último checkbox está desmarcado
  })

  // Exercicio aula 5 - Extra 1 - Marca cada tipo de atendimento
  it('marca cada tipo de atendimento', () => { //descrição do caso de teste + bloco de teste
    cy.get('input[type="radio"]') //seleciona todos os botões de rádio
      .should('have.length', 3) //verifica se há 3 botões de rádio
      .each($radio => { //itera sobre cada botão de rádio
        cy.wrap($radio) //embrulha o elemento jQuery para usar comandos Cypress
          .check() //marca o botão de rádio
          .should('be.checked') //verifica se o botão de rádio está marcado
      })
  })

  // Exercicio aula 6 - Seleciona um arquivo da pasta fixtures
  it('seleciona um arquivo da pasta fixtures', () => { //descrição do caso de teste + bloco de teste
    cy.get('input[type="file"]') //seleciona o campo de upload de arquivo
      .selectFile('cypress/fixtures/example.json') //seleciona o arquivo example.json da pasta fixtures
      .should(input => { //verifica se o arquivo foi selecionado corretamente
        expect(input[0].files[0].name).to.equal('example.json') //verifica se o nome do arquivo selecionado é 'example.json'
      })
  })

  // Exercicio aula 6 - Extra 1 - Seleciona um arquivo da pasta fixtures usando o método selectFile
  it('seleciona um arquivo da pasta fixtures usando o método selectFile', () => { //descrição do caso de teste + bloco de teste
    cy.get('input[type="file"]') //seleciona o campo de upload de arquivo
      .should('not.have.value') //verifica se o campo está vazio
      .selectFile('./cypress/fixtures/example.json') //seleciona o arquivo example.json da pasta fixtures
      .then(input => { //usa uma função then para acessar o elemento input
        expect(input[0].files[0].name).to.equal('example.json') //verifica se o nome do arquivo selecionado é 'example.json'
      })
  })
  // Exercicio aula 6 - Extra 2 -  Simula um drag-and-drop para selecionar um arquivo
  it('seleciona um arquivo simulando um drag-and-drop', () => { //descrição do caso de teste + bloco de teste
    cy.get('input[type="file"]') //seleciona o campo de upload de arquivo
      .should('not.have.value') //verifica se o campo está vazio
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' }) //simula um drag-and-drop para selecionar o arquivo example.json
      .then(input => { //usa uma função then para acessar o elemento input
        expect(input[0].files[0].name).to.equal('example.json') //verifica se o nome do arquivo selecionado é 'example.json'
      })
  })

  // Exercicio aula 6 - Extra 3 -  seleciona um arquivo utilizando uma fixture para a qual foi dada um alias
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => { //descrição do caso de teste + bloco de teste
    cy.fixture('example.json').as('sampleFile') //carrega a fixture example.json e atribui um alias 'sampleFile'
    cy.get('input[type="file"]') //seleciona o campo de upload de arquivo
      .should('not.have.value') //verifica se o campo está vazio
      .selectFile('@sampleFile') //seleciona o arquivo usando o alias
      .then(input => { //usa uma função then para acessar o elemento input
        expect(input[0].files[0].name).to.equal('example.json') //verifica se o nome do arquivo selecionado é 'example.json'
      })
  })

  // Exercicio aula 7 - Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => { //descrição do caso de teste + bloco de teste
    cy.contains('a', 'Política de Privacidade') //seleciona o link da política de privacidade
      .should('have.attr', 'href', 'privacy.html') //verifica se o atributo target é '_blank', indicando que abre em outra aba
      .and('have.attr', 'target', '_blank') //verifica se o atributo target é '_blank', indicando que abre em outra aba
  })
  // Exercicio aula 7 - Extra 1 - Acessa a página da política de privacidade removendo o atributo target e clicando no link
  it('acessa a página da política de privacidade removendo o atributo target e clicando no link', () => { //descrição do caso de teste + bloco de teste
    cy.contains('a', 'Política de Privacidade') //seleciona o link da política de privacidade
      .invoke('removeAttr', 'target') //remove o atributo target para abrir na mesma aba
      .click() //clica no link

    cy.contains('h1', 'CAC TAT - Política de Privacidade') //verifica se a página contém o texto 'Política de Privacidade'
      .should('be.visible') //verifica se o texto está visível
  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => { //descrição do caso de teste + bloco de teste
    cy.get('.success') //seleciona a mensagem de sucesso
      .should('not.be.visible') //verifica se a mensagem não está visível
      .invoke('show') //exibe a mensagem
      .should('be.visible') //verifica se a mensagem está visível
      .and('contain', 'Mensagem enviada com sucesso.') //verifica se a mensagem contém o texto correto
      .invoke('hide') //esconde a mensagem
      .should('not.be.visible') //verifica se a mensagem não está visível

    cy.get('.error') //seleciona a mensagem de erro
      .should('not.be.visible') //verifica se a mensagem não está visível
      .invoke('show') //exibe a mensagem
      .should('be.visible') //verifica se a mensagem está visível
      .and('contain', 'Valide os campos obrigatórios!') //verifica se a mensagem contém o texto correto
      .invoke('hide') //esconde a mensagem
      .should('not.be.visible') //verifica se a mensagem não está visível
  })

  it('preenche a área de texto usando o comando invoke', () => { //descrição do caso de teste + bloco de teste
    const longText = Cypress._.repeat('Texto longo de teste. ', 20) //cria um texto longo repetindo uma frase

    cy.get('#open-text-area') //seleciona a área de texto
      .invoke('val', longText) //preenche a área de texto usando o comando invoke
      .should('have.value', longText) //verifica se a área de texto foi preenchida corretamente
  })

  it('faz uma requisição HTTP e verifica a resposta', () => { //descrição do caso de teste + bloco de teste
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html') //faz uma requisição HTTP para a URL especificada
      .as('getRequest') //atribui a resposta a um alias 'response'
      .its('status') //acessa o status da resposta
      .should('be.equal', 200) //verifica se o status é 200
    cy.get('@getRequest') //acessa a resposta usando o alias
      .its('statusText') //acessa o statusText da resposta
      .should('be.equal', 'OK') //verifica se o statusText é 'OK'
    cy.get('@getRequest') //acessa a resposta usando o alias
      .its('body') //acessa o body da resposta
      .should('include', 'CAC TAT') //verifica se o body contém o título esperado  
  })
})