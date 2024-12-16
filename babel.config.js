module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          '@src': './src',
        },
      },
    ],
    'react-native-worklets-core/plugin',
    'nativewind/babel',
    'react-native-reanimated/plugin',
  ],
};
