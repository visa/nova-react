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

import { DecorativeDivider } from './decorative-divider';
import { DefaultDivider } from './default-divider';
import { SectionDivider } from './section-divider';

const examples = [
  { Component: DecorativeDivider, title: metaData['decorative-divider'].title },
  { Component: DefaultDivider, title: metaData['default-divider'].title },
  { Component: SectionDivider, title: metaData['section-divider'].title },
];

describe('Divider examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
});
