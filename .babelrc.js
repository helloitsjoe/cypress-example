const makeBabelConfig = require('babel-react-simple');

const config = makeBabelConfig();

// Note: This needs to happen at build time, not when running cypress!
// TODO: Figure out a better env var to use
if (process.env.CYPRESS) {
  config.plugins.push('istanbul');
}

module.exports = config;
