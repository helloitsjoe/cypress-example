const { makeJestConfig } = require('jest-simple-config');

const config = makeJestConfig();

config.coverageReporters.push('lcov', 'clover');

module.exports = config;
