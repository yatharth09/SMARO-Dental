module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react','@typescript-eslint','react-refresh'],
  rules: {
       'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/no-explicit-any':'off',
    '@typescript-eslint/no-unsafe-assignment':'off',
    '@typescript-eslint/no-empty-function':'off',
    '@typescript-eslint/no-unsafe-member-access':'off',
    '@typescript-eslint/no-unsafe-return':'off',
    '@typescript-eslint/no-unsafe-call':'off',
    '@typescript-eslint/no-unsafe-argument':'off',
    '@typescript-eslint/no-misused-promises':'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'quotes': ['error', 'double'],
  },
}
