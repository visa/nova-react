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
import { SectionMessage, SectionMessageContent, SectionMessageIcon, Typography, Link as VLink } from '@visa/nova-react';
import { Link } from 'react-router-dom';
import { Paths } from '../../../routes';
import { ExampleIndex } from '../../../types';

const ListboxHookNote = () => (
  <SectionMessage>
    <SectionMessageIcon />
    <SectionMessageContent>
      <Typography variant="subtitle-1">
        We are using a custom-made <code>useListbox()</code> hook
      </Typography>
      <Typography>
        We use <code>useListbox()</code> to interact with listbox that has a <code>role=&quot;listbox&quot;</code>. This
        is a re-usable hook that takes in an index of the default selected list item(s). The hook can also automatically
        activate the tabs using keyboard controls. Checkout the useListbox hook's{' '}
        <VLink element={<Link to={Paths.documentationPage('hooks', 'use-listbox')} />}>full documentation</VLink>.
      </Typography>
    </SectionMessageContent>
  </SectionMessage>
);

const Examples: ExampleIndex[] = [
  {
    id: 'single-select-listbox-section',
    title: 'Single-select listboxes',
    type: 'section',
  },
  {
    id: 'default-single-listbox',
  },
  {
    id: 'inline-single-listbox',
  },
  {
    id: 'selected-single-listbox',
  },
  {
    id: 'resize-single-listbox',
  },
  {
    id: 'error-single-listbox',
  },
  {
    id: 'disabled-single-listbox',
  },
  {
    id: 'item-disabled-single-listbox',
  },
  {
    id: 'multi-select-listbox-section',
    title: 'Multi-select listboxes',
    type: 'section',
  },
  {
    id: 'default-multi-listbox',
  },
  {
    id: 'inline-multi-listbox',
  },
  {
    id: 'selected-multi-listbox',
  },
  {
    id: 'resize-multi-listbox',
  },
  {
    id: 'error-multi-listbox',
  },
  {
    id: 'disabled-multi-listbox',
  },
  {
    id: 'item-disabled-multi-listbox',
  },
  {
    id: 'custom-listbox-section',
    title: 'Custom listboxes',
    type: 'section',
  },
  { component: <ListboxHookNote />, id: 'useListbox hook note', type: 'content' },
  {
    id: 'option-single-listbox',
  },
  {
    id: 'option-multi-listbox',
  },
];

export default Examples;
