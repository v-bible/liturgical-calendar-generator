module.exports = {
  extends: [
    'airbnb-base',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: [
      './tsconfig.json',
      './tsconfig.node.json', // Include .eslintrc.js file
    ],
  },
  plugins: ['import', 'prettier'],
  rules: {
    'import/extensions': [
      'warn',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: false,
      },
    ],
    'import/no-unresolved': 'warn',
    'import/order': [
      'warn',
      {
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'prefer-destructuring': [
      'warn',
      {
        array: false,
        object: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'sort-imports': [
      'warn',
      {
        ignoreDeclarationSort: true,
      },
    ],
    'spaced-comment': ['warn', 'always', { markers: ['/'] }],
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': [
      'error',
      { functions: true, classes: true, variables: false },
    ], // disable the rule for variables, but enable it for functions and classes
  },
  settings: {
    'import/resolver': { typescript: {} },
  },
};
