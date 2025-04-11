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
import { BrowserRouter } from 'react-router-dom';

import metaData from './meta.json';

import { AlternateLink } from './alternate-link';
import { CustomTagLink } from './custom-tag-link';
import { DefaultLink } from './default-link';
import { DisabledLink } from './disabled-link';
import { InlineLink } from './inline-link';
import { ReactRouterLink } from './react-router-link';
import { WithoutUnderlineLink } from './without-underline-link';
import { CustomTypographyLink } from './custom-typography-link';
import { LeadingIconLink } from './leading-icon-link';
import { NewTabLink } from './new-tab-link';
import { TrailingIconLink } from './trailing-icon-link';

const examples = [
  { Component: AlternateLink, title: metaData['alternate-link'].title },
  { Component: CustomTagLink, title: metaData['custom-tag-link'].title },
  { Component: CustomTypographyLink, title: metaData['custom-typography-link'].title },
  { Component: DefaultLink, title: metaData['default-link'].title },
  { Component: DisabledLink, title: metaData['disabled-link'].title },
  { Component: InlineLink, title: metaData['inline-link'].title },
  { Component: LeadingIconLink, title: metaData['leading-icon-link'].title },
  { Component: NewTabLink, title: metaData['new-tab-link'].title },
  { Component: ReactRouterLink, title: metaData['react-router-link'].title },
  { Component: TrailingIconLink, title: metaData['trailing-icon-link'].title },
  { Component: WithoutUnderlineLink, title: metaData['without-underline-link'].title },
];

describe('Link examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
});
