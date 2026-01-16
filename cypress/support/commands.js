Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function () {
    cy.get('#firstName').type('Henrique');
    cy.get('#lastName').type('Marques');
    cy.get('#email').type('Henrique@gmail.com');
    cy.get('#open-text-area').type('Teste');
    cy.get('button[type="submit"]').click() //clica no botão enviar
});