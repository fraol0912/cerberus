const baseConfigs = require("../../jest.config");

module.exports = {
  ...baseConfigs,
  rootDir: __dirname,
  moduleNameMapper: {
    "@cerberus/aegis(.*)$": "<rootDir>/src/$1",
  },
};
