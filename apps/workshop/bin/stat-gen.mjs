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
 
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import gitlog from 'gitlog';
import { globSync } from 'glob';
import { join, parse, resolve } from 'path';
import { paramCase } from 'change-case';

/// Constants:
const metaDataFilename = 'meta.json';
const examplesPath = resolve('src/examples');
const modulePath = resolve('node_modules/@visa/nova-react');
const statsPath = join(examplesPath, metaDataFilename);
// Example paths from examples directory
const examples = globSync(`${examplesPath}/**/*.tsx`, {
  ignore: ['**/index.tsx', '**/index.test.tsx', 'index.tsx'],
}).reverse();
const defaultGitLogOptions = {
  repo: resolve('../../'),
  number: 1,
  fields: ['authorDate', 'committerDate', 'hash', 'subject'],
};

const getDirectories = source => {
  const dirFiles = readdirSync(source, { withFileTypes: true });
  return dirFiles.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
};

const getExampleNames = () => {
  const exampleDirectories = getDirectories(examplesPath);
  const examples = {};
  exampleDirectories.map(exampleType => (examples[exampleType] = getDirectories(join(examplesPath, exampleType))));
  return examples;
};

const updateExamplesMetaData = () => {
  examples.forEach(examplePath => {
    const parsedExampleFilePath = parse(examplePath);
    const metaDataFilePath = join(parsedExampleFilePath.dir, metaDataFilename);
    const metaData = existsSync(metaDataFilePath) ? JSON.parse(readFileSync(metaDataFilePath, 'utf-8')) : {};

    const exampleId = paramCase(parsedExampleFilePath.name);

    const prevExampleMetaData = metaData[exampleId] || {};

    const gitLogged =
      gitlog({
        ...defaultGitLogOptions,
        file: examplePath,
      })[0] || {};

    metaData[exampleId] = {
      ...prevExampleMetaData,
      changeReason: gitLogged.subject,
      commit: gitLogged.hash,
      dateCreated: gitLogged.authorDate,
      dateModified: gitLogged.committerDate,
      file: parsedExampleFilePath.base,
      id: exampleId,
    };

    writeFileSync(metaDataFilePath, JSON.stringify(metaData, null, 2));
  });
};

/**
 * Generates generic stats on the lib
 * @returns {object} - stats { components: number, hooks: number, examples: number }
 */
const getStats = () => {
  // Count components from package
  const components = globSync(`${modulePath}/*/index.js`, {
    ignore: ['**/use-*/index.js', '**/types/index.js'],
  }).length;
  // Count hooks from package
  const hooks = globSync(`${modulePath}/use-*/index.js`).length;

  return {
    components,
    examples: examples.length,
    hooks,
  };
};

const main = () => {
  updateExamplesMetaData();
  const prevStats = existsSync(statsPath) ? JSON.parse(readFileSync(statsPath, 'utf-8')) : {};
  const stats = getStats();
  const exampleNames = getExampleNames();
  writeFileSync(statsPath, JSON.stringify({ ...prevStats, ...exampleNames, stats }, null, 2));
};

main();
