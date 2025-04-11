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
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import metaData from './meta.json';

import { LastDigitPagination } from './last-page-selected';
import { MinMaxPagination } from './min-max-pagination';
import { OneDigitPagination } from './one-digit-pagination';
import { SlimPagination } from './slim-pagination';
import { TablePagination } from './table-pagination';
import { TwoDigitPagination } from './two-digit-pagination';

const examples = [
  { Component: MinMaxPagination, title: metaData['min-max-pagination'].title },
  { Component: TablePagination, title: metaData['table-pagination'].title },
  { Component: OneDigitPagination, title: metaData['one-digit-pagination'].title },
  { Component: SlimPagination, title: metaData['slim-pagination'].title },
  { Component: LastDigitPagination, title: metaData['last-page-selected'].title },
  { Component: TwoDigitPagination, title: metaData['two-digit-pagination'].title },
];

describe('Pagination examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
  describe('min/max pagination', () => {
    it('should allow for page change', () => {
      render(<MinMaxPagination />);
      const page52 = screen.getByText('52');
      fireEvent.click(page52);
      expect(page52).toHaveAttribute('aria-current', 'true');
    });
  });
  describe('table pagination', () => {
    it('should allow for page change', () => {
      render(<TablePagination />);
      const page3 = screen.getByText('3');
      fireEvent.click(page3);
      expect(page3).toHaveAttribute('aria-current', 'true');
    });
    it('should allow for items per page change', () => {
      render(<TablePagination />);
      const itemsPerPageSelect = screen.getByLabelText<HTMLSelectElement>('Items Per Page');
      fireEvent.change(itemsPerPageSelect, { target: { value: '20' } });
      expect(screen.queryByText('5')).toBeInTheDocument();
    });
  });
});
