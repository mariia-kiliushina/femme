module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': ['warn'],
        curly: 'off',
        'no-duplicate-imports': 'warn',
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'warn',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-native/no-single-element-style-arrays': 'warn',
        'react-native/no-unused-styles': ['error'],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/no-unstable-nested-components': 'off',
      },
    },
  ],
};
