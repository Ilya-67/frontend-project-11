// import globals from 'globals';
const globals = require('globals');
// import path from 'path';
//const path = require('path');
// import { fileURLToPath } from 'url';
//const { fileURLToPath } = require('node:url');
// import { FlatCompat } from '@eslint/eslintrc';
const { FlatCompat } = require('@eslint/eslintrc');
// import pluginJs from '@eslint/js';
const js = require('@eslint/js');

//const filename = fileURLToPath('');
//const dirname = path.dirname(filename);
const compat = new FlatCompat({
  baseDirectory: __dirname, recommendedConfig: js.configs.recommended,
});

module.exports = () => { [
  { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
  { languageOptions: { globals: globals.node } },
  ...compat.extends('airbnb'),
] };
