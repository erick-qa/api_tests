import { faker } from "@faker-js/faker";

describe("Api Tests", () => {
  let totalPages;
  let randomUserId;

  it("List Users And Store Random ID", () => {
    cy.api("GET", "https://reqres.in/api/users?page=1").then((response) => {
      expect(response.status).to.eq(200);
      totalPages = response.body.total_pages;
      cy.validateUserProperties(response.body.data);

      const randomUser = response.body.data[
        Math.floor(Math.random() * response.body.data.length)
      ];
      randomUserId = randomUser.id;
    });
  });

  it("Validate Specific User With Random ID", () => {
    cy.api(`GET`, `https://reqres.in/api/users/${randomUserId}`).then(
      (userResponse) => {
        expect(userResponse.status).to.eq(200);
        cy.validateUserProperties([userResponse.body.data]);
      }
    );
  });

  it("Validate All Pages Of Users", () => {
    for (let page = 2; page <= totalPages; page++) {
      cy.api("GET", `https://reqres.in/api/users?page=${page}`).then(
        (response) => {
          expect(response.status).to.eq(200);
          cy.validateUserProperties(response.body.data);
        }
      );
    }
  });

  it("Return Error 404 When Searching For A Non-Existent User", () => {
    cy.api({
      method: "GET",
      url: "https://reqres.in/api/users/23",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.empty;
    });
  });

  it("Create A User With Random Name And Job Title", () => {
    const randomName = faker.name.firstName();
    const randomJob = faker.name.jobTitle();

    const requestBody = {
      name: randomName,
      job: randomJob,
    };

    cy.api({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: requestBody,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("name", randomName);
      expect(response.body).to.have.property("job", randomJob);
      expect(response.body).to.have.property("id");
      Cypress.env("userId", response.body.id);
    });
  });

  it("Update User's Name And Job Title", () => {
    const userId = Cypress.env("userId");

    const updatedName = "morpheus";
    const updatedJob = "zion resident";

    const patchBody = {
      name: updatedName,
      job: updatedJob,
    };

    cy.api({
      method: "PATCH",
      url: `https://reqres.in/api/users/${userId}`,
      body: patchBody,
    }).then((patchResponse) => {
      expect(patchResponse.status).to.eq(200);
      expect(patchResponse.body).to.have.property("name", updatedName);
      expect(patchResponse.body).to.have.property("job", updatedJob);
    });
  });

  it("Delete The Created And Updated User", () => {
    const userId = Cypress.env("userId");
  
    // Excluir o usuário
    cy.api({
      method: "DELETE",
      url: `https://reqres.in/api/users/${userId}`,
    }).then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(204);
  
      cy.api({
        method: "GET",
        url: `https://reqres.in/api/users/${userId}`,
        failOnStatusCode: false,
      }).then((getResponse) => {
        expect(getResponse.status).to.eq(404);
      });
    });
  });
});