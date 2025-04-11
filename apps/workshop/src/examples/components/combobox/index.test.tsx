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
import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { useCombobox } from 'downshift';
import {
  AutocompleteWithAutomaticSelectionCombobox,
  filter as autoAutocompleteFilter,
  stateReducer as autoAutocompleteStateReducer,
  itemToString as autoAutocompleteToString,
} from './autocomplete-with-automatic-selection-combobox';
import {
  AutocompleteWithManualSelectionCombobox,
  filter as manualAutocompleteFilter,
  stateReducer as manualAutocompleteStateReducer,
  itemToString as manualAutocompleteToString,
} from './autocomplete-with-manual-selection-combobox';
import {
  ClearButtonCombobox,
  stateReducer as clearStateReducer,
  itemToString as clearToString,
} from './clear-button-combobox';
import { DisabledCombobox, itemToString as disabledToString } from './disabled-combobox';
import { ErrorCombobox, stateReducer as errorStateReducer, itemToString as errorToString } from './error-combobox';
import {
  InlineMessageCombobox,
  stateReducer as inlineMessageStateReducer,
  itemToString as inlineMessageToString,
} from './inline-message-combobox';
import {
  ItemDisabledCombobox,
  stateReducer as itemDisabledStateReducer,
  itemToString as itemDisabledToString,
} from './item-disabled-combobox';
import {
  LeadingIconCombobox,
  stateReducer as leadingIconStateReducer,
  itemToString as leadingIconToString,
} from './leading-icon-combobox';
import {
  NoAutocompleteCombobox,
  stateReducer as noAutocompleteStateReducer,
  itemToString as noAutocompleteToString,
} from './no-autocomplete-combobox';
import { NoIconCombobox, stateReducer as noIconStateReducer, itemToString as noIconToString } from './no-icon-combobox';
import {
  PreSelectedCombobox,
  stateReducer as preSelectedStateReducer,
  itemToString as preSelectedToString,
} from './pre-selected-combobox';
import { ReadOnlyCombobox, itemToString as readOnlyToString } from './read-only-combobox';

