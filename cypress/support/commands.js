// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('validateUserProperties', (users) => {
    users.forEach((user) => {
      expect(user).to.have.property('id').and.not.be.null.and.not.equal(0);
      expect(user).to.have.property('email').and.not.be.null;
      expect(user).to.have.property('first_name').and.not.be.null;
      expect(user).to.have.property('last_name').and.not.be.null;
      expect(user).to.have.property('avatar').and.not.be.null;
    });
  });