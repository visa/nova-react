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
/** @type {import('jest').Config} */
const config = {
  coverageReporters: [
    'clover',
    'cobertura',
    'json-summary',
    'lcov',
    [
      'text',
      {
        file: 'coverage.txt',
      },
    ],
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },

  projects: ['<rootDir>/apps/workshop/jest.config.mjs', '<rootDir>/libs/nova-react/jest.config.mjs'],
  reporters: ['default', './bin/jest-json-reporter.mjs'],
};

export default config;
