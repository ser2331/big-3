// eslint-disable-next-line no-undef
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions":  [".js", ".jsx", ".tsx"] }],
        "indent": ["error", 4],
        "max-len": ["error", { "code":  180 }],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
    }
};
