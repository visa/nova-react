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

import { CustomColorIcon } from './custom-color-icon';
import { DefaultIcon } from './default-icon';
import { VisaIcon } from './visa-icon';
import { TinyResolution } from './tiny-resolution';
import { LowResolution } from './low-resolution';
import { HighResolution } from './high-resolution';
import { GenericIcon } from './generic-icon';
import metaData from './meta.json';
import { RtlIcons } from './rtl-icon';

const examples = [
  { Component: DefaultIcon, title: metaData['default-icon'].title },
  { Component: VisaIcon, title: metaData['visa-icon'].title },
  { Component: GenericIcon, title: metaData['generic-icon'].title },
  { Component: TinyResolution, title: metaData['tiny-resolution'].title },
  { Component: LowResolution, title: metaData['low-resolution'].title },
  { Component: HighResolution, title: metaData['high-resolution'].title },
  { Component: RtlIcons, title: metaData['rtl-icon'].title },
  { Component: CustomColorIcon, title: metaData['custom-color-icon'].title },
];

describe('Icon examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
});
