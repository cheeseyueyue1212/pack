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
  }
};
