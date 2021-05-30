module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
    },
    plugins: ['prettier', '@typescript-eslint'],
    rules: {
        'import/prefer-default-export': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                ts: 'never',
            },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts', '.json'],
            },
        },
    },
};
