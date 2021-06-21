const baseConfigs = require("../../jest.config");

module.exports = {
  ...baseConfigs,
  rootDir: __dirname,
  moduleNameMapper: {
    "@cerberus/memory(.*)$": "<rootDir>/src/$1",
  },
};
