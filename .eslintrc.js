module.exports = {
  root: true,
  env: {
      es2021: true,
      node: true,
      jest: true
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: 'standard-with-typescript',
  overrides: [
      {
          files: ['contexts/{backend,frontend}/*/src/**/*.ts'],
          rules: {
              'hexagonal-architecture/enforce': ['error']
          }
      }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off'
  }
}
