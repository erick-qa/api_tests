const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Configurar o reporter
      require("cypress-mochawesome-reporter/plugin")(on);

      // Retornar a configuração modificada
      return config;
    },
    // Outras configurações do Cypress
    baseUrl: "https://reqres.in", // Defina o baseUrl da sua API ou aplicação
    reporter: "cypress-mochawesome-reporter", // Usar o mochawesome como reporter
    reporterOptions: {
      reportDir: "cypress/reports",  // Local onde os relatórios serão salvos
      overwrite: false,              // Não sobrescrever os relatórios existentes
      html: true,                    // Gerar o relatório em HTML
      json: true                     // Gerar o relatório em JSON
    }
  },
});
