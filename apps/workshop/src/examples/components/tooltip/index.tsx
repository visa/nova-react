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
import packageJson from '../../../../package.json';
import PackageInstaller from '../../../components/package-installer';
import { ExampleIndex } from '../../../types';

const Examples: ExampleIndex[] = [
  {
    id: 'tooltip-intro',
    component: (
      <PackageInstaller
        description="This package is used to display the tooltip."
        packageLink="https://floating-ui.com/docs/react"
        packageOfficialName="Floating UI"
        packageName="@floating-ui/react"
        title="Install Floating UI"
        version={packageJson.optionalDependencies['@floating-ui/react']}
      />
    ),
    type: 'content',
  },
  { id: 'default-tooltips-section', title: 'Default tooltips', type: 'section' },
  { id: 'top-tooltip' },
  { id: 'bottom-tooltip' },
  { id: 'left-tooltip' },
  { id: 'right-tooltip' },
];

export default Examples;
