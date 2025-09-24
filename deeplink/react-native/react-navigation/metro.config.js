const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration.
 * https://metrobundler.dev/docs/configuration.
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {}; // Customize options here

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
