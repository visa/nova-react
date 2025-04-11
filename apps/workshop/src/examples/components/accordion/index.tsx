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
import { Link } from 'react-router-dom';
import { Paths } from '../../../routes';
import { ExampleIndex } from '../../../types';

import { SectionMessage, SectionMessageContent, SectionMessageIcon, Typography, Link as VLink } from '@visa/nova-react';

const CustomExampleIntro = (
  <SectionMessage>
    <SectionMessageIcon />
    <SectionMessageContent>
      <Typography>
        We use <code>useAccordion()</code> to interact with custom accordion. This is a re-usable hook that will take in
        an index that is the default opened item, or an array if the user would like to allow multiple accordions to be
        opened at the same time. Checkout the useAccordion hook's{' '}
        <VLink element={<Link to={Paths.documentationPage('hooks', 'use-accordion')} />}>full documentation</VLink>.
      </Typography>
    </SectionMessageContent>
  </SectionMessage>
);

const DisclosureNote = (
  <SectionMessage>
    <SectionMessageIcon />
    <SectionMessageContent>
      <Typography>
        In the example below, we set the <code>defaultSelected</code> value to be an array, which tells our hook that we
        are allowing more than one accordion item to open at the same time. Checkout the useAccordion hook's{' '}
        <VLink element={<Link to={Paths.documentationPage('hooks', 'use-accordion')} />}>full documentation</VLink>.
      </Typography>
    </SectionMessageContent>
  </SectionMessage>
);

const KeyNavAccordionNote = (
  <SectionMessage>
    <SectionMessageIcon />
    <SectionMessageContent>
      <Typography>
        In the example below, we import <code>onKeyNavigation</code> from the hook, where we can optionally use arrow
        keys to navigate through the accordion. Checkout the useAccordion hook's{' '}
        <VLink element={<Link to={Paths.documentationPage('hooks', 'use-accordion')} />}>full documentation</VLink>.
      </Typography>
    </SectionMessageContent>
  </SectionMessage>
);
const Examples: ExampleIndex[] = [
  {
    id: 'individual-accordion-section',
    title: 'Individual accordions',
    type: 'section',
  },
  {
    id: 'collapsed-accordion',
  },
  {
    id: 'collapsed-disabled-accordion',
  },
  {
    id: 'with-icon-accordion',
  },
  {
    id: 'with-badge-accordion',
  },
  {
    id: 'subtle-accordion',
  },
  {
    id: 'disabled-subtle-accordion',
  },
  {
    id: 'subtle-accordion-with-icon',
  },
  {
    id: 'multi-select-accordion-section',
    title: 'Multi-select accordion groups',
    type: 'section',
  },
  {
    id: 'default-multi-select-accordion-group',
  },
  {
    id: 'multi-select-accordion-group-with-expanded',
  },
  {
    id: 'multi-select-accordion-group-with-disabled',
  },
  {
    id: 'subtle-multi-select-accordion-group',
  },
  {
    id: 'single-select-accordion-section',
    title: 'Single-select accordion groups',
    type: 'section',
  },
  { id: 'default-single-select-accordion-group' },
  { id: 'single-select-accordion-group-with-expanded' },
  { id: 'subtle-single-select-accordion-group' },
  {
    id: 'custom-accordions-section',
    title: 'Custom accordion groups',
    type: 'section',
  },
  {
    id: 'native-single-select-accordion-group',
  },
  {
    component: CustomExampleIntro,
    id: 'custom-accordion-intro-dev-not',
    type: 'content',
  },
  {
    id: 'default-with-item-open-accordion',
  },
  {
    component: DisclosureNote,
    id: 'custom-accordion-disclosure-dev-note',
    type: 'content',
  },
  {
    id: 'disclosure-group-accordion',
  },
  {
    component: KeyNavAccordionNote,
    id: 'key-nav-group-accordion-dev-note',
    type: 'content',
  },
  {
    id: 'key-nav-group-accordion',
  },
];

export default Examples;
