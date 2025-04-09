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
/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: ['src/examples/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/use-multi-select-listbox/index.ts',
    '<rootDir>/src/index.ts',
  ],
  displayName: 'React-library',
  moduleFileExtensions: ['tsx', 'ts', 'json', 'jsx', 'js', 'web.tsx', 'web.ts', 'web.jsx', 'web.js', 'node'],
  modulePaths: [],
  modulePathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/package.json'],
  preset: 'ts-jest/presets/js-with-ts',
  roots: ['<rootDir>/src'],
  resetMocks: true,
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  transform: {
    '^.+/src/.+\\.(ts|tsx)$': [
      'ts-jest',
      {
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
