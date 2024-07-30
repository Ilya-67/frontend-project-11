//import globals from 'globals';
const globals = require('globals');
//import path from 'path';
const path = require('path');
//import { fileURLToPath } from 'url';
const { fileURLToPath } = require('url');
//import { FlatCompat } from '@eslint/eslintrc';
const { FlatCompat } = require('@eslint/eslintrc');
//import pluginJs from '@eslint/js';
const pluginJs = require('@eslint/js');

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
  baseDirectory: dirname, recommendedConfig: pluginJs.configs.recommended,
});

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
  { languageOptions: { globals: globals.node } },
  ...compat.extends('airbnb'),
];

