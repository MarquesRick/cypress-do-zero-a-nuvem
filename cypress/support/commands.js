Cypress.Commands.add("fillMandatoryFieldsAndSubmit", (data = {
    //dessa forma, o comando aceita um objeto de dados para preencher os campos (default params)
    firstName: 'Default FirstName',
    lastName: 'Default LastName',
    email: 'default@example.com',
    textArea: 'Default text area content'
}) => {
    cy.get('#firstName').type(data.firstName);
    cy.get('#lastName').type(data.lastName);
    cy.get('#email').type(data.email);
    cy.get('#open-text-area').type(data.textArea);
    cy.get('button[type="submit"]').click() //clica no botão enviar
});