describe('Combobox examples', () => {
  describe('default combobox', () => {
    it('should render correctly', async () => {
      const { container } = render(<NoAutocompleteCombobox />);
      await act(async () => {});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
    it('should render state correctly', () => {
      const { container } = render(<NoAutocompleteCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(input).toHaveAttribute('aria-expanded', 'true');
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(screen.getByText('Option A')).toBeInTheDocument();
    });
    it('should open when typing starts', () => {
      const { container } = render(<NoAutocompleteCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.change(input, { target: { value: '123456789' } });
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
    it('should return the correct state reducer', () => {
      const result = noAutocompleteStateReducer<boolean>(
        { highlightedIndex: 0, selectedItem: null, isOpen: false, inputValue: '' },
        { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes: { highlightedIndex: 1 } }
      );
      expect(result.highlightedIndex).toEqual(0);
    });
    it('should return the correct item string', () => {
      const result = noAutocompleteToString({ value: 'test' });
      const result2 = noAutocompleteToString(null);
      expect(result).toEqual('test');
      expect(result2).toEqual('');
    });
  });
  describe('pre-selected combobox', () => {
    it('should render correctly', async () => {
      const { container } = render(<PreSelectedCombobox />);
      await act(async () => {});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
    it('should render state correctly', () => {
      const { container } = render(<PreSelectedCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(input).toHaveAttribute('aria-expanded', 'true');
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(screen.getByText('Option A')).toBeInTheDocument();
    });
    it('should open when typing starts', () => {
      const { container } = render(<PreSelectedCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.change(input, { target: { value: '123456789' } });
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
    it('should already have a selected item', () => {
      const { container } = render(<PreSelectedCombobox />);
      const input = container.querySelector('input')!;
      expect(input).toHaveValue('Option A');
    });
    it('should return the correct state reducer', () => {
      const result = preSelectedStateReducer<boolean>(
        { highlightedIndex: 0, selectedItem: null, isOpen: false, inputValue: '' },
        { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes: { highlightedIndex: 1 } }
      );
      expect(result.highlightedIndex).toEqual(0);
    });
    it('should return the correct item string', () => {
      const result = preSelectedToString({ value: 'test' });
      const result2 = preSelectedToString(null);
      expect(result).toEqual('test');
      expect(result2).toEqual('');
    });
  });
  describe('inline message combobox', () => {
    it('should render correctly', async () => {
      const { container } = render(<InlineMessageCombobox />);
      await act(async () => {});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
    it('should render state correctly', () => {
      const { container } = render(<InlineMessageCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(input).toHaveAttribute('aria-expanded', 'true');
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(screen.getByText('Option A')).toBeInTheDocument();
    });
    it('should open when typing starts', () => {
      const { container } = render(<InlineMessageCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.change(input, { target: { value: '123456789' } });
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
    it('should return the correct state reducer', () => {
      const result = inlineMessageStateReducer<boolean>(
        { highlightedIndex: 0, selectedItem: null, isOpen: false, inputValue: '' },
        { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes: { highlightedIndex: 1 } }
      );
      expect(result.highlightedIndex).toEqual(0);
    });
    it('should return the correct item string', () => {
      const result = inlineMessageToString({ value: 'test' });
      const result2 = inlineMessageToString(null);
      expect(result).toEqual('test');
      expect(result2).toEqual('');
    });
  });
  describe('error combobox', () => {
    it('should render correctly', async () => {
      const { container } = render(<ErrorCombobox />);
      await act(async () => {});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
    it('should render state correctly', () => {
      const { container } = render(<ErrorCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(input).toHaveAttribute('aria-expanded', 'true');
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(screen.getByText('Option A')).toBeInTheDocument();
    });
    it('should show error empty submit', () => {
      render(<ErrorCombobox />);
      const submitButton = screen.getByText('Submit')!;
      fireEvent.click(submitButton);
      expect(screen.queryByText('This is required text that describes the error in more detail.')).toBeInTheDocument();
    });
    it('should not show error after item selected', () => {
      const { container } = render(<ErrorCombobox />);
      const input = container.querySelector('input')!;
      const submitButton = screen.getByText('Submit')!;
      fireEvent.click(submitButton);
      fireEvent.change(input, { target: { value: 'Option A' } });
      const optionA = screen.getByText('Option A');
      fireEvent.click(optionA);
      fireEvent.click(submitButton);
      expect(
        screen.queryByText('This is required text that describes the error in more detail.')
      ).not.toBeInTheDocument();
    });
    it('should clear combobox', () => {
      const { container } = render(<ErrorCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.change(input, { target: { value: 'Option A' } });
      const resetButton = screen.getByText('Reset')!;
      fireEvent.click(resetButton);
      expect(input.value).toBe('');
    });
    it('should return the correct state reducer', () => {
      const result = errorStateReducer<boolean>(
        { highlightedIndex: 0, selectedItem: null, isOpen: false, inputValue: '' },
        { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes: { highlightedIndex: 1 } }
      );
      expect(result.highlightedIndex).toEqual(0);
    });
    it('should return the correct item string', () => {
      const result = errorToString({ value: 'test' });
      const result2 = errorToString(null);
      expect(result).toEqual('test');
      expect(result2).toEqual('');
    });
  });
  describe('clear button combobox', () => {
    it('should render correctly', async () => {
      const { container } = render(<ClearButtonCombobox />);
      await act(async () => {});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
    it('should render state correctly', () => {
      const { container } = render(<ClearButtonCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(input).toHaveAttribute('aria-expanded', 'true');
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(screen.getByText('Option A')).toBeInTheDocument();
    });
    it('should clear combobox', () => {
      const { container } = render(<ClearButtonCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.change(input, { target: { value: 'O' } });
      const clearButton = container.querySelector('[aria-label="clear"]')!;
      fireEvent.click(clearButton);
      expect(input.value).toBe('');
    });
    it('should hide clear button on blur', () => {
      const { container } = render(<ClearButtonCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.focus(input);
      const clearButton = container.querySelector('[aria-label="clear"]')!;
      fireEvent.change(input, { target: { value: 'O' } });
      expect(clearButton).toBeInTheDocument();
      fireEvent.blur(input);
      expect(clearButton).not.toBeInTheDocument();
    });
    it('should return the correct state reducer', () => {
      const result = clearStateReducer<boolean>(
        { highlightedIndex: 0, selectedItem: null, isOpen: false, inputValue: '' },
        { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes: { highlightedIndex: 1 } }
      );
      expect(result.highlightedIndex).toEqual(0);
    });
    it('should return the correct item string', () => {
      const result = clearToString({ value: 'test' });
      const result2 = clearToString(null);
      expect(result).toEqual('test');
      expect(result2).toEqual('');
    });
  });
  describe('leading icon combobox', () => {
    it('should render correctly', async () => {
      const { container } = render(<LeadingIconCombobox />);
      await act(async () => {});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
    it('should render state correctly', () => {
      const { container } = render(<LeadingIconCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(input).toHaveAttribute('aria-expanded', 'true');
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(screen.getByText('Option A')).toBeInTheDocument();
    });
    it('should open when typing starts', () => {
      const { container } = render(<LeadingIconCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.change(input, { target: { value: '123456789' } });
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
    it('should return the correct state reducer', () => {
      const result = leadingIconStateReducer<boolean>(
        { highlightedIndex: 0, selectedItem: null, isOpen: false, inputValue: '' },
        { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes: { highlightedIndex: 1 } }
      );
      expect(result.highlightedIndex).toEqual(0);
    });
    it('should return the correct item string', () => {
      const result = leadingIconToString({ value: 'test' });
      const result2 = leadingIconToString(null);
      expect(result).toEqual('test');
      expect(result2).toEqual('');
    });
  });
  describe('read-only combobox', () => {
    it('should render correctly', async () => {
      const { container } = render(<ReadOnlyCombobox />);
      await act(async () => {});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
    it('should return the correct item string', () => {
      const result = readOnlyToString({ value: 'test' });
      const result2 = readOnlyToString(null);
      expect(result).toEqual('test');
      expect(result2).toEqual('');
    });
  });
  describe('disabled combobox', () => {
    it('should render correctly', async () => {
      const { container } = render(<DisabledCombobox />);
      await act(async () => {});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
    it('should return the correct item string', () => {
      const result = disabledToString({ value: 'test' });
      const result2 = disabledToString(null);
      expect(result).toEqual('test');
      expect(result2).toEqual('');
    });
  });
  describe('combobox without chevron icon', () => {
    it('should render correctly', async () => {
      const { container } = render(<NoIconCombobox />);
      await act(async () => {});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
    it('should render state correctly', () => {
      const { container } = render(<NoIconCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(input).toHaveAttribute('aria-expanded', 'true');
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(screen.getByText('Option A')).toBeInTheDocument();
    });
    it('should open when typing starts', () => {
      const { container } = render(<NoIconCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.change(input, { target: { value: '123456789' } });
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
    it('should return the correct state reducer', () => {
      const result = noIconStateReducer<boolean>(
        { highlightedIndex: 0, selectedItem: null, isOpen: false, inputValue: '' },
        { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes: { highlightedIndex: 1 } }
      );
      expect(result.highlightedIndex).toEqual(0);
    });
    it('should return the correct item string', () => {
      const result = noIconToString({ value: 'test' });
      const result2 = noIconToString(null);
      expect(result).toEqual('test');
      expect(result2).toEqual('');
    });
  });
  describe('combobox with item disabled', () => {
    it('should render correctly', async () => {
      const { container } = render(<ItemDisabledCombobox />);
      await act(async () => {});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
    it('should render state correctly', () => {
      const { container } = render(<ItemDisabledCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(input).toHaveAttribute('aria-expanded', 'true');
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(screen.getByText('Option A')).toBeInTheDocument();
    });
    it('should open when typing starts', () => {
      const { container } = render(<ItemDisabledCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.change(input, { target: { value: '123456789' } });
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
    it('should return the correct state reducer', () => {
      const result = itemDisabledStateReducer<boolean>(
        { highlightedIndex: 0, selectedItem: null, isOpen: false, inputValue: '' },
        { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes: { highlightedIndex: 1 } }
      );
      expect(result.highlightedIndex).toEqual(0);
    });
    it('should return the correct item string', () => {
      const result = itemDisabledToString({ value: 'test' });
      const result2 = itemDisabledToString(null);
      expect(result).toEqual('test');
      expect(result2).toEqual('');
    });
  });

  describe('autocomplete with auto selection', () => {
    it('should render correctly', async () => {
      const { container } = render(<AutocompleteWithAutomaticSelectionCombobox />);
      await act(async () => {});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
    it('should open when typing a known selection', () => {
      const { container } = render(<AutocompleteWithAutomaticSelectionCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.change(input, { target: { value: 'Option A' } });
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
    it('should closed when typing an unknown selection', () => {
      const { container } = render(<AutocompleteWithAutomaticSelectionCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.change(input, { target: { value: '123456789' } });
      expect(input).toHaveAttribute('aria-expanded', 'false');
    });
    it('should return the correct state reducer', () => {
      const result = autoAutocompleteStateReducer<boolean>(
        { highlightedIndex: 0, selectedItem: null, isOpen: false, inputValue: '' },
        { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes: { highlightedIndex: 1 } }
      );
      expect(result.highlightedIndex).toEqual(0);
    });
    it('should return the correct item string', () => {
      const result = autoAutocompleteToString({ value: 'test' });
      const result2 = autoAutocompleteToString(null);
      expect(result).toEqual('test');
      expect(result2).toEqual('');
    });

    it('should filter correctly', () => {
      const result = autoAutocompleteFilter({ value: 'test' }, 'test');
      const result2 = autoAutocompleteFilter({ value: 'test' }, 'text');
      expect(result).toEqual(true);
      expect(result2).toEqual(false);
    });

    it('should filter correctly with undefined input value', () => {
      const result = autoAutocompleteFilter({ value: 'test' });
      expect(result).toEqual(true);
    });
  });
  describe('autocomplete with manual selection', () => {
    it('should render correctly', async () => {
      const { container } = render(<AutocompleteWithManualSelectionCombobox />);
      await act(async () => {});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
    it('should render state correctly', () => {
      const { container } = render(<AutocompleteWithManualSelectionCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(input).toHaveAttribute('aria-expanded', 'true');
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(screen.getByText('Option A')).toBeInTheDocument();
    });
    it('should open when typing a known selection', () => {
      const { container } = render(<AutocompleteWithManualSelectionCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.change(input, { target: { value: 'Option A' } });
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
    it('should closed when typing a known selection', () => {
      const { container } = render(<AutocompleteWithManualSelectionCombobox />);
      const input = container.querySelector('input')!;
      fireEvent.change(input, { target: { value: '123456789' } });
      expect(input).toHaveAttribute('aria-expanded', 'false');
    });
    it('should return the correct state reducer', () => {
      const result = manualAutocompleteStateReducer<boolean>(
        { highlightedIndex: 0, selectedItem: null, isOpen: false, inputValue: '' },
        { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes: { highlightedIndex: 1 } }
      );
      expect(result.highlightedIndex).toEqual(0);
    });
    it('should return the correct item string', () => {
      const result = manualAutocompleteToString({ value: 'test' });
      const result2 = manualAutocompleteToString(null);
      expect(result).toEqual('test');
      expect(result2).toEqual('');
    });

    it('should filter correctly', () => {
      const result = manualAutocompleteFilter({ value: 'test' }, 'test');
      const result2 = manualAutocompleteFilter({ value: 'test' }, 'text');
      expect(result).toEqual(true);
      expect(result2).toEqual(false);
    });

    it('should filter correctly with undefined input value', () => {
      const result = manualAutocompleteFilter({ value: 'test' });
      expect(result).toEqual(true);
    });
  });
});
