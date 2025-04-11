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

const ExampleIntro = () => (
  <SectionMessage>
    <SectionMessageIcon />
    <SectionMessageContent>
      <Typography variant="subtitle-1">
        We are using a custom-made <code>useTabs()</code> hook!
      </Typography>
      <Typography>
        We use <code>useTabs()</code> to interact with Tabs. This hook allows for full keyboard accessibility of tabs.
        It also allows you automatically activate tabs using keyboard controls. Checkout the useTabs hook's{' '}
        <VLink element={<Link to={Paths.documentationPage('hooks', 'use-tabs')} />}>full documentation</VLink>.
      </Typography>
    </SectionMessageContent>
  </SectionMessage>
);

const Examples: ExampleIndex[] = [
  { component: <ExampleIntro />, id: 'tab-intro', type: 'content' },
  { id: 'Vertical tabs headline', title: 'Vertical tabs', type: 'section' },
  {
    id: 'default-vertical-tabs',
  },
  {
    id: 'icon-vertical-tabs',
  },
  {
    id: 'disabled-vertical-tabs',
  },
  {
    id: 'vertical-tab-with-menu',
  },
  { id: 'Horizontal tabs headline', title: 'Horizontal tabs', type: 'section' },
  {
    id: 'default-horizontal-tabs',
  },
  {
    id: 'icon-horizontal-tabs',
  },
  {
    id: 'disabled-horizontal-tabs',
  },
  {
    id: 'horizontal-tab-with-menu',
  },
  { id: 'Stacked tabs headline', title: 'Stacked Tabs', type: 'section' },
  {
    id: 'default-stacked-tabs',
  },
  {
    id: 'disabled-stacked-tabs',
  },
  {
    id: 'stacked-tabs-with-notifications',
  },
  { id: 'Custom tabs headline', title: 'Custom tabs', type: 'section' },
  {
    id: 'alternate-horizontal-tabs',
  },
  {
    id: 'alternate-vertical-tabs',
  },
  {
    id: 'alternate-stacked-tabs',
  },
  {
    id: 'auto-horizontal-tabs',
  },
];

export default Examples;
