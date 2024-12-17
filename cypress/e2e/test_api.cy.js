import { faker } from '@faker-js/faker';

describe("GET /api/users", () => {
  let totalPages;
  let randomUserId;

  // Teste para listar os usuários e armazenar o ID aleatório
  it("Deve listar os usuários e armazenar o ID aleatório", () => {
    cy.api("GET", "https://reqres.in/api/users?page=1").then((response) => {
      expect(response.status).to.eq(200);

      // Armazenar o número total de páginas
      totalPages = response.body.total_pages;

      // Validar os usuários da primeira página
      cy.validateUserProperties(response.body.data);

      // Selecionar um ID aleatório da primeira página
      const randomUser = response.body.data[
        Math.floor(Math.random() * response.body.data.length)
      ];
      randomUserId = randomUser.id; // Armazenar o ID aleatório
    });
  });

  // Teste para validar o usuário específico com ID aleatório
  it("Deve validar o usuário específico com ID aleatório", () => {
    cy.api(`GET`, `https://reqres.in/api/users/${randomUserId}`).then(
      (userResponse) => {
        expect(userResponse.status).to.eq(200);
        // Validar as propriedades do usuário com ID específico
        cy.validateUserProperties([userResponse.body.data]); // Passando como um array para o comando customizado
      }
    );
  });

  // Teste para validar todas as páginas de usuários
  it("Deve validar todas as páginas de usuários", () => {
    for (let page = 2; page <= totalPages; page++) {
      cy.api("GET", `https://reqres.in/api/users?page=${page}`).then(
        (response) => {
          expect(response.status).to.eq(200);
          cy.validateUserProperties(response.body.data);
        }
      );
    }
  });

  it("Deve retornar erro 404 ao buscar um usuário não encontrado", () => {
    cy.api({
      method: 'GET',
      url: 'https://reqres.in/api/users/23',
      failOnStatusCode: false // Garante que o Cypress não falhe com o status 404
    }).then((response) => {
      expect(response.status).to.eq(404); // Espera o código de status 404
      expect(response.body).to.be.empty; // O corpo da resposta deve ser vazio
    });
  });

  it("Deve criar um usuário com nome e cargo aleatórios", () => {
    // Gerar nome e cargo aleatórios
    const randomName = faker.name.firstName();
    const randomJob = faker.name.jobTitle();

    const requestBody = {
      name: randomName,
      job: randomJob
    };

    cy.api({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      body: requestBody
    }).then((response) => {
      expect(response.status).to.eq(201); // Verifica se o status é 201 (Created)
      
      // Verifica se o nome e o cargo enviados estão na resposta
      expect(response.body).to.have.property('name', randomName);
      expect(response.body).to.have.property('job', randomJob);

      // Armazenando o ID do usuário criado para usar no teste de PATCH
      Cypress.env('userId', response.body.id);
    });
  });

  it("Deve atualizar o nome e o cargo do usuário", () => {
    // Recuperando o ID do usuário criado anteriormente
    const userId = Cypress.env('userId');

    // Dados para atualizar
    const updatedName = "morpheus";
    const updatedJob = "zion resident";

    const patchBody = {
      name: updatedName,
      job: updatedJob
    };

    cy.api({
      method: 'PATCH',
      url: `https://reqres.in/api/users/${userId}`, // Usando o ID armazenado
      body: patchBody
    }).then((patchResponse) => {
      expect(patchResponse.status).to.eq(200); // Verifica se o status é 200 (OK)

      // Verifica se os dados do usuário foram atualizados corretamente
      expect(patchResponse.body).to.have.property('name', updatedName);
      expect(patchResponse.body).to.have.property('job', updatedJob);
    });
  });
  it("Deve deletar o usuário criado e atualizado", () => {
    // Recuperando o ID do usuário criado e atualizado
    const userId = Cypress.env('userId');

    // Passo 1: Deletar o usuário
    cy.api({
      method: 'DELETE',
      url: `https://reqres.in/api/users/${userId}`, // Usando o ID do usuário
    }).then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(204); // 204 No Content (sem corpo)

      // Passo 2: Verificar se o usuário foi realmente deletado tentando buscar o usuário
      cy.api({
        method: 'GET',
        url: `https://reqres.in/api/users/${userId}`,
        failOnStatusCode: false // Não falhar no status de erro, pois esperamos 404
      }).then((getResponse) => {
        expect(getResponse.status).to.eq(404); // Verifica que o usuário não foi encontrado
      });
    });
  });
});