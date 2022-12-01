module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'jest'],
    extends: [
        'plugin:import/recommended',
        'plugin:import/typescript',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/strict',
        'plugin:prettier/recommended',
        'plugin:jest/recommended',
        'plugin:jest/style',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
        'jest/globals': true,
    },
    ignorePatterns: ['.eslintrc.js'],
    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json',
            },
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts'],
        },
    },
    rules: {
        // '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/prefer-reduce-type-parameter': 'off',
        '@typescript-eslint/no-extraneous-class': ['warn', { allowEmpty: true }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/await-thenable': 'error',
        indent: ['error', 4, { ignoredNodes: ['PropertyDefinition'] }],
        'max-len': ['error', { code: 120 }],
        'import/no-extraneous-dependencies': 'off',
        'max-depth': ['error', 2],
        'import/order': [
            'error',
            {
                'newlines-between': 'never',
                groups: [
                    ['builtin', 'external'],
                    ['internal', 'parent', 'sibling', 'index'],
                ],
            },
        ],
    },
};
