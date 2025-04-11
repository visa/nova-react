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

import { GroupHeadersEmptyCellTable } from './group-headers-empty-cell-table';
import { GroupHeadersTable } from './group-headers-table';
import { KeyValueBandedTable } from './key-value-banded-table';
import { KeyValueLinedTable } from './key-value-lined-table';
import { LargePaddingBandedTable } from './large-padding-banded-table';
import { LinedRowsTable } from './lined-rows-table';
import { MediumPaddingBandedTable } from './medium-padding-banded-table';
import { OuterBorderColumnRowDividerTable } from './outer-border-column-row-table';
import { OuterBorderSubtleHeaderTable } from './outer-border-subtle-header-table';
import { ScrollTable } from './scroll-table';
import { SmallPaddingBandedTable } from './small-padding-banded-table';

const examples = [
  { Component: GroupHeadersEmptyCellTable, title: metaData['group-headers-empty-cell-table'].title },
  { Component: GroupHeadersTable, title: metaData['group-headers-table'].title },
  { Component: KeyValueBandedTable, title: metaData['key-value-banded-table'].title },
  { Component: KeyValueLinedTable, title: metaData['key-value-lined-table'].title },
  { Component: LargePaddingBandedTable, title: metaData['large-padding-banded-table'].title },
  { Component: LinedRowsTable, title: metaData['lined-rows-table'].title },
  { Component: MediumPaddingBandedTable, title: metaData['medium-padding-banded-table'].title },
  { Component: OuterBorderColumnRowDividerTable, title: metaData['outer-border-column-row-table'].title },
  { Component: OuterBorderSubtleHeaderTable, title: metaData['outer-border-subtle-header-table'].title },
  { Component: ScrollTable, title: metaData['scroll-table'].title },
  { Component: SmallPaddingBandedTable, title: metaData['small-padding-banded-table'].title },
];

describe('Table examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
});
