const path = require('path');
const { override } = require('customize-cra');

module.exports = override(function (config, env) {
  return {
    ...config,
    optimization: {
      // https://billsdev.atlassian.net/browse/-6466
      // https://billsdev.atlassian.net/browse/-6178
      // https://github.com/mui-org/material-ui/issues/16609
      sideEffects: false,
    },
    resolve: {
      ...config.resolve,
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
  };
});
