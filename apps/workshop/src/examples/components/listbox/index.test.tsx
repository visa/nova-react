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
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { BrowserRouter } from 'react-router-dom';
import metaData from './meta.json';

import { DefaultMultiListbox } from './default-multi-listbox';
import { DefaultSingleListbox } from './default-single-listbox';
import { DisabledMultiListbox } from './disabled-multi-listbox';
import { DisabledSingleListbox } from './disabled-single-listbox';
import { ErrorMultiListbox } from './error-multi-listbox';
import { ErrorSingleListbox } from './error-single-listbox';
import { InlineMultiListbox } from './inline-multi-listbox';
import { InlineSingleListbox } from './inline-single-listbox';
import { ItemDisabledMultiListbox } from './item-disabled-multi-listbox';
import { ItemDisabledSingleListbox } from './item-disabled-single-listbox';
import { OptionMultiListbox } from './option-multi-listbox';
import { OptionSingleListbox } from './option-single-listbox';
import { ResizeMultiListbox } from './resize-multi-listbox';
import { ResizeSingleListbox } from './resize-single-listbox';
import { SelectedMultiListbox } from './selected-multi-listbox';
import { SelectedSingleListbox } from './selected-single-listbox';

const examples = [
  { Component: DefaultMultiListbox, id: metaData['default-multi-listbox'].id },
  { Component: DefaultSingleListbox, id: metaData['default-single-listbox'].id },
  { Component: DisabledMultiListbox, id: metaData['disabled-multi-listbox'].id },
  { Component: DisabledSingleListbox, id: metaData['disabled-single-listbox'].id },
  { Component: ErrorMultiListbox, id: metaData['error-multi-listbox'].id },
  { Component: ErrorSingleListbox, id: metaData['error-single-listbox'].id },
  { Component: InlineMultiListbox, id: metaData['inline-multi-listbox'].id },
  { Component: InlineSingleListbox, id: metaData['inline-single-listbox'].id },
  { Component: ItemDisabledMultiListbox, id: metaData['item-disabled-multi-listbox'].id },
  { Component: ItemDisabledSingleListbox, id: metaData['item-disabled-single-listbox'].id },
  { Component: OptionMultiListbox, id: metaData['option-multi-listbox'].id },
  { Component: OptionSingleListbox, id: metaData['option-single-listbox'].id },
  { Component: ResizeMultiListbox, id: metaData['resize-multi-listbox'].id },
  { Component: ResizeSingleListbox, id: metaData['resize-single-listbox'].id },
  { Component: SelectedMultiListbox, id: metaData['selected-multi-listbox'].id },
  { Component: SelectedSingleListbox, id: metaData['selected-single-listbox'].id },
];

describe('Listbox examples', () => {
  examples.forEach(({ Component, id }) => {
    it(`${id} should render correctly`, async () => {
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

  describe('error single listbox', () => {
    it('should show error when no card is selected', () => {
      render(<ErrorSingleListbox />);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(screen.getByText('This is required text that describes the error in more detail.')).toBeInTheDocument();
    });

    it('should clear error when a card is selected', () => {
      render(<ErrorSingleListbox />);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      const cardButton = screen.getByText('Item A');
      fireEvent.click(cardButton);
      fireEvent.click(submitButton);
      expect(
        screen.queryByText('This is required text that describes the error in more detail.')
      ).not.toBeInTheDocument();
    });

    it("should clear selection when 'Reset' button is clicked", () => {
      render(<ErrorSingleListbox />);
      const cardButton = screen.getByText('Item A');
      fireEvent.click(cardButton);
      const clearSelectionButton = screen.getByText('Reset');
      fireEvent.click(clearSelectionButton);
      expect(
        screen.queryByText('This is required text that describes the error in more detail.')
      ).not.toBeInTheDocument();
    });
  });

  describe('error multi-select listbox', () => {
    it('should show error when no card is selected', () => {
      render(<ErrorMultiListbox />);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(screen.getByText('This is required text that describes the error in more detail.')).toBeInTheDocument();
    });

    it('should clear error when a card is selected', () => {
      render(<ErrorMultiListbox />);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      const cardButton = screen.getByText('Item A');
      fireEvent.click(cardButton);
      fireEvent.click(submitButton);
      expect(
        screen.queryByText('This is required text that describes the error in more detail.')
      ).not.toBeInTheDocument();
    });

    it("should clear selection when 'Reset' button is clicked", () => {
      render(<ErrorMultiListbox />);
      const cardButton = screen.getByText('Item A');
      fireEvent.click(cardButton);
      const clearSelectionButton = screen.getByText('Reset');
      fireEvent.click(clearSelectionButton);
      expect(
        screen.queryByText('This is required text that describes the error in more detail.')
      ).not.toBeInTheDocument();
    });
  });

  describe('option single listbox', () => {
    it('should select option when clicked', () => {
      render(<OptionSingleListbox />);
      const cardOption = screen.getByText('Item C');
      fireEvent.click(cardOption);
      expect(cardOption).toHaveAttribute('aria-selected', 'true');
    });
    it('should focus correctly on keyboard navigation', async () => {
      render(<OptionSingleListbox />);
      const user = userEvent.setup();
      const cardOptionD = screen.getByText('Item C');
      await user.tab();
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      expect(cardOptionD).toHaveFocus();
    });
  });

  describe('option multi select listbox', () => {
    it('should select option when clicked', () => {
      render(<OptionMultiListbox />);
      const cardOption = screen.getByText('Item C');
      fireEvent.click(cardOption);
      expect(cardOption).toHaveAttribute('aria-selected', 'true');
    });
    it('should focus correctly on keyboard navigation', async () => {
      render(<OptionMultiListbox />);
      const user = userEvent.setup();
      const cardOption = screen.getByText('Item C');
      await user.tab();
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      expect(cardOption).toHaveFocus();
    });
  });
});
