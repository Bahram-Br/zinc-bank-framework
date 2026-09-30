// Cucumber.js configuration.
// Docs: https://github.com/cucumber/cucumber-js/blob/main/docs/configuration.md
module.exports = {
  default: {
    // Compile TypeScript on the fly via ts-node.
    requireModule: ['ts-node/register'],
    // Load support files (World + hooks) and every step definition.
    require: [
      'src/support/**/*.ts',
      'features/step-definitions/**/*.ts',
    ],
    // Console + HTML + JSON reporting.
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
    ],
    // Do not prompt to publish reports to Cucumber cloud.
    publishQuiet: true,
  },
};
