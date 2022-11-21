module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:import/recommended',
        'plugin:import/typescript',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/strict',
        'plugin:prettier/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
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
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/await-thenable': 'error',
        indent: ['error', 4, { ignoredNodes: ['PropertyDefinition'] }],
        'max-len': ['error', { code: 120 }],
        'import/no-extraneous-dependencies': 'off',
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
