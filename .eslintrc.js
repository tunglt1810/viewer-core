module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    extends: ["eslint:recommended"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
    },
    rules: {
        indent: ["warn", 4, { SwitchCase: 1 }],
        semi: ["warn", "always"],
        "space-unary-ops": 2,
        "comma-dangle": ["error", "never"],
        "arrow-parens": ["error", "always"],
        "max-len": "off",
        "no-else-return": "warn",
        "no-unused-vars": ["off"],
        "no-console": "off",
        "no-case-declarations": "off",
        "object-curly-newline": "off",
        "operator-linebreak": "off",
        "prefer-destructuring": "off",
    },
};
