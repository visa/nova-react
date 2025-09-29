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
import gitlog from 'gitlog';
import { globSync } from 'glob';
import { resolve } from 'path';
import { parse } from 'react-docgen-typescript';
import createExports from './component-exports.mjs';

/// Constants:
const baseRepoPath = 'https://github.com/visa/nova-react/blob/main/libs/nova-react/src';
const defaultGitLogOptions = {
  repo: resolve('../../'),
  number: 1,
  fields: ['authorDate', 'committerDate', 'hash', 'subject'],
};
const metaDataFilename = 'meta.json';
const filenameRegex = new RegExp('/[^/]*$');
const options = {
  propFilter: prop => {
    const filterOut =
      prop.parent?.fileName.includes('node_modules') ||
      prop.description.includes('@ignore') ||
      prop.description.includes('@deprecated');
    return !filterOut;
  },
  shouldExtractLiteralValuesFromEnum: true,
  shouldExtractValuesFromUnion: false,
};

const utilityRangeType =
  '0 | 48 | 4 | 10 | 1 | 3 | 2 | 5 | 6 | 7 | 8 | 9 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47';
const cleanedUtilityRangeType = '0 - 48';

/// Helpers
const formatGitLink = filePath => baseRepoPath + filePath;
const sortObjectsFromKey = (array, key) =>
  array.sort((a, b) => {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });

const getModificationDates = examplePath => {
  const gitLogged =
    gitlog({
      ...defaultGitLogOptions,
      file: examplePath,
    })[0] || {};

  return {
    changeReason: gitLogged.subject,
    commit: gitLogged.hash,
    dateCreated: gitLogged.authorDate,
    dateModified: gitLogged.committerDate,
  };
};

const generateDocs = () => {
  // Holds paths to all components/COMPONENT/example/index.json
  const allComponentIndexFiles = globSync(`${resolve('src')}/*/index.{ts,tsx}`, {
    ignore: ['**/types/index.ts'],
  }).reverse();

  // Parse files for types and meta data
  const parser = parse(allComponentIndexFiles, options);

  // Clean the data into and add package.json meta data
  parser.forEach(({ description, displayName, filePath, props, tags }) => {
    const relativeFilePath = filePath.replace(resolve('src'), '');
    const packageJsonFilePath = resolve(filePath.replace(filenameRegex, `/${metaDataFilename}`));

    const prevMetaData = existsSync(packageJsonFilePath)
      ? JSON.parse(readFileSync(packageJsonFilePath, 'utf-8')) || {}
      : {};
    const metaData = {
      ...prevMetaData,
      description,
      displayName,
      filePath: relativeFilePath,
      gitLink: formatGitLink(relativeFilePath),
      props: sortObjectsFromKey(
        Object.values(props).map(({ defaultValue, description, name, required, type }) => {
          return {
            defaultValue: defaultValue?.value,
            description,
            name,
            required,
            type:
              type?.value
                ?.map(({ value }) => value)
                .join(' | ')
                .replaceAll(utilityRangeType, cleanedUtilityRangeType) || type.name,
          };
        }),
        'name'
      ),
      ...getModificationDates(filePath),
      ...tags,
      related: tags?.related?.replaceAll(' ', '').split(','),
    };
    writeFileSync(packageJsonFilePath, JSON.stringify(metaData, null, 2));
  });
};

generateDocs();

createExports();
