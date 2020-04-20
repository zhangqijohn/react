const { override, fixBabelImports } = require('customize-cra');
const path = require('path');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  function(config) {
    Object.assign(config.resolve.alias, {
      '@': path.resolve('src'),
    });
    return config;
  },
);