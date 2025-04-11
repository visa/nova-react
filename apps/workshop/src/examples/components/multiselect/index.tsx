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
import { VisaMaximizeTiny } from '@visa/nova-icons-react';
import { Link, SectionMessage, SectionMessageContent, SectionMessageIcon, Typography } from '@visa/nova-react';
import Utility from '@visa/nova-react/utility';
import packageJson from '../../../../package.json';
import PackageInstaller from '../../../components/package-installer';
import { ExampleIndex } from '../../../types/component';

const ExampleIntro = () => (
  <SectionMessage>
    <SectionMessageIcon />
    <SectionMessageContent>
      <Typography variant="subtitle-1">
        Note: We have modified the behavior and usage of the <code>useMultipleSelection</code> hook to fit our design
        guidelines.
      </Typography>
      <Typography>
        Please refer to this official documentation to see how to customize the behavior:{' '}
        <Link href="https://www.downshift-js.com/use-multiple-selection" target="_blank" rel="noopener noreferrer">
          Downshift - useMultipleSelection
          <VisaMaximizeTiny />
        </Link>
      </Typography>
    </SectionMessageContent>
  </SectionMessage>
);

export const Examples: ExampleIndex[] = [
  {
    component: (
      <Utility vFlexCol vGap={10}>
        <PackageInstaller
          description="This package is used to handle the logic of the combobox."
          packageName="downshift"
          packageLink="https://github.com/downshift-js/downshift/tree/master/src/hooks/useCombobox"
          packageOfficialName="Downshift"
          title="Install Downshift"
          version={packageJson.optionalDependencies.downshift}
        />
        <ExampleIntro />
      </Utility>
    ),
    id: 'multiselect-example-intro',
    type: 'content',
  },
  { id: 'default-multiselects-headline', title: 'Default multiselects', type: 'section' },
  {
    id: 'default-multiselect',
  },
  {
    id: 'multiselect-with-inline-message',
  },
  {
    id: 'multiselect-with-error',
  },
  {
    id: 'multiselect-with-disabled-option',
  },
  {
    id: 'disabled-multiselect',
  },
  {
    id: 'read-only-multiselect',
  },
  {
    id: 'multiselect-without-dropdown-chevron',
  },
  {
    id: 'multiselect-with-multiple-selections-and-vertical-scroll',
  },
  {
    id: 'multiselect-with-select-and-unselect-all-buttons',
  },
  {
    id: 'multiselect-with-scrollbar',
  },
  { id: 'multiselect-behaviors-headline', title: 'Multiselect Behaviors', type: 'section' },
  {
    id: 'multiselect-with-filterable-menu-and-manual-selection',
  },
  {
    id: 'multiselect-with-filterable-menu-and-automatic-selection',
  },
];

export default Examples;
