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
import { ExampleIndex } from '../../../types';

const ValidationGroupNote = () => (
  <SectionMessage>
    <SectionMessageIcon />
    <SectionMessageContent>
      <Typography>
        <Link href="https://www.w3.org/TR/WCAG20-TECHS/H90.html#H90-ex4" rel="noopener noreferrer" target="_blank">
          Indicating required state on checkbox groups
          <VisaMaximizeTiny rtl />
        </Link>
        &nbsp;is different than what is needed for individual checkboxes.
      </Typography>
    </SectionMessageContent>
  </SectionMessage>
);

const Examples: ExampleIndex[] = [
  {
    id: 'Default checkbox headline',
    title: 'Default checkboxes',
    type: 'section',
  },
  {
    id: 'default-checkbox',
  },
  {
    id: 'standalone-checkbox',
  },
  {
    id: 'inline-message-checkbox',
  },
  { id: 'checked-checkbox' },
  {
    id: 'validation-checkbox',
  },
  {
    id: 'disabled-unchecked-checkbox',
  },
  {
    id: 'disabled-checked-checkbox',
  },
  {
    id: 'Checkbox groups headline',
    title: 'Checkbox groups',
    type: 'section',
  },
  {
    id: 'group-checkbox',
  },
  { component: <ValidationGroupNote />, id: 'Checkbox group Note', type: 'content' },
  {
    id: 'group-with-validation-checkbox',
  },
  {
    id: 'indeterminate-group-checkbox',
  },
  {
    id: 'error-indeterminate-group-checkbox',
  },
  {
    id: 'group-horizontal-checkbox',
  },

  {
    id: 'Checkbox panels headline',
    title: 'Checkbox panels',
    type: 'section',
  },
  {
    id: 'with-description-panel-checkbox',
  },
  {
    id: 'without-description-panel-checkbox',
  },
  {
    id: 'disabled-panel-checkbox',
  },

  {
    id: 'Checkbox panels group',
    title: 'Checkbox panels group',
    type: 'section',
  },
  {
    id: 'group-panel-checkbox',
  },
  {
    id: 'error-group-panel-checkbox',
  },
];

export default Examples;
