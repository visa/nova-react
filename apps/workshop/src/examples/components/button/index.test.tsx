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

import { AlternateButton } from './alternate-button';
import { AlternateSecondaryButton } from './alternate-secondary-button';
import { AlternateStackedIconButton } from './alternate-stacked-icon-button';
import { AlternateTertiaryButton } from './alternate-tertiary-button';
import { AlternateUiIconButton } from './alternate-ui-icon-button';
import { CodedAsLinkButton } from './coded-as-link-button';
import { DefaultButton } from './default-button';
import { DestructiveButton } from './destructive-button';
import { DestructiveSecondaryButton } from './destructive-secondary-button';
import { DestructiveTertiaryButton } from './destructive-tertiary-button';
import { DisabledButton } from './disabled-button';
import { DisabledIconButton } from './disabled-icon-button';
import { DisabledSecondaryButton } from './disabled-secondary-button';
import { DisabledSecondaryIconButton } from './disabled-secondary-icon-button';
import { DisabledTertiaryButton } from './disabled-tertiary-button';
import { IconAlternateButton } from './icon-alternate-button';
import { IconButton } from './icon-button';
import { LargeButton } from './large-button';
import { LargeIconButton } from './large-icon-button';
import { LargeSecondaryButton } from './large-secondary-button';
import { LargeSecondaryIconButton } from './large-secondary-icon-button';
import { LargeTertiaryButton } from './large-tertiary-button';
import { LargeUiIconButton } from './large-ui-icon-button';
import { SecondaryAlternateIconButton } from './secondary-alternate-icon-button';
import { SecondaryButton } from './secondary-button';
import { SecondaryIconButton } from './secondary-icon-button';
import { SmallButton } from './small-button';
import { SmallIconButton } from './small-icon-button';
import { SmallSecondaryButton } from './small-secondary-button';
import { SmallTertiaryButton } from './small-tertiary-button';
import { SmallUiIconButton } from './small-ui-icon-button';
import { StackedIconButton } from './stacked-icon-button';
import { SubtleUiIconButton } from './subtle-ui-icon-button';
import { TertiaryButton } from './tertiary-button';
import { UiIconButton } from './ui-icon-button';
import { WithBadgeNumberUiIconButton } from './with-badge-number-ui-icon-button';
import { WithLabelIconButton } from './with-label-icon-button';
import { WithLabelSecondaryIconButton } from './with-label-secondary-icon-button';
import { WithLeadingIconButton } from './with-leading-icon-button';
import { WithLeadingIconSecondaryButton } from './with-leading-icon-secondary-button';
import { WithLeadingIconTertiaryButton } from './with-leading-icon-tertiary-button';
import { WithTrailingIconButton } from './with-trailing-icon-button';
import { WithTrailingIconSecondaryButton } from './with-trailing-icon-secondary-button';
import { WithTrailingIconTertiaryButton } from './with-trailing-icon-tertiary-button';

const examples = [
  { Component: AlternateButton, title: metaData['alternate-button'].title },
  { Component: AlternateSecondaryButton, title: metaData['alternate-secondary-button'].title },
  { Component: AlternateStackedIconButton, title: metaData['alternate-stacked-icon-button'].title },
  { Component: AlternateTertiaryButton, title: metaData['alternate-tertiary-button'].title },
  { Component: AlternateUiIconButton, title: metaData['alternate-ui-icon-button'].title },
  { Component: CodedAsLinkButton, title: metaData['coded-as-link-button'].title },
  { Component: DefaultButton, title: metaData['default-button'].title },
  { Component: DestructiveButton, title: metaData['destructive-button'].title },
  { Component: DestructiveSecondaryButton, title: metaData['destructive-secondary-button'].title },
  { Component: DestructiveTertiaryButton, title: metaData['destructive-tertiary-button'].title },
  { Component: DisabledButton, title: metaData['disabled-button'].title },
  { Component: DisabledIconButton, title: metaData['disabled-icon-button'].title },
  { Component: DisabledSecondaryButton, title: metaData['disabled-secondary-button'].title },
  { Component: DisabledSecondaryIconButton, title: metaData['disabled-secondary-icon-button'].title },
  { Component: DisabledTertiaryButton, title: metaData['disabled-tertiary-button'].title },
  { Component: IconButton, title: metaData['icon-button'].title },
  { Component: IconAlternateButton, title: metaData['icon-alternate-button'].title },
  { Component: LargeButton, title: metaData['large-button'].title },
  { Component: LargeIconButton, title: metaData['large-icon-button'].title },
  { Component: LargeSecondaryButton, title: metaData['large-secondary-button'].title },
  { Component: LargeSecondaryIconButton, title: metaData['large-secondary-icon-button'].title },
  { Component: LargeTertiaryButton, title: metaData['large-tertiary-button'].title },
  { Component: LargeUiIconButton, title: metaData['large-ui-icon-button'].title },
  { Component: SecondaryAlternateIconButton, title: metaData['secondary-alternate-icon-button'].title },
  { Component: SecondaryButton, title: metaData['secondary-button'].title },
  { Component: SecondaryIconButton, title: metaData['secondary-icon-button'].title },
  { Component: SmallButton, title: metaData['small-button'].title },
  { Component: SmallIconButton, title: metaData['small-icon-button'].title },
  { Component: SmallSecondaryButton, title: metaData['small-secondary-button'].title },
  { Component: SmallTertiaryButton, title: metaData['small-tertiary-button'].title },
  { Component: SmallUiIconButton, title: metaData['small-ui-icon-button'].title },
  { Component: StackedIconButton, title: metaData['stacked-icon-button'].title },
  { Component: SubtleUiIconButton, title: metaData['subtle-ui-icon-button'].title },
  { Component: TertiaryButton, title: metaData['tertiary-button'].title },
  { Component: UiIconButton, title: metaData['ui-icon-button'].title },
  { Component: WithBadgeNumberUiIconButton, title: metaData['with-badge-number-ui-icon-button'].title },
  { Component: WithLabelIconButton, title: metaData['with-label-icon-button'].title },
  { Component: WithLabelSecondaryIconButton, title: metaData['with-label-secondary-icon-button'].title },
  { Component: WithLeadingIconButton, title: metaData['with-leading-icon-button'].title },
  { Component: WithLeadingIconSecondaryButton, title: metaData['with-leading-icon-secondary-button'].title },
  { Component: WithLeadingIconTertiaryButton, title: metaData['with-leading-icon-tertiary-button'].title },
  { Component: WithTrailingIconButton, title: metaData['with-trailing-icon-button'].title },
  { Component: WithTrailingIconSecondaryButton, title: metaData['with-trailing-icon-secondary-button'].title },
  { Component: WithTrailingIconTertiaryButton, title: metaData['with-trailing-icon-tertiary-button'].title },
];

describe('Button examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
});
