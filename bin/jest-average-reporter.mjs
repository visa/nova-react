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
import { kebabCase } from 'change-case';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, parse, resolve } from 'path';

/// Constants
const metaFileName = 'meta.json';
const percentageKey = 'pct';
const reporterPath = resolve(`./coverage/coverage-summary.json`);
const testKeys = ['lines', 'branches', 'functions', 'statements'];
const testKeysLength = testKeys.length;

const globalMetaPath = resolve(`./apps/workshop/src/examples/${metaFileName}`);

/**
 * Distribute out the test average to the appropriate meta.json files
 * @returns {void}
 */
const calculateAverageCoverage = () => {
  try {
    const summary = JSON.parse(readFileSync(reporterPath, 'utf-8'));
    const summaryKeys = Object.keys(summary);
    summaryKeys.forEach(filePath => {
      const isLib = !filePath.includes('/workshop/src/examples/');
      const parsedPath = parse(filePath);
      const metaFilePath = join(parsedPath.dir, metaFileName);
      let metaData = existsSync(metaFilePath) ? JSON.parse(readFileSync(metaFilePath, 'utf-8')) : {};

      const test = summary[filePath];
      const average = Math.round(
        testKeys.map(testKey => test[testKey][percentageKey]).reduce((prev, current) => prev + current, 0) /
          testKeysLength
      );

      /// Overwrite old testAvg data
      if (filePath === 'total') {
        const globalMetaData = JSON.parse(readFileSync(globalMetaPath, 'utf-8'));
        return writeFileSync(globalMetaPath, JSON.stringify({ ...globalMetaData, testAvg: average }, null, 2));
      } else if (isLib) {
        metaData = { ...metaData, testAvg: average };
      } else {
        const exampleId = kebabCase(parsedPath.name);
        const prevExampleData = metaData[exampleId] || {};
        metaData[exampleId] = { ...prevExampleData, testAvg: average };
      }

      writeFileSync(metaFilePath, JSON.stringify(metaData, null, 2));
    });
  } catch (e) {
    console.error(e);
  }
};

/**
 * Main function
 * Calculates average then appends them to /{test-file-path}/meta.json
 */
const main = () => {
  calculateAverageCoverage();
};

main();
