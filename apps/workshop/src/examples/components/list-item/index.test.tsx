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

import { OneLineListItem } from './one-line-list-item';
import { OneLineTwoColumnListItem } from './one-line-two-column-list-item';
import { TwoLineListItem } from './two-line-list-item';
import { ThreeLineListItem } from './three-line-list-item';
import { LeadingIconListItem } from './leading-icon-list-item';
import { LeadingIconWithBackgroundListItem } from './leading-icon-with-background-list-item';
import { LeadingImageListItem } from './leading-image-list-item';
import { LeadingCardArtListItem } from './leading-card-art-list-item';
import { IndicatorLineListItem } from './indicator-line-list-item';
import { TrailingIconListItem } from './trailing-icon-list-item';
import { TrailingIconWithBackgroundListItem } from './trailing-icon-with-background-list-item';
import { TrailingImageListItem } from './trailing-image-list-item';
import { TrailingCardArtListItem } from './trailing-card-art-list-item';
import { DefaultClickthroughListItem } from './default-clickthrough-list-item';
import { DisabledClickthroughListItem } from './disabled-clickthrough-list-item';
import { DisabledLeadingImageClickthroughListItem } from './disabled-leading-image-clickthrough-list-item';
import { DisabledLeadingIconClickthroughListItem } from './disabled-leading-icon-clickthrough-list-item';
import { DisabledCardArtClickthroughListItem } from './disabled-card-art-clickthrough-list-item';
import { DisabledCardArtWithNumberClickthroughListItem } from './disabled-card-art-with-number-clickthrough-list-item';
import { DefaultSwitchListItem } from './default-switch-list-item';
import { DisabledSwitchListItem } from './disabled-switch-list-item';
import { DefaultRadioListItem } from './default-radio-list-item';
import { DisabledRadioListItem } from './disabled-radio-list-item';
import { DefaultCheckboxListItem } from './default-checkbox-list-item';
import { DisabledCheckboxListItem } from './disabled-checkbox-list-item';
import { DefaultList } from './default-list';
import { DefaultListWithDividers } from './default-list-with-dividers';
import { DefaultListWithTitle } from './default-list-with-title';
import { DefaultListWithSectionTitleAndHyperlink } from './default-list-with-section-title-and-hyperlink';
import { ClickthroughList } from './clickthrough-list';
import { RadioList } from './radio-list';
import { CheckboxList } from './checkbox-list';
import { AccountClickthroughList } from './account-clickthrough-list';
import { TransactionsList } from './transactions-list';

const examples = [
  { Component: OneLineListItem, title: metaData['one-line-list-item'].title },
  { Component: OneLineTwoColumnListItem, title: metaData['one-line-two-column-list-item'].title },
  { Component: TwoLineListItem, title: metaData['two-line-list-item'].title },
  { Component: ThreeLineListItem, title: metaData['three-line-list-item'].title },
  { Component: LeadingIconListItem, title: metaData['leading-icon-list-item'].title },
  { Component: LeadingIconWithBackgroundListItem, title: metaData['leading-icon-with-background-list-item'].title },
  { Component: LeadingImageListItem, title: metaData['leading-image-list-item'].title },
  { Component: LeadingCardArtListItem, title: metaData['leading-card-art-list-item'].title },
  { Component: IndicatorLineListItem, title: metaData['indicator-line-list-item'].title },
  { Component: TrailingIconListItem, title: metaData['trailing-icon-list-item'].title },
  { Component: TrailingIconWithBackgroundListItem, title: metaData['trailing-icon-with-background-list-item'].title },
  { Component: TrailingImageListItem, title: metaData['trailing-image-list-item'].title },
  { Component: TrailingCardArtListItem, title: metaData['trailing-card-art-list-item'].title },
  { Component: DefaultClickthroughListItem, title: metaData['default-clickthrough-list-item'].title },
  { Component: DisabledClickthroughListItem, title: metaData['disabled-clickthrough-list-item'].title },
  {
    Component: DisabledLeadingImageClickthroughListItem,
    title: metaData['disabled-leading-image-clickthrough-list-item'].title,
  },
  {
    Component: DisabledLeadingIconClickthroughListItem,
    title: metaData['disabled-leading-icon-clickthrough-list-item'].title,
  },
  { Component: DisabledCardArtClickthroughListItem, title: metaData['disabled-card-art-clickthrough-list-item'].title },
  {
    Component: DisabledCardArtWithNumberClickthroughListItem,
    title: metaData['disabled-card-art-with-number-clickthrough-list-item'].title,
  },
  { Component: DefaultSwitchListItem, title: metaData['default-switch-list-item'].title },
  { Component: DisabledSwitchListItem, title: metaData['disabled-switch-list-item'].title },
  { Component: DefaultRadioListItem, title: metaData['default-radio-list-item'].title },
  { Component: DisabledRadioListItem, title: metaData['disabled-radio-list-item'].title },
  { Component: DefaultCheckboxListItem, title: metaData['default-checkbox-list-item'].title },
  { Component: DisabledCheckboxListItem, title: metaData['disabled-checkbox-list-item'].title },
  { Component: DefaultList, title: metaData['default-list'].title },
  { Component: DefaultListWithDividers, title: metaData['default-list-with-dividers'].title },
  { Component: DefaultListWithTitle, title: metaData['default-list-with-title'].title },
  {
    Component: DefaultListWithSectionTitleAndHyperlink,
    title: metaData['default-list-with-section-title-and-hyperlink'].title,
  },
  { Component: ClickthroughList, title: metaData['clickthrough-list'].title },
  { Component: RadioList, title: metaData['radio-list'].title },
  { Component: CheckboxList, title: metaData['checkbox-list'].title },
  { Component: AccountClickthroughList, title: metaData['account-clickthrough-list'].title },
  { Component: TransactionsList, title: metaData['transactions-list'].title },
];

describe('List item examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
});
