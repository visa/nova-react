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
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const filePath = resolve(`./apps/workshop/src/examples/meta.json`);

/**
 * Class for custom Jest JSON Reporter.
 */
class JestJSONReporter {
  /**
   *
   * @param {object} testContexts
   * @param {object} results
   */
  onRunComplete(testContexts, results) {
    const prevTestResults = existsSync(filePath) ? JSON.parse(readFileSync(filePath, 'utf-8')) : {};

    writeFileSync(
      filePath,
      JSON.stringify(
        {
          ...prevTestResults,
          testsPassed: results.numPassedTests,
          testSnapshots: results.snapshot.total,
          testSuites: results.numTotalTestSuites,
          totalTests: results.numTotalTests,
        },
        null,
        2
      )
    );
  }
}

export default JestJSONReporter;
