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

import { CategoryContentCard } from './category-content-card';
import { ClickableContentCard } from './clickable-content-card';
import { ClickableDisabledContentCard } from './clickable-disabled-content-card';
import { CompactContentCard } from './compact-content-card';
import { CompactDashboardContentCard } from './compact-dashboard-content-card';
import { DefaultContentCard } from './default-content-card';
import { IconContentCard } from './icon-content-card';
import { ImageHeaderContentCard } from './image-header-content-card';
import { WithButtonsContentCard } from './with-buttons-content-card';

const examples = [
  { Component: CompactDashboardContentCard, title: metaData['compact-dashboard-content-card'].title },
  { Component: CategoryContentCard, title: metaData['category-content-card'].title },
  { Component: ClickableContentCard, title: metaData['clickable-content-card'].title },
  { Component: ClickableDisabledContentCard, title: metaData['clickable-disabled-content-card'].title },
  { Component: CompactContentCard, title: metaData['compact-content-card'].title },
  { Component: DefaultContentCard, title: metaData['default-content-card'].title },
  { Component: IconContentCard, title: metaData['icon-content-card'].title },
  { Component: ImageHeaderContentCard, title: metaData['image-header-content-card'].title },
  { Component: WithButtonsContentCard, title: metaData['with-buttons-content-card'].title },
];

describe('Content card examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
});
