import { defineConfig } from "cypress";

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: false,
    baseUrl: 'http://localhost:3000/algososh',
    viewportWidth: 1600,
    viewportHeight: 900,
  },
});