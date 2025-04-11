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
import { ReactNode, createContext, useContext, useRef, useState } from 'react';
import { useDocContext } from '../hooks';
import { Paths } from '../routes/paths';

export const filterRegex = /^\d+\.\d+\.\d+$/;
export const filterNumberedVersions = (versions: string[]) => versions.filter(version => filterRegex.test(version));

export const sortVersions = (versions: string[]) =>
  versions
    .sort((a, b) => {
      const versionA = a.split('.').map(Number);
      const versionB = b.split('.').map(Number);

      for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
        const numA = versionA[i] || 0;
        const numB = versionB[i] || 0;

        if (numA < numB) {
          return -1;
        } else if (numA > numB) {
          return 1;
        }
      }

      return 0;
    })
    .reverse();

export const getMaxVersion = (versions: string[]) =>
  versions
    ?.map(v => v.split('.').map(vs => parseInt(vs, 10)))
    .sort((a, b) => (a[0] * 100 + a[1] * 10 + a[2] > b[0] * 100 + b[1] * 10 + b[2] ? 1 : -1))
    .pop()
    ?.join('.');

export const filterIrrelevantVersions = (versions: string[]) => {
  const majorVersions = Array.from(new Set(versions.map(version => parseInt(version.split('.')[0]))));
  const maxMajorVersion = Math.max(...majorVersions);

  const maxPreviousMajorVersion = majorVersions
    .filter(version => version !== maxMajorVersion)
    .map(majorVersion => {
      const minorVersions = versions.filter(version => version.startsWith(`${majorVersion}.`));
      return getMaxVersion(minorVersions);
    });

  const filteredVersions = versions.filter(version => version.startsWith(`${maxMajorVersion}.`));
  return [...filteredVersions, ...maxPreviousMajorVersion];
};

type VersionType = 'Beta' | 'Latest' | 'Legacy';

type VersionsContextType = {
  currentVersion: string;
  fetchVersions: () => void;
  isBeta: boolean;
  isDevelopmentBeta: boolean;
  isLatest: boolean;
  isLegacy: boolean;
  latestVersion?: string;
  loading: boolean;
  versions: (string | undefined)[];
  versionType: VersionType;
};

export const VersionsContext = createContext<VersionsContextType>({
  currentVersion: '1.0.0',
  fetchVersions: () => {},
  isBeta: false,
  isDevelopmentBeta: false,
  isLatest: false,
  isLegacy: false,
  loading: true,
  versions: [],
  versionType: 'Beta',
});

type VersionsProviderProperties = {
  children?: ReactNode;
};

export const VersionsProvider = ({ children }: VersionsProviderProperties) => {
  const { basename, devMode, version } = useDocContext();
  const runOnce = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [versions, setVersions] = useState<(string | undefined)[]>([]);

  const fetchVersions = async () => {
    if (runOnce.current === false) {
      runOnce.current = true;
      if (devMode) {
        setLoading(false);
        return setVersions([import.meta.env.VERSION, '1.0.0', '0.1.0']);
      }
      (async () => {
        try {
          if (!devMode) {
            const results = await fetch(Paths.versionsApi);
            const allVersions = await results.json();
            const filteredVersions = filterNumberedVersions(allVersions);
            const relevantVersions = filterIrrelevantVersions(filteredVersions);
            const versionsSorted = sortVersions(relevantVersions as string[]);
            setVersions(versionsSorted);
          }
        } catch (error) {
          console.warn('Versions not found', error);
        } finally {
          setLoading(false);
        }
      })();
    }
  };

  const isDevelopmentBeta = basename.includes('/version/development');
  const isBeta = isDevelopmentBeta || version.includes('beta');
  const isLatest = version === versions[0];
  const isLegacy = !isLatest && basename.includes('/version/');

  const latestVersion = versions[0];

  const versionType = (isBeta && 'Beta') || (isLegacy && 'Legacy') || 'Latest';

  return (
    <VersionsContext.Provider
      value={{
        currentVersion: version,
        fetchVersions,
        isBeta,
        isDevelopmentBeta,
        isLatest,
        isLegacy,
        latestVersion,
        loading,
        versions,
        versionType,
      }}
    >
      {children}
    </VersionsContext.Provider>
  );
};

export default VersionsProvider;
export const useVersions = () => useContext(VersionsContext);
