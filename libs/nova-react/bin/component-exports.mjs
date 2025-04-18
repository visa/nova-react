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
import { pascalCase } from 'change-case';
import { writeFileSync } from 'fs';
import { globSync } from 'glob';
import { resolve } from 'path';

// Export templates for createExports
const createExportStatement = name =>
  `export * from './${name}';\nexport { default as ${pascalCase(name)} } from './${name}';`;

const createExportTemplate = exports => `/* This file is autogenerated */
${exports.join('\n')}
`;

// Generate component index file with exports
const createExports = (components = resolve('src/')) => {
  const componentDirectories = globSync('**/index.{ts,tsx}', {
    cwd: components,
    ignore: ['**/*.test.{ts,tsx}', '**/types/**', 'index.ts'],
  })
    .map(fullPath => fullPath.split('/')[0])
    .reverse();

  // Create exports template from all components
  const exportStatements = componentDirectories.map(createExportStatement);
  const exportTemplate = createExportTemplate(exportStatements);

  // Write all exports to main components file
  // src/components/index.ts
  // export { default as Accordion } from './accordion';
  // export { default as Button } from './button';
  writeFileSync(resolve(`src/index.ts`), exportTemplate);
};

export default createExports;
