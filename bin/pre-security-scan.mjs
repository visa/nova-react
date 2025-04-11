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
/**
 * This is a pre-security-scan script that will run after the security scan is complete.
 * It should be removed if jest is on version 30 or higher. This is a short term fix for jest using glob v7 (https://github.com/jestjs/jest/releases | https://github.com/jestjs/jest/pull/14509).
 * This isn't a security risk because glob is a devDependency and is only used in the scripts/test environment.
 */

import fs from 'fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = resolve(__dirname, '../package.json');

const overrides = {
  overrides: {
    glob: '^10',
  },
};

function main() {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  packageJson.pnpm = overrides;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

main();
