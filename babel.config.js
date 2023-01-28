module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          api: './src/api',
          assets: './src/assets',
          components: './src/components',
          constants: './src/constants',
          screens: './src/screens',
          src: './src',
          utils: './src/utils',
        },
      },
    ],
  ],
};
