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
        Note: We set up a <code>stateReducer()</code> to prevent items from the list being automatic selected on mouse
        hovering.
      </Typography>
      <Typography>
        This is to match the behavior with{' '}
        <Link
          aria-label="ARIA combobox example documentation page (Opens in a new tab)"
          href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-none/"
          rel="noopener noreferrer"
          target="_blank"
        >
          ARIA combobox example on W3.org <VisaMaximizeTiny rtl />
        </Link>
        .
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
    id: 'chip-intro',
    type: 'content',
  },
  { id: 'default-combobox', title: 'Default Comboboxes', type: 'section' },
  { id: 'no-autocomplete-combobox' },
  { id: 'pre-selected-combobox' },
  { id: 'inline-message-combobox' },
  { id: 'clear-button-combobox' },
  { id: 'leading-icon-combobox' },
  { id: 'error-combobox' },
  { id: 'read-only-combobox' },
  { id: 'disabled-combobox' },
  { id: 'item-disabled-combobox' },
  { id: 'no-icon-combobox' },
  { id: 'Combobox behaviors', title: 'Combobox behaviors', type: 'section' },
  { id: 'autocomplete-with-manual-selection-combobox' },
  { id: 'autocomplete-with-automatic-selection-combobox' },
];

export default Examples;
