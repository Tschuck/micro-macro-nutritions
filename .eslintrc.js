module.exports = {
  root: true,
  extends: [
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    'import',
    '@typescript-eslint',
  ],
  ignorePatterns: [
    '.eslintrc.js',
    'ormconfig.js',
    'test.register.js',
    'ci-versioning.js',
  ],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'index',
          'sibling',
        ],
      },
    ],
    '@typescript-eslint/camelcase': 'off',
    'camelcase': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['off'],
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        // ignore single line return shorthands: (x) => {id: x}
        ignorePattern: '^.*?(.*?).=>.(.*?).*$', // eslint-disable-line
      },
    ],
  },
  overrides: [
    {
      files: [
        'src/database/models/**/*.ts',
        'src/db/models/**/*.ts',
      ],
      rules: {
        'import/no-cycle': 'off'
      }
    },
    {
      files: [
        'src/database/migrations/**/*.ts',
        'src/db/migrations/**/*.ts',
      ],
      rules: {
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'class-methods-use-this': 'off',
        'default-case': 'off',
        'jest/no-disabled-tests': 'off',
        'consistent-return': 'off',
        'import/prefer-default-export': 'off',
        'array-callback-return': 'off',
        'no-param-reassign': 'off',
        'prefer-destructuring': 'off',
      },
    },
  ]
};
