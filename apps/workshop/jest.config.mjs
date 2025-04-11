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
  collectCoverageFrom: ['src/examples/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'workshop/src/components',
    'workshop/src/hooks',
    'workshop/src/providers',
    'workshop/src/routes',
    'workshop/src/utils',
  ],
  displayName: 'React-workshop',
  moduleFileExtensions: ['tsx', 'ts', 'json', 'jsx', 'js', 'web.tsx', 'web.ts', 'web.jsx', 'web.js', 'node'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif)$': '<rootDir>/__mocks__/file.cjs',
    '\\.svg$': '<rootDir>/__mocks__/component.cjs',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styles.cjs',
  },
  modulePaths: [],
  modulePathIgnorePatterns: ['/node_modules/'],
  preset: 'ts-jest/presets/js-with-ts',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.{spec,test}.{ts,tsx,jsx,js}', '<rootDir>/src/**/__tests__/**/*.{tsx,ts,jsx,js}'],
  transform: {
    '^.+/src/.+\\.(tsx|ts)$': [
      'ts-jest',
      {
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: {
                  env: {
                    BASE_URL: 'https://www.url.com',
                  },
                },
              },
            },
          ],
        },
        diagnostics: {
          ignoreCodes: [1343],
        },
        tsconfig: '<rootDir>/tsconfig.json',
      },
    ],
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
    '^.+/dist/.+',
  ],
  watchPathIgnorePatterns: ['test-results.json'],
};

export default config;
