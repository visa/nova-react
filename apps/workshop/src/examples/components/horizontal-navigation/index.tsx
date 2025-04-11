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
import packageJson from '../../../../package.json';
import PackageInstaller from '../../../components/package-installer';
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

const FloatingUINote = () => (
  <PackageInstaller
    description="This package is used to display the dropdown menus."
    packageLink="https://floating-ui.com/docs/react"
    packageOfficialName="Floating UI"
    packageName="@floating-ui/react"
    title="Install Floating UI"
    version={packageJson.optionalDependencies['@floating-ui/react']}
  />
);

const Examples: ExampleIndex[] = [
  { component: <ExampleIntro />, id: 'nav-intro', type: 'content' },
  { component: <FloatingUINote />, id: 'Floating UI Note', type: 'content' },
  { id: 'default-horizontal-navigations', title: 'Default horizontal navigations', type: 'section' },
  {
    id: 'default-horizontal-nav',
  },
  {
    id: 'active-element-horizontal-nav',
  },
  {
    id: 'horizontal-with-icons',
  },
  { id: 'alternate-horizontal-nav' },
  {
    id: 'alternate-active-element-horizontal-nav',
  },
  {
    id: 'alternate-horizontal-with-icons',
  },
  { id: 'stacked-horizontal-nav' },
  {
    id: 'horizontal-navigations-with-persistent-search',
    title: 'Horizontal navigations with persistent search',
    type: 'section',
  },
  {
    id: 'search-persistent-horizontal-nav',
  },
  { id: 'stacked-search-persistent-horizontal-nav' },
];

export default Examples;
