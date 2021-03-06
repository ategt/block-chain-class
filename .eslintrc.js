module.exports = {
    "extends": "standard",
    "rules": {
        "semi": [2, "always"],
        "space-before-function-paren": ["error", "never"],
        "no-trailing-spaces": ["error", { "skipBlankLines": true }],
        "no-multiple-empty-lines": ["error", { "max": 4, "maxEOF": 2 }],
        "indent": ["error", 4],
        "quotes": ["error", "double", { "avoidEscape": true }],
        "eol-last": ["error", "never"]
    }
};
