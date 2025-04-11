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

import { DirectionRTLAnchorLinkMenu } from './direction-rtl-anchor-link-menu';
import { NestedAnchorLinkMenu } from './nested-anchor-link-menu';
import { DefaultAnchorLinkMenu } from './default-anchor-link-menu';
import { NoTitleAnchorLinkMenu } from './no-title-anchor-link-menu';

const examples = [
  { Component: DefaultAnchorLinkMenu, title: metaData['default-anchor-link-menu'].title },
  { Component: NoTitleAnchorLinkMenu, title: metaData['no-title-anchor-link-menu'].title },
  { Component: NestedAnchorLinkMenu, title: metaData['nested-anchor-link-menu'].title },
  { Component: DirectionRTLAnchorLinkMenu, title: metaData['direction-rtl-anchor-link-menu'].title },
];

describe('Anchor link menu examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
});
