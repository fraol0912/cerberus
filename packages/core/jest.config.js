const baseConfigs = require("../../jest.config");

module.exports = {
  ...baseConfigs,
  rootDir: __dirname,
  moduleNameMapper: {
    "@cerberus/core(.*)$": "<rootDir>/src/$1",
  },
};
