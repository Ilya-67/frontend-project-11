import globals from 'globals.esm.mjs';

import path from 'path.esm.mjs';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc.esm.mjs';
import pluginJs from '@eslint/js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
  baseDirectory: dirname, recommendedConfig: pluginJs.configs.recommended,
});

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
  { languageOptions: { globals: Promise: "off" } },
  ...compat.extends('airbnb'),
];
/*globals.node*/

