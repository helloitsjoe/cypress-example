const { makeJestConfig } = require('jest-simple-config');

const config = makeJestConfig();

// yarn scripts collect coverage
config.collectCoverage = false;

module.exports = config;
