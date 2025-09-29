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
import { defaultPreferencesProp } from '../providers/theme-provider';
import { DocType } from '../types';

const VPDS = 'https://design.visa.com';

export const Paths = {
  base: import.meta.env.BASE_URL,
  beta: VPDS + '/react/version/development',
  changeLog: '/changelog',
  sitemap: '/sitemap',
  components: '/components',
  commitLinkExample: 'unavailable for public use',
  commitLinkLib: 'unavailable for public use',
  documentationApi: (docType: DocType | ':docType' = ':docType', docName = ':docName') => `/${docType}/${docName}/api`,
  documentationExample: (docType: DocType | ':docType' = ':docType', docName = ':docName', example = ':exampleName') =>
    `/${docType}/${docName}#${example}`,
  documentationPage: (docType: DocType | ':docType' = ':docType', docName = ':docName') => `/${docType}/${docName}`,
  resources: '/resources',
  rawExample: (docType: DocType | ':docType' = ':docType', docName = ':docName', exampleName = ':exampleName') =>
    `/raw/${docType}/${docName}/${exampleName}`,
  rawExampleCode: (docType: DocType | ':docType' = ':docType', docName = ':docName', exampleName = ':exampleName') =>
    `/raw/${docType}/${docName}/${exampleName}/code`,
  root: '/',
  themesDocs: `${VPDS}/styles/themes/${defaultPreferencesProp.themeKey}`,
  vault: 'https://bookmarks.visa.com/vpds-vault-react',
  ticketLink: ` https://bookmarks.visa.com/vpds-react-create-ticket`,
  versioned: VPDS + '/react/version',
  versionsApi: VPDS + '/versions/react',
  vpds: VPDS,
  vpdsReact: VPDS + '/react',
  unknown: '/*',
};

export default Paths;
