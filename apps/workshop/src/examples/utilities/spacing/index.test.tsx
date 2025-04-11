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

import { GapColumnSpacing } from './gap-column-spacing';
import { GapInheritSpacing } from './gap-inherit-spacing';
import { GapNormalSpacing } from './gap-normal-spacing';
import { GapRowSpacing } from './gap-row-spacing';
import { GapSpacing } from './gap-spacing';
import { MarginBottomSpacing } from './margin-bottom-spacing';
import { MarginInheritSpacing } from './margin-inherit-spacing';
import { MarginHorizontalSpacing } from './margin-horizontal-spacing';
import { MarginLeftSpacing } from './margin-left-spacing';
import { MarginRightSpacing } from './margin-right-spacing';
import { DefaultMargin } from './default-margin';
import { MarginTopSpacing } from './margin-top-spacing';
import { MarginVerticalSpacing } from './margin-vertical-spacing';
import { PaddingBottomSpacing } from './padding-bottom-spacing';
import { PaddingHorizontalSpacing } from './padding-horizontal-spacing';
import { PaddingInheritSpacing } from './padding-inherit-spacing';
import { PaddingLeftSpacing } from './padding-left-spacing';
import { PaddingRightSpacing } from './padding-right-spacing';
import { DefaultPadding } from './default-padding';
import { PaddingTopSpacing } from './padding-top-spacing';
import { PaddingVerticalSpacing } from './padding-vertical-spacing';

const examples = [
  { Component: GapColumnSpacing, title: metaData['gap-column-spacing'].title },
  { Component: GapInheritSpacing, title: metaData['gap-inherit-spacing'].title },
  { Component: GapNormalSpacing, title: metaData['gap-normal-spacing'].title },
  { Component: GapRowSpacing, title: metaData['gap-row-spacing'].title },
  { Component: GapSpacing, title: metaData['gap-spacing'].title },
  { Component: MarginBottomSpacing, title: metaData['margin-bottom-spacing'].title },
  { Component: MarginHorizontalSpacing, title: metaData['margin-horizontal-spacing'].title },
  { Component: MarginLeftSpacing, title: metaData['margin-left-spacing'].title },
  { Component: MarginRightSpacing, title: metaData['margin-right-spacing'].title },
  { Component: DefaultMargin, title: metaData['default-margin'].title },
  { Component: PaddingHorizontalSpacing, title: metaData['padding-horizontal-spacing'].title },
  { Component: PaddingInheritSpacing, title: metaData['padding-inherit-spacing'].title },
  { Component: PaddingLeftSpacing, title: metaData['padding-left-spacing'].title },
  { Component: PaddingRightSpacing, title: metaData['padding-right-spacing'].title },
  { Component: PaddingTopSpacing, title: metaData['padding-top-spacing'].title },
  { Component: PaddingVerticalSpacing, title: metaData['padding-vertical-spacing'].title },
  { Component: MarginInheritSpacing, title: metaData['margin-inherit-spacing'].title },
  { Component: MarginTopSpacing, title: metaData['margin-top-spacing'].title },
  { Component: MarginVerticalSpacing, title: metaData['margin-vertical-spacing'].title },
  { Component: PaddingBottomSpacing, title: metaData['padding-bottom-spacing'].title },
  { Component: DefaultPadding, title: metaData['default-padding'].title },
];

describe('Spacing examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
});
