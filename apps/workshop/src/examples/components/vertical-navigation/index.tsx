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
import { SectionMessage, SectionMessageContent, SectionMessageIcon, Typography } from '@visa/nova-react';
import { ExampleIndex } from '../../../types';

const ExampleIntro = () => (
  <SectionMessage messageType="success" className="v-flex v-align-items-center">
    <SectionMessageIcon />
    <SectionMessageContent>
      <Typography variant="subtitle-2">
        Tip: use <code>aria-current=&quot;page&quot;</code> or <code>aria-selected=&quot;true&quot;</code> to set the
        active tab.
      </Typography>
    </SectionMessageContent>
  </SectionMessage>
);

const Examples: ExampleIndex[] = [
  { component: <ExampleIntro />, id: 'nav-intro', type: 'content' },
  { id: 'default-vertical-navigations', title: 'Default vertical navigations', type: 'section' },
  {
    id: 'default-vertical-navigation',
  },
  {
    id: 'vertical-navigation-with-active-element',
  },
  {
    id: 'vertical-navigation-with-icons',
  },
  {
    id: 'vertical-navigation-with-nested-elements',
  },
  {
    id: 'vertical-navigation-with-section-titles',
  },
  {
    id: 'vertical-navigation-with-nested-elements-and-section-titles',
  },
  {
    id: 'alternate-vertical-navigation',
  },
  {
    id: 'alternate-vertical-navigation-with-active-element',
  },
  {
    id: 'alternate-vertical-navigation-with-icons',
  },
  { id: 'custom-vertical-navigations', title: 'Custom vertical navigation', type: 'section' },
  {
    id: 'vertical-navigation-without-logo-or-application-name',
  },
];

export default Examples;
