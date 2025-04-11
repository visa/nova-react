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

import { BodyOneTypography } from './body-one-typography';
import { BodyThreeTypography } from './body-three-typography';
import { BodyTwoBoldTypography } from './body-two-bold-typography';
import { BodyTwoMediumTypography } from './body-two-medium-typography';
import { BodyTwoTypography } from './body-two-typography';
import { ButtonLargeTypography } from './button-large-typography';
import { ButtonMediumTypography } from './button-medium-typography';
import { ButtonSmallTypography } from './button-small-typography';
import { ColorActiveTypography } from './color-active-typography';
import { ColorDefaultTypography } from './color-default-typography';
import { ColorOnActiveTypography } from './color-on-active-typography';
import { ColorSubtleTypography } from './color-subtle-typography';
import { DisplayOneTypography } from './display-one-typography';
import { DisplayTwoTypography } from './display-two-typography';
import { HeadlineFourTypography } from './headline-four-typography';
import { HeadlineOneTypography } from './headline-one-typography';
import { HeadlineThreeTypography } from './headline-three-typography';
import { HeadlineTwoTypography } from './headline-two-typography';
import { LabelActiveTypography } from './label-active-typography';
import { LabelLargeActiveTypography } from './label-large-active-typography';
import { LabelLargeTypography } from './label-large-typography';
import { LabelSmallTypography } from './label-small-typography';
import { LabelTypography } from './label-typography';
import { OverlineTypography } from './overline-typography';
import { SubtitleOneTypography } from './subtitle-one-typography';
import { SubtitleThreeTypography } from './subtitle-three-typography';
import { SubtitleTwoTypography } from './subtitle-two-typography';

const examples = [
  { Component: BodyOneTypography, title: metaData['body-one-typography'].title },
  { Component: BodyThreeTypography, title: metaData['body-three-typography'].title },
  { Component: BodyTwoBoldTypography, title: metaData['body-two-bold-typography'].title },
  { Component: BodyTwoMediumTypography, title: metaData['body-two-medium-typography'].title },
  { Component: BodyTwoTypography, title: metaData['body-two-typography'].title },
  { Component: ButtonLargeTypography, title: metaData['button-large-typography'].title },
  { Component: ButtonMediumTypography, title: metaData['button-medium-typography'].title },
  { Component: ButtonSmallTypography, title: metaData['button-small-typography'].title },
  { Component: ColorActiveTypography, title: metaData['color-active-typography'].title },
  { Component: ColorDefaultTypography, title: metaData['color-default-typography'].title },
  { Component: ColorOnActiveTypography, title: metaData['color-on-active-typography'].title },
  { Component: ColorSubtleTypography, title: metaData['color-subtle-typography'].title },
  { Component: DisplayOneTypography, title: metaData['display-one-typography'].title },
  { Component: DisplayTwoTypography, title: metaData['display-two-typography'].title },
  { Component: HeadlineFourTypography, title: metaData['headline-four-typography'].title },
  { Component: HeadlineOneTypography, title: metaData['headline-one-typography'].title },
  { Component: HeadlineThreeTypography, title: metaData['headline-three-typography'].title },
  { Component: HeadlineTwoTypography, title: metaData['headline-two-typography'].title },
  { Component: LabelActiveTypography, title: metaData['label-active-typography'].title },
  { Component: LabelLargeActiveTypography, title: metaData['label-large-active-typography'].title },
  { Component: LabelLargeTypography, title: metaData['label-large-typography'].title },
  { Component: LabelSmallTypography, title: metaData['label-small-typography'].title },
  { Component: LabelTypography, title: metaData['label-typography'].title },
  { Component: OverlineTypography, title: metaData['overline-typography'].title },
  { Component: SubtitleOneTypography, title: metaData['subtitle-one-typography'].title },
  { Component: SubtitleThreeTypography, title: metaData['subtitle-three-typography'].title },
  { Component: SubtitleTwoTypography, title: metaData['subtitle-two-typography'].title },
];

describe('Typography examples', () => {
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
