import { defineConfig } from "cypress";
import {testUrl} from "./src/constants/dom-content";

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
    baseUrl: testUrl,
    viewportWidth: 1600,
    viewportHeight: 900,
  },
});
