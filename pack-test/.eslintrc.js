module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  root: true,
  env: {
    "browser": true,
    "node": true,
    "commonjs": true,
    "amd": true,
    "es6": true,
    "worker": true
  },
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module",
    "allowImportExportEverywhere": true,
    "classes":true
  },
  plugins: [
    "babel"
  ],
  globals: {
    "document": true,
    "localStorage": true,
    "window": true,
    "t": true,
    "_": true,
    "d3": true,
    "iD": true,
    "$": true,
    "bootstrap": true,
    "context": true,
    "rbush": true,
    "osmAuth": true,
    "JXON": true,
    "toGeoJSON": true,
    "sexagesimal": true,
    "marked": true,
    "arguments": true,
    "BigInt": true,
    "mbcAccount": true,
  },
  "rules": {
    "semi": "error"
    "indent": [
      "error",
      4,
      { "SwitchCase": 1 }
    ],
    "no-undef": 2,
    "no-mixed-operators": 0,
    "camelcase": 0,
    "standard/no-callback-literal": 0,
    "no-useless-escape": 0,
    "no-useless-call": 0,
    "no-unused-vars": 0,
    "import/export": 0,
    "handle-callback-err": 0,
    "no-eval": 0,
    "new-cap": 0,
    "no-constant-condition": 0,
    "no-proto": 0
  }
};
