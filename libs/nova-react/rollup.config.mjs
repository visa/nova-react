/**
 *              © 2025 Visa
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
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import glob from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

const config = [
  {
    external: [
      ...Object.keys({ ...pkg.peerDependencies, ...pkg.dependencies, ...pkg?.optionalDependencies }),
      'react/jsx-runtime',
      /\.css$|\.jpg$|\.png$|\.svg$/,
      /@visa\/nova-icons-react\/.*/,
    ],
    input: Object.fromEntries(
      glob
        .sync('src/**/*.{ts,tsx}', {
          ignore: ['/**/*.test.*', 'src/test-setup.ts'],
        })
        .map(file => [
          // This remove `src/` as well as the file extension from each
          // file, so e.g. src/nested/foo.js becomes nested/foo
          path.relative('src/', file.slice(0, file.length - path.extname(file).length)),
          // This expands the relative paths to absolute paths, so e.g.
          // src/nested/foo becomes /project/src/nested/foo.js
          fileURLToPath(new URL(file, import.meta.url)),
        ])
    ),

    output: [
      {
        dir: './dist',
        exports: 'named',
        format: 'cjs',
        // https://rollupjs.org/faqs/#why-do-additional-imports-turn-up-in-my-entry-chunks-when-code-splitting
        hoistTransitiveImports: false,
      },
      {
        dir: './dist',
        entryFileNames: '[name].mjs',
        exports: 'named',
        format: 'es',
        // https://rollupjs.org/faqs/#why-do-additional-imports-turn-up-in-my-entry-chunks-when-code-splitting
        hoistTransitiveImports: false,
      },
    ],
    plugins: [
      nodeResolve({ moduleDirectories: ['node_modules'] }),
      commonjs(),
      terser(),
      typescript({
        tsconfig: './tsconfig.build.json',
      }),
      copy({
        targets: [
          { dest: 'dist/README.md', src: '../../README.md' },
          { dest: 'dist/', src: '.npmignore' },
          { dest: 'dist/', src: 'src/**/meta.json' },
          { dest: 'dist/', src: 'src/use-**/index.ts' },
          { dest: 'dist/', src: 'src/**/index.tsx' },
        ],
        flatten: false,
      }),
    ],
  },
];

export default config;
