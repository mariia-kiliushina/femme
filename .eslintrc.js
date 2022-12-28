module.exports = {
  root: true,
  rules: {
    curly: 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 2,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-duplicate-imports': 'warn',
  },
  plugins: ['react-hooks', 'react-native'],

  extends: '@react-native-community',
};
