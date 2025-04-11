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

import { SubtleBadgeDefault } from './subtle-badge-default';
import { SubtleBadgeWithoutIcon } from './subtle-badge-without-icon';
import { SubtleBadgeWithIndicator } from './subtle-badge-with-indicator'; 
import { SubtleBadgeWithoutBackground } from './subtle-badge-without-background';

import { NeutralBadgeDefault } from './neutral-badge-default';
import { NeutralBadgeWithoutIcon } from './neutral-badge-without-icon';
import { NeutralBadgeWithIndicator } from './neutral-badge-with-indicator'; 
import { NeutralBadgeWithoutBackground } from './neutral-badge-without-background';
import { NeutralBadgeIcon } from './neutral-badge-icon';
import { NeutralBadgeWithIconWithoutBackground } from './neutral-badge-icon-without-background';

import { PositiveBadgeDefault } from './positive-badge-default';
import { PositiveBadgeWithoutIcon } from './positive-badge-without-icon';
import { PositiveBadgeWithIndicator } from './positive-badge-with-indicator'; 
import { PositiveBadgeWithoutBackground } from './positive-badge-without-background';
import { PositiveBadgeIcon } from './positive-badge-icon';
import { PositiveBadgeWithIconWithoutBackground } from './positive-badge-icon-without-background';

import { WarningBadgeDefault } from './warning-badge-default';
import { WarningBadgeWithoutIcon } from './warning-badge-without-icon';
import { WarningBadgeWithIndicator } from './warning-badge-with-indicator'; 
import { WarningBadgeWithoutBackground } from './warning-badge-without-background';
import { WarningBadgeIcon } from './warning-badge-icon';
import { WarningBadgeWithIconWithoutBackground } from './warning-badge-icon-without-background';

import { NegativeBadgeDefault } from './negative-badge-default';
import { NegativeBadgeWithoutIcon } from './negative-badge-without-icon';
import { NegativeBadgeWithIndicator } from './negative-badge-with-indicator'; 
import { NegativeBadgeWithoutBackground } from './negative-badge-without-background';
import { NegativeBadgeIcon } from './negative-badge-icon';
import { NegativeBadgeWithIconWithoutBackground } from './negative-badge-icon-without-background';

const examples = [

  { Component: SubtleBadgeDefault, title: metaData['subtle-badge-default'].title },
  { Component: SubtleBadgeWithoutIcon, title: metaData['subtle-badge-without-icon'].title },
  { Component: SubtleBadgeWithIndicator, title: metaData['subtle-badge-with-indicator'].title },
  { Component: SubtleBadgeWithoutBackground, title: metaData['subtle-badge-without-background'].title },

  { Component: NeutralBadgeDefault, title: metaData['neutral-badge-default'].title },
  { Component: NeutralBadgeWithoutIcon, title: metaData['neutral-badge-without-icon'].title },
  { Component: NeutralBadgeWithIndicator, title: metaData['neutral-badge-with-indicator'].title },
  { Component: NeutralBadgeIcon, title: metaData['neutral-badge-icon'].title },
  { Component: NeutralBadgeWithoutBackground, title: metaData['neutral-badge-without-background'].title },
  { Component: NeutralBadgeWithIconWithoutBackground, title: metaData['neutral-badge-icon-without-background'].title },

  { Component: PositiveBadgeDefault, title: metaData['positive-badge-default'].title },
  { Component: PositiveBadgeWithoutIcon, title: metaData['positive-badge-without-icon'].title },
  { Component: PositiveBadgeWithIndicator, title: metaData['positive-badge-with-indicator'].title },
  { Component: PositiveBadgeIcon, title: metaData['positive-badge-icon'].title },
  { Component: PositiveBadgeWithoutBackground, title: metaData['positive-badge-without-background'].title },
  { Component: PositiveBadgeWithIconWithoutBackground, title: metaData['positive-badge-icon-without-background'].title },

  { Component: WarningBadgeDefault, title: metaData['warning-badge-default'].title },
  { Component: WarningBadgeWithoutIcon, title: metaData['warning-badge-without-icon'].title },
  { Component: WarningBadgeWithIndicator, title: metaData['warning-badge-with-indicator'].title },
  { Component: WarningBadgeIcon, title: metaData['warning-badge-icon'].title },
  { Component: WarningBadgeWithoutBackground, title: metaData['warning-badge-without-background'].title },
  { Component: WarningBadgeWithIconWithoutBackground, title: metaData['warning-badge-icon-without-background'].title },

  { Component: NegativeBadgeDefault, title: metaData['negative-badge-default'].title },
  { Component: NegativeBadgeWithoutIcon, title: metaData['negative-badge-without-icon'].title },
  { Component: NegativeBadgeWithIndicator, title: metaData['negative-badge-with-indicator'].title },
  { Component: NegativeBadgeIcon, title: metaData['negative-badge-icon'].title },
  { Component: NegativeBadgeWithoutBackground, title: metaData['negative-badge-without-background'].title },
  { Component: NegativeBadgeWithIconWithoutBackground, title: metaData['negative-badge-icon-without-background'].title },
];

describe('Badge examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
});
