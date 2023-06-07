import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    specPattern: "./cypress/integration/*.feature",
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ) {
      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
  },
  fixturesFolder: "./cypress/fixtures",
});
