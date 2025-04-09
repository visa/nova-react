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
import { paramCase } from 'change-case';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { join, parse, resolve } from 'path';

/// Helpers
const objectFromJsonPath = filePath => (existsSync(filePath) ? JSON.parse(readFileSync(filePath, 'utf-8')) : {});

/// Constants
const rootPath = resolve('./');
const pathToDocs = join(rootPath, '/apps/workshop');
const pathToDocsPublic = join(pathToDocs, '/public');
const pathToDocsSrc = join(pathToDocs, '/src');
const pathToLib = join(rootPath, '/libs/nova-react');
const pathToLibDist = join(pathToLib, '/dist');
const pathToLibSrc = join(pathToLib, '/src');

const pathToExamples = join(pathToDocsSrc, '/examples');

const docsUrl = 'https://design.visa.com/react';
const metaDataFilename = 'meta.json';
const packageFilename = 'package.json';

const outputPath = join(pathToDocsPublic, metaDataFilename);

const libPaths = globSync('**/index.{ts,tsx}', {
  cwd: pathToLibSrc,
  ignore: ['**/*.test.{ts,tsx}', '**/types/**', 'index.ts'],
});

const defaultData = {
  ...objectFromJsonPath(join(pathToLibDist, packageFilename)),
  changelog: readFileSync(join(rootPath, 'CHANGELOG.md'), 'utf-8'),
  date: new Date().toISOString(),
  docsUrl,
  manifest: objectFromJsonPath(join(pathToExamples, metaDataFilename)),
  readme: readFileSync(join(rootPath, 'README.md'), 'utf-8'),
};

/// Stages
const getExamples = componentName => {
  if (componentName.toLowerCase() === 'utility' || componentName.toLowerCase() === 'utility-fragment') {
    let examples = {};
    defaultData.manifest.utilities.forEach(utility => {
      const subExamples = objectFromJsonPath(join(pathToExamples, 'utilities', utility, metaDataFilename));
      const subExamplesKeys = Object.keys(subExamples);
      subExamplesKeys.forEach(subExamplesKey => {
        const exampleMetaData = subExamples[subExamplesKey];
        if (!exampleMetaData?.file) return;
        const exampleFileData = readFileSync(join(pathToExamples, 'utilities', utility, exampleMetaData.file), 'utf-8');
        subExamples[subExamplesKey]['source'] = exampleFileData;
      });
      examples = { ...examples, ...subExamples };
    });

    return examples;
  }

  const category = componentName.toLowerCase().startsWith('use') ? 'hooks' : 'components';
  const examplesMetaPath = join(pathToExamples, category, componentName, metaDataFilename);
  if (!existsSync(examplesMetaPath)) return {};
  const examples = objectFromJsonPath(examplesMetaPath);
  // add example file string to meta data
  const exampleKeys = Object.keys(examples);

  exampleKeys.forEach(exampleKey => {
    const exampleMetaData = examples[exampleKey];
    if (!exampleMetaData?.file) return;
    const exampleFileData = readFileSync(join(pathToExamples, category, componentName, exampleMetaData.file), 'utf-8');
    examples[exampleKey]['source'] = exampleFileData;
  });
  return examples;
};

const getLibData = () => {
  const metaData = {};
  libPaths.forEach(filePath => {
    const parsedFile = parse(filePath);
    const componentDirPath = join(pathToLibSrc, parsedFile.dir);
    const componentMetaData = objectFromJsonPath(join(componentDirPath, metaDataFilename));
    const componentId = paramCase(componentMetaData.displayName);
    const examples = getExamples(componentId);
    metaData[componentId] = {
      ...componentMetaData,
      examples,
      source: readFileSync(join(pathToLibSrc, filePath), 'utf-8'),
    };
  });
  return metaData;
};

const main = () => {
  const lib = getLibData();

  writeFileSync(
    outputPath,
    JSON.stringify(
      {
        ...defaultData,
        lib,
      },
      null
    )
  );
};

main();
