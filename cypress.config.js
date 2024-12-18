const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Configura o Mochawesome reporter
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",  // Diretório onde os relatórios serão armazenados
      overwrite: false,              // Não sobrescrever relatórios antigos
      html: true,                    // Gera relatório HTML
      json: true,                    // Gera o arquivo JSON (útil para outras ferramentas)
      charts: true,                  // Habilita gráficos no relatório (se disponível)
      reportPageTitle: "Relatório de Testes Cypress", // Título da página do relatório
      embeddedScreenshots: true,     // Incorpora capturas de tela no relatório
      inlineAssets: true,            // Incorpora CSS e JS no HTML (não precisa de arquivo externo)
      saveAllAttempts: false,        // Salva todos os relatórios de tentativas de testes
    },
    baseUrl: "https://reqres.in", // Defina seu endpoint de base da API
  },
});
