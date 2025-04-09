/**
 *              Copyright (c) 2025 Visa, Inc.
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

import { AlignContentAroundFlex } from './align-content-around-flex';
import { AlignContentBetweenFlex } from './align-content-between-flex';
import { AlignContentCenterFlex } from './align-content-center-flex';
import { AlignContentEndFlex } from './align-content-end-flex';
import { AlignContentEvenlyFlex } from './align-content-evenly-flex';
import { AlignContentStartFlex } from './align-content-start-flex';
import { AlignItemsBaselineFlex } from './align-items-baseline-flex';
import { AlignItemsCenterFlex } from './align-items-center-flex';
import { AlignItemsEndFlex } from './align-items-end-flex';
import { AlignItemsStartFlex } from './align-items-start-flex';
import { AlignItemsStretchFlex } from './align-items-stretch-flex';
import { AlignSelfAutoFlex } from './align-self-auto-flex';
import { AlignSelfCenterFlex } from './align-self-center-flex';
import { AlignSelfEndFlex } from './align-self-end-flex';
import { AlignSelfStartFlex } from './align-self-start-flex';
import { AlignSelfStretchFlex } from './align-self-stretch-flex';
import { ColumnFlex } from './column-flex';
import { ColumnReverseFlex } from './column-reverse-flex';
import { DefaultFlex } from './default-flex';
import { GrowFlex } from './grow-flex';
import { GrowZeroFlex } from './grow-zero-flex';
import { InlineFlex } from './inline-flex';
import { JustifyContentAroundFlex } from './justify-content-around-flex';
import { JustifyContentBetweenFlex } from './justify-content-between-flex';
import { JustifyContentCenterFlex } from './justify-content-center-flex';
import { JustifyContentEndFlex } from './justify-content-end-flex';
import { JustifyContentEvenlyFlex } from './justify-content-evenly-flex';
import { JustifyContentStartFlex } from './justify-content-start-flex';
import { NoWrapFlex } from './no-wrap-flex';
import { RowFlex } from './row-flex';
import { RowReverseFlex } from './row-reverse-flex';
import { ShrinkFlex } from './shrink-flex';
import { ShrinkZeroFlex } from './shrink-zero-flex';
import { WrapFlex } from './wrap-flex';
import { WrapReverseFlex } from './wrap-reverse-flex';

const examples = [
  { Component: AlignContentAroundFlex, title: metaData['align-content-around-flex'].title },
  { Component: AlignContentBetweenFlex, title: metaData['align-content-between-flex'].title },
  { Component: AlignContentCenterFlex, title: metaData['align-content-center-flex'].title },
  { Component: AlignContentEndFlex, title: metaData['align-content-end-flex'].title },
  { Component: AlignContentEvenlyFlex, title: metaData['align-content-evenly-flex'].title },
  { Component: AlignContentStartFlex, title: metaData['align-content-start-flex'].title },
  { Component: AlignItemsBaselineFlex, title: metaData['align-items-baseline-flex'].title },
  { Component: AlignItemsCenterFlex, title: metaData['align-items-center-flex'].title },
  { Component: AlignItemsEndFlex, title: metaData['align-items-end-flex'].title },
  { Component: AlignItemsStartFlex, title: metaData['align-items-start-flex'].title },
  { Component: AlignItemsStretchFlex, title: metaData['align-items-stretch-flex'].title },
  { Component: AlignSelfAutoFlex, title: metaData['align-self-auto-flex'].title },
  { Component: AlignSelfCenterFlex, title: metaData['align-self-center-flex'].title },
  { Component: AlignSelfEndFlex, title: metaData['align-self-end-flex'].title },
  { Component: AlignSelfStartFlex, title: metaData['align-self-start-flex'].title },
  { Component: AlignSelfStretchFlex, title: metaData['align-self-stretch-flex'].title },
  { Component: ColumnFlex, title: metaData['column-flex'].title },
  { Component: ColumnReverseFlex, title: metaData['column-reverse-flex'].title },
  { Component: DefaultFlex, title: metaData['default-flex'].title },
  { Component: GrowFlex, title: metaData['grow-flex'].title },
  { Component: GrowZeroFlex, title: metaData['grow-zero-flex'].title },
  { Component: InlineFlex, title: metaData['inline-flex'].title },
  { Component: JustifyContentAroundFlex, title: metaData['justify-content-around-flex'].title },
  { Component: JustifyContentBetweenFlex, title: metaData['justify-content-between-flex'].title },
  { Component: JustifyContentCenterFlex, title: metaData['justify-content-center-flex'].title },
  { Component: JustifyContentEndFlex, title: metaData['justify-content-end-flex'].title },
  { Component: JustifyContentEvenlyFlex, title: metaData['justify-content-evenly-flex'].title },
  { Component: JustifyContentStartFlex, title: metaData['justify-content-start-flex'].title },
  { Component: NoWrapFlex, title: metaData['no-wrap-flex'].title },
  { Component: RowFlex, title: metaData['row-flex'].title },
  { Component: RowReverseFlex, title: metaData['row-reverse-flex'].title },
  { Component: ShrinkFlex, title: metaData['shrink-flex'].title },
  { Component: ShrinkZeroFlex, title: metaData['shrink-zero-flex'].title },
  { Component: WrapFlex, title: metaData['wrap-flex'].title },
  { Component: WrapReverseFlex, title: metaData['wrap-reverse-flex'].title },
];

describe('Flex examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
});
