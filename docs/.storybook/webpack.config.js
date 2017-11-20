const path = require('path');
const webpack = require('webpack');

module.exports = (storybookBaseConfig, configType) => {
  const DEV = configType === 'DEVELOPMENT';

  storybookBaseConfig.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: { cacheDirectory: true },
    },
  });

  storybookBaseConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.__REACT_NATIVE_DEBUG_ENABLED__': DEV,
    })
  );

  storybookBaseConfig.resolve.alias = {
    'react-native': 'react-native-web',
    'react-native-maps': path.join(__dirname, '../../src/'),
  };

  return storybookBaseConfig;
};
