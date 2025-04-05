/**
 *              Copyright (c) 2025 Visa, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 **/
import cspellPlugin from '@cspell/eslint-plugin';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['**/build/*', '**/coverage/*', '**/dist/*', '**/__mocks__/*'] },
  { files: ['**/*.{ts,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: { '@cspell': cspellPlugin },
    rules: {
      '@cspell/spellchecker': [
        'warn',
        {
          cspell: {
            words: [
              'genai',
              'gitlog',
              'iframed',
              'luhn',
              'multiselects',
              'navigations',
              'paginations',
              'skrim',
              'vgar',
              'vpds',
              'xlarge',
              'xxlarge',
              'xsmall',
            ],
          },
        },
      ],
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
];
