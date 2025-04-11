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
import { filterIrrelevantVersions, filterNumberedVersions, sortVersions } from './versions-provider';

const unfilteredVersion = [
  '2.0.0',
  '2.0.1',
  '1.2.11',
  '1.2.1',
  '1.1.1',
  '1.1.0',
  '1.0.0',
  '0.1.0',
  '0.0.1',
  '0.0.0',
  '1.0.12',
  'PR-142',
  'PR-143',
  'PR-169',
  'PR-170',
  'PR-171',
  'PR-172',
  'VDS-5271',
  'VDS-5348',
  'VDS-5516',
  'VDS-5989',
  'VDS-5993',
  'VDS-5995',
  'build-process',
  'design-reviews',
  'development',
  'rtl-mode',
  'vault',
];

const unfilteredNumberedVersions = [
  '2.0.0',
  '2.0.1',
  '1.2.11',
  '1.2.1',
  '1.1.1',
  '1.1.0',
  '1.0.0',
  '0.1.0',
  '0.0.1',
  '0.0.0',
  '1.0.12',
];
const unsortedNumberedVersions = [
  '2.0.0',
  '2.0.1',
  '1.0.0',
  '1.2.1',
  '1.1.0',
  '0.1.0',
  '1.1.1',
  '1.2.11',
  '0.0.1',
  '1.0.12',
  '0.0.0',
];

describe('VersionsProvider', () => {
  describe('versions filters', () => {
    it('should filter non numbered versions', () => {
      const results = filterNumberedVersions(unfilteredVersion);
      expect(results).toEqual([
        '2.0.0',
        '2.0.1',
        '1.2.11',
        '1.2.1',
        '1.1.1',
        '1.1.0',
        '1.0.0',
        '0.1.0',
        '0.0.1',
        '0.0.0',
        '1.0.12',
      ]);
    });
    it('should sort versions', () => {
      const results = sortVersions(unsortedNumberedVersions);
      expect(results).toEqual([
        '2.0.1',
        '2.0.0',
        '1.2.11',
        '1.2.1',
        '1.1.1',
        '1.1.0',
        '1.0.12',
        '1.0.0',
        '0.1.0',
        '0.0.1',
        '0.0.0',
      ]);
    });
    it('should filter irrelevant versions', () => {
      const results = filterIrrelevantVersions(unfilteredNumberedVersions);
      expect(results).toEqual(['2.0.0', '2.0.1', '1.2.11', '0.1.0']);
    });
    it('should sort/filter all versions', () => {
      const results = sortVersions(filterIrrelevantVersions(filterNumberedVersions(unfilteredVersion)) as string[]);
      expect(results).toEqual(['2.0.1', '2.0.0', '1.2.11', '0.1.0']);
    });
  });
});
