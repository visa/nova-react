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
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import metaData from './meta.json';

import { CustomSeparatorBreadcrumbs } from './custom-separator-breadcrumbs';
import { DefaultBreadcrumbs } from './default-breadcrumbs';
import { InlineSeparatorBreadcrumbs } from './inline-separator-breadcrumbs';
import { InlineSVGSeparatorBreadcrumbs } from './inline-svg-separator-breadcrumbs';

const examples = [
  { Component: DefaultBreadcrumbs, title: metaData['default-breadcrumbs'].title },
  { Component: CustomSeparatorBreadcrumbs, title: metaData['custom-separator-breadcrumbs'].title },
  { Component: InlineSeparatorBreadcrumbs, title: metaData['inline-separator-breadcrumbs'].title },
  { Component: InlineSVGSeparatorBreadcrumbs, title: metaData['inline-svg-separator-breadcrumbs'].title },
];

describe('Breadcrumbs examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
});
