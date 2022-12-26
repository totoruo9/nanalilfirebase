// const { getDefaultConfig } = require('@expo/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.assetExts.push('cjs');

// module.exports = defaultConfig;

require('ts-node/register');
module.exports = require('./metro.config.ts');