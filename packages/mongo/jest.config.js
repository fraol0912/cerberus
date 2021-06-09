const baseConfigs = require("../../jest.config");

module.exports = {
  ...baseConfigs,
  rootDir: __dirname,
  moduleNameMapper: {
    "@cerberus/mongo(.*)$": "<rootDir>/src/$1",
  },
};
