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

import { CardExpirationSelect } from './card-expiration';
import { DefaultSelect } from './default-select';
import { DisabledSelect } from './disabled-select';
import { ErrorSelect } from './error-select';
import { InlineSelect } from './inline-select';
import { ReadOnlySelect } from './read-only-select';
import { SelectWithInlineMessage } from './select-with-inline-message';

const examples = [
  { Component: DefaultSelect, title: metaData['default-select'].title },
  { Component: DisabledSelect, title: metaData['disabled-select'].title },
  { Component: InlineSelect, title: metaData['inline-select'].title },
  { Component: ErrorSelect, title: metaData['error-select'].title },
  { Component: ReadOnlySelect, title: metaData['read-only-select'].title },
  { Component: SelectWithInlineMessage, title: metaData['select-with-inline-message'].title },
  { Component: CardExpirationSelect, title: metaData['card-expiration'].title },
];

describe('Select examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('disabled select', () => {
    it('should allow toggling disabled state', () => {
      render(<DisabledSelect />);
      const select = screen.getByLabelText('Label (required)');
      expect(select).toBeDisabled();
      const toggleButton = screen.getByLabelText('Mark select as disabled');
      fireEvent.click(toggleButton);
      expect(select).not.toBeDisabled();
    });
  });
  describe('error select', () => {
    it('should show error', () => {
      render(<ErrorSelect />);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(screen.getByText('This is required text that describes the error in more detail')).toBeInTheDocument();
    });
    it('should not show error if valid', () => {
      const { container } = render(<ErrorSelect />);
      const submitButton = screen.getByText('Submit');
      const select = container.querySelector('#error-select')!;
      fireEvent.change(select, { target: { value: '1' } });
      fireEvent.click(submitButton);
      expect(screen.queryByText('This is required text that describes the error in more detail')).toBeNull();
    });

    it("shouldn't show error after reset", () => {
      render(<ErrorSelect />);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      const resetButton = screen.getByText('Reset');
      fireEvent.click(resetButton);
      expect(screen.queryByText('This is required text that describes the error in more detail')).toBeNull();
    });
  });

  describe('card expiration select', () => {
    it('should show error', () => {
      render(<CardExpirationSelect />);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(screen.getByText('This is required text that describes the error in more detail')).toBeInTheDocument();
    });
    it('should disable months if selected year is current year and not January', () => {
      const { container } = render(<CardExpirationSelect />);
      const monthSelect = container.querySelector('#card-expiration-select-month')!;
      const yearSelect = container.querySelector('#card-expiration-select-year')!;

      fireEvent.change(yearSelect, { target: { value: new Date().getFullYear() } });
      const currentMonth = new Date().getMonth();
      if (currentMonth > 0) {
        expect(monthSelect.children[1]).toHaveAttribute('disabled');
      } else {
        expect(monthSelect.children[1]).not.toHaveAttribute('disabled');
      }
    });
    it('show alert if valid', () => {
      const windowMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
      const { container } = render(<CardExpirationSelect />);
      const submitButton = screen.getByText('Submit');
      const monthSelect = container.querySelector('#card-expiration-select-month')!;
      const yearSelect = container.querySelector('#card-expiration-select-year')!;
      fireEvent.change(monthSelect, { target: { value: 1 } });
      fireEvent.change(yearSelect, { target: { value: 2028 } });
      fireEvent.click(submitButton);
      expect(windowMock).toHaveBeenCalled();
    });
  });
});
