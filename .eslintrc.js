module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest": true,
    },
    "extends": [
        "eslint:recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": ["warn", 4, {"SwitchCase": 1}],
        "semi": ["warn", "always"],
        "space-unary-ops": 2,
        "comma-dangle": ["error", "never"],
        "arrow-parens": ["error", "always"],
        "dot-notation": "off",
        "max-len": "off",
        "import/no-cycle": "off",
        'import/prefer-default-export': "off",
        "import/no-named-as-default-member": "off",
        "object-curly-newline": "off",
        "no-else-return": "warn",
        "no-use-before-define": "off",
        "no-restricted-syntax": "off",
        "no-continue": "off",
        "no-bitwise": "off",
        "no-unused-vars": ["off"],
        "no-console": "off",
        "no-plusplus": "off",
        "no-underscore-dangle": "off",
        "no-await-in-loop": "off",
        "no-restricted-properties": "off",
        "no-restricted-globals": "off",
        "no-shadow": "off",
        "no-case-declarations": "off",
        "no-nested-ternary": "off",
        "no-debugger": "off",
        "no-mixed-operators": "off",
        "prefer-destructuring": "off",
        "operator-linebreak": "off",
        'prefer-destructuring': 'off',
        'quotes': ['error', 'single'],

        // TODO : fix
        "radix": ["off", "as-needed"],
        "no-param-reassign": ["off", {"props": false}],
        "valid-typeof": ["off", {"requireStringLiterals": true}],
        "consistent-return": ["off"],
        "no-prototype-builtins": ["off"],
        "prefer-rest-params": ["off"],
        "eqeqeq": ["off"],
        "class-methods-use-this": ["off"],
        "import/no-named-as-default": "off",
        "default-case": "off",
        "prefer-const": "off",
        "no-undef": "off",
        "no-return-assign": "off",
        "no-empty": "off",
        "no-useless-escape": "off",
        "no-cond-assign": "off",
        "no-empty-function": "off",
        "no-useless-catch": "off",
        "prefer-promise-reject-errors": "off",
        "array-callback-return": "off",
        "no-unused-expressions": "off",
        "implicit-arrow-linebreak": "off",
        "new-cap": "off",
        "no-useless-constructor": "off",
        "no-multi-assign": "off",
        "no-unsafe-negation": "off",
        "no-loop-func": "off"
    }
};
