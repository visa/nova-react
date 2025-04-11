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
import { useCombobox, UseComboboxStateChangeTypes } from 'downshift';
import { axe } from 'jest-axe';
import {
  DefaultMultiselect,
  comboboxStateReducer as defaultMultiselectComboboxStateReducer,
} from './default-multiselect';
import { DisabledMultiselect, comboboxStateReducer as disabledMultiselectComboboxReducer } from './disabled-multiselect';
import metaData from './meta.json';
import { MultiselectWithDisabledOption, comboboxStateReducer as disabledOptionComboboxReducer } from './multiselect-with-disabled-option';
import { MultiselectWithError, comboboxStateReducer as errorComboboxReducer } from './multiselect-with-error';
import { MultiselectWithFilterableMenuAndAutomaticSelection, comboboxStateReducer as automaticFilterComboboxReducer } from './multiselect-with-filterable-menu-and-automatic-selection';
import { MultiselectWithFilterableMenuAndManualSelection, comboboxStateReducer as manualFilterComboboxReducer } from './multiselect-with-filterable-menu-and-manual-selection';
import {
  MultiselectWithInlineMessage,
  comboboxStateReducer as inlineMessageComboboxReducer,
} from './multiselect-with-inline-message';
import { MultiselectWithMultipleSelectionsAndVerticalScroll, comboboxStateReducer as multipleSelectionAndScrollComboboxReducer } from './multiselect-with-multiple-selections-and-vertical-scroll';
import { MultiselectWithScrollbar, comboboxStateReducer as withScrollbarComboboxReducer } from './multiselect-with-scrollbar';
import { MultiselectWithSelectAndUnselectAllButtons, comboboxStateReducer as selectAllUnselectAllComboboxReducer } from './multiselect-with-select-and-unselect-all-buttons';
import { MultiselectWithoutDropdownChevron, comboboxStateReducer as withoutChevronComboboxReducer } from './multiselect-without-dropdown-chevron';
import { ReadOnlyMultiselect } from './read-only-multiselect';

const examples = [
  { Component: DefaultMultiselect, title: metaData['default-multiselect'].title },
  { Component: MultiselectWithInlineMessage, title: metaData['multiselect-with-inline-message'].title },
  { Component: MultiselectWithError, title: metaData['multiselect-with-error'].title },
  { Component: MultiselectWithDisabledOption, title: metaData['multiselect-with-disabled-option'].title },
  { Component: DisabledMultiselect, title: metaData['disabled-multiselect'].title },
  { Component: ReadOnlyMultiselect, title: metaData['read-only-multiselect'].title },
  { Component: MultiselectWithoutDropdownChevron, title: metaData['multiselect-without-dropdown-chevron'].title },
  {
    Component: MultiselectWithMultipleSelectionsAndVerticalScroll,
    title: metaData['multiselect-with-multiple-selections-and-vertical-scroll'].title,
  },
  {
    Component: MultiselectWithSelectAndUnselectAllButtons,
    title: metaData['multiselect-with-select-and-unselect-all-buttons'].title,
  },
  { Component: MultiselectWithScrollbar, title: metaData['multiselect-with-scrollbar'].title },
  {
    Component: MultiselectWithFilterableMenuAndManualSelection,
    title: metaData['multiselect-with-filterable-menu-and-manual-selection'].title,
  },
  {
    Component: MultiselectWithFilterableMenuAndAutomaticSelection,
    title: metaData['multiselect-with-filterable-menu-and-automatic-selection'].title,
  },
];

describe('Multiselect examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('default-multiselect', () => {
    describe('defaultMultiselectComboboxStateReducer', () => {
      it('should return the same state when InputClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = defaultMultiselectComboboxStateReducer(state, {
          type: useCombobox.stateChangeTypes.InputClick,
          changes,
        });

        expect(newState).toEqual(state);
      });

      it('should keep highlightedIndex when InputChange action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { isOpen: true };
        const newState = defaultMultiselectComboboxStateReducer(state, {
          type: useCombobox.stateChangeTypes.InputChange,
          changes,
        });
        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });

      it('should keep highlightedIndex when ItemMouseMove action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = defaultMultiselectComboboxStateReducer(state, {
          type: useCombobox.stateChangeTypes.ItemMouseMove,
          changes,
        });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });
      it('should update state with changes but keep highlightedIndex when MenuMouseLeave action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = defaultMultiselectComboboxStateReducer(state, { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });

      it('should keep the menu open and maintain highlightedIndex when InputKeyDownEnter action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = defaultMultiselectComboboxStateReducer(state, { type: useCombobox.stateChangeTypes.InputKeyDownEnter, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });

      it('should keep the menu open and maintain highlightedIndex when ItemClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = defaultMultiselectComboboxStateReducer(state, { type: useCombobox.stateChangeTypes.ItemClick, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });

      it('should return changes as default when unknown action type is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = defaultMultiselectComboboxStateReducer(state, { type: 'unknown_action_type' as UseComboboxStateChangeTypes, changes });

        expect(newState).toEqual(changes);
      });
    });
    describe('default-multiselect behavior', () => {
      it('should toggle the selected item after clicking the item', () => {
        const { container } = render(<DefaultMultiselect />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        const optionAItem = screen.getAllByText('Option A').find(item => item.tagName === 'LI')!;
        fireEvent.click(optionAItem);
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.click(optionAItem);
        expect(inputContainer).toHaveTextContent('');
      });
      it('should open when typing starts', () => {
        const { container } = render(<DefaultMultiselect />);
        const input = container.querySelector('input')!;
        fireEvent.change(input, { target: { value: '123456789' } });
        expect(input).toHaveAttribute('aria-expanded', 'true');
      });
      it('should remove the selected item by highlighting it and hitting Enter again', () => {
        const { container } = render(<DefaultMultiselect />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(inputContainer).toHaveTextContent('');
      });
      it('should remove the selected item after clicking the remove button', () => {
        const { container } = render(<DefaultMultiselect />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        const removeButton = container.querySelector('button[aria-label="Remove Option A"]')!;
        fireEvent.click(removeButton);
        expect(inputContainer).toHaveTextContent('');
      });
      it('toggle an item from the listbox using a keyboard', () => {
        const { container } = render(<DefaultMultiselect />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Backspace' });
        expect(inputContainer).toHaveTextContent('');
      });
    });
  });

  describe('multiselect-with-inline-message', () => {
    describe('comboboxStateReducer', () => {
      it('should return the same state when InputClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = inlineMessageComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputClick,
          changes,
        });

        expect(newState).toEqual(state);
      });

      it('should keep highlightedIndex when InputChange action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { isOpen: true };
        const newState = inlineMessageComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputChange,
          changes,
        });
        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });

      it('should keep highlightedIndex when ItemMouseMove action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = inlineMessageComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.ItemMouseMove,
          changes,
        });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });
      it('should update state with changes but keep highlightedIndex when MenuMouseLeave action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = inlineMessageComboboxReducer(state, { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });
      it('should keep the menu open and maintain highlightedIndex when InputKeyDownEnter action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = inlineMessageComboboxReducer(state, { type: useCombobox.stateChangeTypes.InputKeyDownEnter, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });
      it('should keep the menu open and maintain highlightedIndex when ItemClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = inlineMessageComboboxReducer(state, { type: useCombobox.stateChangeTypes.ItemClick, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });
      it('should return changes as default when unknown action type is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = inlineMessageComboboxReducer(state, { type: 'unknown_action_type' as UseComboboxStateChangeTypes, changes });

        expect(newState).toEqual(changes);
      });
    });
    describe('inline-message-multiselect behavior', () => {
      it('should toggle the selected item after clicking the item', () => {
        const { container } = render(<MultiselectWithInlineMessage />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        const optionAItem = screen.getAllByText('Option A').find(item => item.tagName === 'LI')!;
        fireEvent.click(optionAItem);
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.click(optionAItem);
        expect(inputContainer).toHaveTextContent('');
      });
      it('should open when typing starts', () => {
        const { container } = render(<MultiselectWithInlineMessage />);
        const input = container.querySelector('input')!;
        fireEvent.change(input, { target: { value: '123456789' } });
        expect(input).toHaveAttribute('aria-expanded', 'true');
      });
      it('should remove the selected item by highlighting it and hitting Enter again', () => {
        const { container } = render(<MultiselectWithInlineMessage />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(inputContainer).toHaveTextContent('');
      });
      it('should remove the selected item after clicking the remove button', () => {
        const { container } = render(<MultiselectWithInlineMessage />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        const removeButton = container.querySelector('button[aria-label="Remove Option A"]')!;
        fireEvent.click(removeButton);
        expect(inputContainer).toHaveTextContent('');
      });
      it('toggle an item from the listbox using a keyboard', () => {
        const { container } = render(<MultiselectWithInlineMessage />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Backspace' });
        expect(inputContainer).toHaveTextContent('');
      });
    });
  });

  describe('multiselect-with-error', () => {
    describe('comboboxStateReducer', () => {
      it('should return the same state when InputClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = errorComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputClick,
          changes,
        });

        expect(newState).toEqual(state);
      });

      it('should keep highlightedIndex when InputChange action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { isOpen: true };
        const newState = errorComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputChange,
          changes,
        });
        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });

      it('should keep highlightedIndex when ItemMouseMove action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = errorComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.ItemMouseMove,
          changes,
        });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });
      it('should update state with changes but keep highlightedIndex when MenuMouseLeave action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = errorComboboxReducer(state, { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });
      it('should keep the menu open and maintain highlightedIndex when InputKeyDownEnter action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = errorComboboxReducer(state, { type: useCombobox.stateChangeTypes.InputKeyDownEnter, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });
      it('should keep the menu open and maintain highlightedIndex when ItemClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = errorComboboxReducer(state, { type: useCombobox.stateChangeTypes.ItemClick, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });
      it('should return changes as default when unknown action type is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = errorComboboxReducer(state, { type: 'unknown_action_type' as UseComboboxStateChangeTypes, changes });

        expect(newState).toEqual(changes);
      });
    });
    describe('multiselect-with-error behavior', () => {
      it('should toggle the selected item after clicking the item', () => {
        const { container } = render(<MultiselectWithError />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        const optionAItem = screen.getAllByText('Option A').find(item => item.tagName === 'LI')!;
        fireEvent.click(optionAItem);
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.click(optionAItem);
        expect(inputContainer).toHaveTextContent('');
      });
      it('should open when typing starts', () => {
        const { container } = render(<MultiselectWithError />);
        const input = container.querySelector('input')!;
        fireEvent.change(input, { target: { value: '123456789' } });
        expect(input).toHaveAttribute('aria-expanded', 'true');
      });
      it('should remove the selected item by highlighting it and hitting Enter again', () => {
        const { container } = render(<MultiselectWithError />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(inputContainer).toHaveTextContent('');
      });
      it('should remove the selected item after clicking the remove button', () => {
        const { container } = render(<MultiselectWithError />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        const removeButton = container.querySelector('button[aria-label="Remove Option A"]')!;
        fireEvent.click(removeButton);
        expect(inputContainer).toHaveTextContent('');
      });
      it('toggle an item from the listbox using a keyboard', () => {
        const { container } = render(<MultiselectWithError />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Backspace' });
        expect(inputContainer).toHaveTextContent('');
      });
      it('shows an error on submit when no selection is made, and resets errored state when reset is clicked', () => {
        const { container } = render(<MultiselectWithError />);
        const input = container.querySelector('input')!;
        const submitButton = container.querySelector('#multiselect-with-error-submit-button')!;
        fireEvent.click(submitButton);
        expect(input.getAttribute('aria-invalid')).toBe("true");

        const resetButton = container.querySelector('#multiselect-with-error-reset-button')!;
        fireEvent.click(resetButton);
        expect(input.getAttribute('aria-invalid')).toBe("false");
      });
    });
  })
  describe('multiselect-with-disabled-option', () => {
    describe('comboboxStateReducer', () => {
      it('should return the same state when InputClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = disabledOptionComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputClick,
          changes,
        });

        expect(newState).toEqual(state);
      });

      it('should keep highlightedIndex when InputChange action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { isOpen: true };
        const newState = disabledOptionComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputChange,
          changes,
        });
        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });

      it('should keep highlightedIndex when ItemMouseMove action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = disabledOptionComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.ItemMouseMove,
          changes,
        });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });
      it('should update state with changes but keep highlightedIndex when MenuMouseLeave action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = disabledOptionComboboxReducer(state, { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });
      it('should keep the menu open and maintain highlightedIndex when InputKeyDownEnter action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = disabledOptionComboboxReducer(state, { type: useCombobox.stateChangeTypes.InputKeyDownEnter, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });
      it('should keep the menu open and maintain highlightedIndex when ItemClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = disabledOptionComboboxReducer(state, { type: useCombobox.stateChangeTypes.ItemClick, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });
      it('should return changes as default when unknown action type is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = disabledOptionComboboxReducer(state, { type: 'unknown_action_type' as UseComboboxStateChangeTypes, changes });

        expect(newState).toEqual(changes);
      });
    });
    describe('disabled-option-multiselect behavior', () => {
      it('should toggle the selected item after clicking the item', () => {
        const { container } = render(<MultiselectWithDisabledOption />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        const optionAItem = screen.getAllByText('Option A').find(item => item.tagName === 'LI')!;
        fireEvent.click(optionAItem);
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.click(optionAItem);
        expect(inputContainer).toHaveTextContent('');
      });
      it('should open when typing starts', () => {
        const { container } = render(<MultiselectWithDisabledOption />);
        const input = container.querySelector('input')!;
        fireEvent.change(input, { target: { value: '123456789' } });
        expect(input).toHaveAttribute('aria-expanded', 'true');
      });
      it('should remove the selected item by highlighting it and hitting Enter again', () => {
        const { container } = render(<MultiselectWithDisabledOption />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(inputContainer).toHaveTextContent('');
      });
      it('should remove the selected item after clicking the remove button', () => {
        const { container } = render(<MultiselectWithDisabledOption />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        const removeButton = container.querySelector('button[aria-label="Remove Option A"]')!;
        fireEvent.click(removeButton);
        expect(inputContainer).toHaveTextContent('');
      });
      it('toggle an item from the listbox using a keyboard', () => {
        const { container } = render(<MultiselectWithDisabledOption />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Backspace' });
        expect(inputContainer).toHaveTextContent('');
      });
    });
  })
  describe('disabled-multiselect', () => {
    describe('comboboxStateReducer', () => {
      it('should return the same state when InputClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = disabledMultiselectComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputClick,
          changes,
        });

        expect(newState).toEqual(state);
      });

      it('should keep highlightedIndex when InputChange action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { isOpen: true };
        const newState = disabledMultiselectComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputChange,
          changes,
        });
        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });

      it('should keep highlightedIndex when ItemMouseMove action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = disabledMultiselectComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.ItemMouseMove,
          changes,
        });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });
      it('should update state with changes but keep highlightedIndex when MenuMouseLeave action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = disabledMultiselectComboboxReducer(state, { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });
      it('should keep the menu open and maintain highlightedIndex when InputKeyDownEnter action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = disabledMultiselectComboboxReducer(state, { type: useCombobox.stateChangeTypes.InputKeyDownEnter, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });
      it('should keep the menu open and maintain highlightedIndex when ItemClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = disabledMultiselectComboboxReducer(state, { type: useCombobox.stateChangeTypes.ItemClick, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });
      it('should return changes as default when unknown action type is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true }; const newState = disabledMultiselectComboboxReducer(state, { type: 'unknown_action_type' as UseComboboxStateChangeTypes, changes });

        expect(newState).toEqual(changes);
      });
    });
    describe('disabled-multiselect behavior', () => {
      it('should render a disabled input by default', () => {
        const { container } = render(<DisabledMultiselect />);
        const input: HTMLInputElement = container.querySelector('input[role="combobox"]')!;
        expect(input.disabled).toBe(true);
      });
      it('when enabled, should toggle the selected item after clicking the item', () => {
        const { container } = render(<DisabledMultiselect />);

        // enable the input, then test the functionality
        const checkbox: HTMLInputElement = container.querySelector('input[type="checkbox"]')!;
        fireEvent.click(checkbox);

        const input: HTMLInputElement = container.querySelector('input[role="combobox"]')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        const optionAItem = screen.getAllByText('Option A').find(item => item.tagName === 'LI')!;
        fireEvent.click(optionAItem);
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.click(optionAItem);
        expect(inputContainer).toHaveTextContent('');
      });
      it('when enabled, should open when typing starts', () => {
        const { container } = render(<DisabledMultiselect />);

        // enable the input, then test the functionality
        const checkbox: HTMLInputElement = container.querySelector('input[type="checkbox"]')!;
        fireEvent.click(checkbox);

        const input: HTMLInputElement = container.querySelector('input[role="combobox"]')!;
        fireEvent.change(input, { target: { value: '123456789' } });
        expect(input).toHaveAttribute('aria-expanded', 'true');
      });
      it('when enabled, should remove the selected item by highlighting it and hitting Enter again', () => {
        const { container } = render(<DisabledMultiselect />);

        // enable the input, then test the functionality
        const checkbox: HTMLInputElement = container.querySelector('input[type="checkbox"]')!;
        fireEvent.click(checkbox);

        const input: HTMLInputElement = container.querySelector('input[role="combobox"]')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(inputContainer).toHaveTextContent('');
      });
      it('when enabled, should remove the selected item after clicking the remove button', () => {
        const { container } = render(<DisabledMultiselect />);

        // enable the input, then test the functionality
        const checkbox: HTMLInputElement = container.querySelector('input[type="checkbox"]')!;
        fireEvent.click(checkbox);

        const input: HTMLInputElement = container.querySelector('input[role="combobox"]')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        const removeButton = container.querySelector('button[aria-label="Remove Option A"]')!;
        fireEvent.click(removeButton);
        expect(inputContainer).toHaveTextContent('');
      });
      it('when enabled, toggle an item from the listbox using a keyboard', () => {
        const { container } = render(<DisabledMultiselect />);

        // enable the input, then test the functionality
        const checkbox: HTMLInputElement = container.querySelector('input[type="checkbox"]')!;
        fireEvent.click(checkbox);

        const input: HTMLInputElement = container.querySelector('input[role="combobox"]')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Backspace' });
        expect(inputContainer).toHaveTextContent('');
      });
    });
  })
  describe('read-only-multiselect', () => {
    describe('comboboxStateReducer', () => {
      it('should return the same state when InputClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = disabledMultiselectComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputClick,
          changes,
        });

        expect(newState).toEqual(state);
      });

      it('should keep highlightedIndex when InputChange action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { isOpen: true };
        const newState = disabledMultiselectComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputChange,
          changes,
        });
        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });

      it('should keep highlightedIndex when ItemMouseMove action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = disabledMultiselectComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.ItemMouseMove,
          changes,
        });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });
      it('should update state with changes but keep highlightedIndex when MenuMouseLeave action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = disabledMultiselectComboboxReducer(state, { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });
      it('should keep the menu open and maintain highlightedIndex when InputKeyDownEnter action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = disabledMultiselectComboboxReducer(state, { type: useCombobox.stateChangeTypes.InputKeyDownEnter, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });
      it('should keep the menu open and maintain highlightedIndex when ItemClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = disabledMultiselectComboboxReducer(state, { type: useCombobox.stateChangeTypes.ItemClick, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });
      it('should return changes as default when unknown action type is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true }; const newState = disabledMultiselectComboboxReducer(state, { type: 'unknown_action_type' as UseComboboxStateChangeTypes, changes });

        expect(newState).toEqual(changes);
      });
    });
    describe('read-only-multiselect behavior', () => {
      it('should render a disabled input by default', () => {
        const { container } = render(<ReadOnlyMultiselect />);
        const input: HTMLInputElement = container.querySelector('input[role="combobox"]')!;
        expect(input.readOnly).toBe(true);
      });
      it('when enabled, should toggle the selected item after clicking the item', () => {
        const { container } = render(<ReadOnlyMultiselect />);

        // enable the input, then test the functionality
        const checkbox: HTMLInputElement = container.querySelector('input[type="checkbox"]')!;
        fireEvent.click(checkbox);

        const input: HTMLInputElement = container.querySelector('input[role="combobox"]')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        const optionAItem = screen.getAllByText('Option A').find(item => item.tagName === 'LI')!;
        fireEvent.click(optionAItem);
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.click(optionAItem);
        expect(inputContainer).toHaveTextContent('');
      });
      it('when enabled, should open when typing starts', () => {
        const { container } = render(<ReadOnlyMultiselect />);

        // enable the input, then test the functionality
        const checkbox: HTMLInputElement = container.querySelector('input[type="checkbox"]')!;
        fireEvent.click(checkbox);

        const input: HTMLInputElement = container.querySelector('input[role="combobox"]')!;
        fireEvent.change(input, { target: { value: '123456789' } });
        expect(input).toHaveAttribute('aria-expanded', 'true');
      });
      it('when enabled, should remove the selected item by highlighting it and hitting Enter again', () => {
        const { container } = render(<ReadOnlyMultiselect />);

        // enable the input, then test the functionality
        const checkbox: HTMLInputElement = container.querySelector('input[type="checkbox"]')!;
        fireEvent.click(checkbox);

        const input: HTMLInputElement = container.querySelector('input[role="combobox"]')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(inputContainer).toHaveTextContent('');
      });
      it('when enabled, should remove the selected item after clicking the remove button', () => {
        const { container } = render(<ReadOnlyMultiselect />);

        // enable the input, then test the functionality
        const checkbox: HTMLInputElement = container.querySelector('input[type="checkbox"]')!;
        fireEvent.click(checkbox);

        const input: HTMLInputElement = container.querySelector('input[role="combobox"]')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        const removeButton = container.querySelector('button[aria-label="Remove Option A"]')!;
        fireEvent.click(removeButton);
        expect(inputContainer).toHaveTextContent('');
      });
      it('when enabled, toggle an item from the listbox using a keyboard', () => {
        const { container } = render(<ReadOnlyMultiselect />);

        // enable the input, then test the functionality
        const checkbox: HTMLInputElement = container.querySelector('input[type="checkbox"]')!;
        fireEvent.click(checkbox);

        const input: HTMLInputElement = container.querySelector('input[role="combobox"]')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Backspace' });
        expect(inputContainer).toHaveTextContent('');
      });
    });
  })

  describe('without-chevron-multiselect', () => {
    describe('withoutChevronComboboxReducer', () => {
      it('should return the same state when InputClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = withoutChevronComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputClick,
          changes,
        });

        expect(newState).toEqual(state);
      });

      it('should keep highlightedIndex when InputChange action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { isOpen: true };
        const newState = withoutChevronComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputChange,
          changes,
        });
        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });

      it('should keep highlightedIndex when ItemMouseMove action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = withoutChevronComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.ItemMouseMove,
          changes,
        });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });
      it('should update state with changes but keep highlightedIndex when MenuMouseLeave action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = withoutChevronComboboxReducer(state, { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });

      it('should keep the menu open and maintain highlightedIndex when InputKeyDownEnter action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = withoutChevronComboboxReducer(state, { type: useCombobox.stateChangeTypes.InputKeyDownEnter, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });

      it('should keep the menu open and maintain highlightedIndex when ItemClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = withoutChevronComboboxReducer(state, { type: useCombobox.stateChangeTypes.ItemClick, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });

      it('should return changes as default when unknown action type is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = withoutChevronComboboxReducer(state, { type: 'unknown_action_type' as UseComboboxStateChangeTypes, changes });

        expect(newState).toEqual(changes);
      });
    });
    describe('without-chevron multiselect behavior', () => {

      it('should toggle the selected item after clicking the item', () => {
        const { container } = render(<MultiselectWithoutDropdownChevron />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        const optionAItem = screen.getAllByText('Option A').find(item => item.tagName === 'LI')!;
        fireEvent.click(optionAItem);
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.click(optionAItem);
        expect(inputContainer).toHaveTextContent('');
      });
      it('should open when typing starts', () => {
        const { container } = render(<MultiselectWithoutDropdownChevron />);
        const input = container.querySelector('input')!;
        fireEvent.change(input, { target: { value: '123456789' } });
        expect(input).toHaveAttribute('aria-expanded', 'true');
      });
      it('should remove the selected item by highlighting it and hitting Enter again', () => {
        const { container } = render(<MultiselectWithoutDropdownChevron />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(inputContainer).toHaveTextContent('');
      });
      it('should remove the selected item after clicking the remove button', () => {
        const { container } = render(<MultiselectWithoutDropdownChevron />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        const removeButton = container.querySelector('button[aria-label="Remove Option A"]')!;
        fireEvent.click(removeButton);
        expect(inputContainer).toHaveTextContent('');
      });
      it('toggle an item from the listbox using a keyboard', () => {
        const { container } = render(<MultiselectWithoutDropdownChevron />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Backspace' });
        expect(inputContainer).toHaveTextContent('');
      });
    });
  });
  describe('multiple-selection-and-scroll-multiselect', () => {
    describe('multipleSelectionAndScrollComboboxReducer', () => {
      it('should return the same state when InputClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = multipleSelectionAndScrollComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputClick,
          changes,
        });

        expect(newState).toEqual(state);
      });

      it('should keep highlightedIndex when InputChange action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { isOpen: true };
        const newState = multipleSelectionAndScrollComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputChange,
          changes,
        });
        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });

      it('should keep highlightedIndex when ItemMouseMove action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = multipleSelectionAndScrollComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.ItemMouseMove,
          changes,
        });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });
      it('should update state with changes but keep highlightedIndex when MenuMouseLeave action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = multipleSelectionAndScrollComboboxReducer(state, { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });

      it('should keep the menu open and maintain highlightedIndex when InputKeyDownEnter action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = multipleSelectionAndScrollComboboxReducer(state, { type: useCombobox.stateChangeTypes.InputKeyDownEnter, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });

      it('should keep the menu open and maintain highlightedIndex when ItemClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = multipleSelectionAndScrollComboboxReducer(state, { type: useCombobox.stateChangeTypes.ItemClick, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });

      it('should return changes as default when unknown action type is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = multipleSelectionAndScrollComboboxReducer(state, { type: 'unknown_action_type' as UseComboboxStateChangeTypes, changes });

        expect(newState).toEqual(changes);
      });
    });
    describe('multiple-selection-and-scroll multiselect behavior', () => {

      it('should toggle the selected item after clicking the item', () => {
        const { container } = render(<MultiselectWithMultipleSelectionsAndVerticalScroll />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        const optionAItem = screen.getAllByText('Option A').find(item => item.tagName === 'LI')!;
        fireEvent.click(optionAItem);
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).not.toHaveTextContent('Option A');
        expect(inputContainer).toHaveTextContent('Option BOption COption DOption EOption FOption GOption HOption IOption JOption KOption L');
        fireEvent.click(optionAItem);
        expect(inputContainer).toHaveTextContent('Option BOption COption DOption EOption FOption GOption HOption IOption JOption KOption LOption A');
      });
      it('should open when typing starts', () => {
        const { container } = render(<MultiselectWithMultipleSelectionsAndVerticalScroll />);
        const input = container.querySelector('input')!;
        fireEvent.change(input, { target: { value: '123456789' } });
        expect(input).toHaveAttribute('aria-expanded', 'true');
      });
      it('should remove the selected item by highlighting it and hitting Enter again', () => {
        const { container } = render(<MultiselectWithMultipleSelectionsAndVerticalScroll />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).not.toHaveTextContent('Option A');
        expect(inputContainer).toHaveTextContent('Option B');
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(inputContainer).toHaveTextContent('Option BOption COption DOption EOption FOption GOption HOption IOption JOption KOption LOption A');
      });
      it('should remove the selected item after clicking the remove button', () => {
        const { container } = render(<MultiselectWithMultipleSelectionsAndVerticalScroll />);
        const inputContainer = container.querySelector('.v-input-container')!;
        const removeButton = container.querySelector('button[aria-label="Remove Option A"]')!;
        fireEvent.click(removeButton);
        expect(inputContainer).not.toHaveTextContent('Option A');
        expect(inputContainer).toHaveTextContent('Option BOption COption DOption EOption FOption GOption HOption IOption JOption KOption L');
      });
      it('toggle an item from the listbox using a keyboard', () => {
        const { container } = render(<MultiselectWithMultipleSelectionsAndVerticalScroll />);
        const input = container.querySelector('input')!;
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(inputContainer).not.toHaveTextContent('Option A');
      });
    });
  });

  describe('select-all-unselect-all-multiselect', () => {
    describe('selectAllUnselectAllComboboxReducer', () => {
      it('should return the same state when InputClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = selectAllUnselectAllComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputClick,
          changes,
        });

        expect(newState).toEqual(state);
      });

      it('should keep highlightedIndex when InputChange action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { isOpen: true };
        const newState = selectAllUnselectAllComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputChange,
          changes,
        });
        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });

      it('should keep highlightedIndex when ItemMouseMove action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = selectAllUnselectAllComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.ItemMouseMove,
          changes,
        });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });
      it('should update state with changes but keep highlightedIndex when MenuMouseLeave action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = selectAllUnselectAllComboboxReducer(state, { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });

      it('should keep the menu open and maintain highlightedIndex when InputKeyDownEnter action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = selectAllUnselectAllComboboxReducer(state, { type: useCombobox.stateChangeTypes.InputKeyDownEnter, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });

      it('should keep the menu open and maintain highlightedIndex when ItemClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = selectAllUnselectAllComboboxReducer(state, { type: useCombobox.stateChangeTypes.ItemClick, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });

      it('should return changes as default when unknown action type is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = selectAllUnselectAllComboboxReducer(state, { type: 'unknown_action_type' as UseComboboxStateChangeTypes, changes });

        expect(newState).toEqual(changes);
      });
    });
    describe('select-all-unselect-all-multiselect behavior', () => {

      it('should toggle the selected item after clicking the item', () => {
        const { container } = render(<MultiselectWithSelectAndUnselectAllButtons />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        const optionAItem = screen.getAllByText('Option A').find(item => item.tagName === 'LI')!;
        fireEvent.click(optionAItem);
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.click(optionAItem);
        expect(inputContainer).toHaveTextContent('');
      });
      it('should open when typing starts', () => {
        const { container } = render(<MultiselectWithSelectAndUnselectAllButtons />);
        const input = container.querySelector('input')!;
        fireEvent.change(input, { target: { value: '123456789' } });
        expect(input).toHaveAttribute('aria-expanded', 'true');
      });
      it('should remove the selected item by highlighting it and hitting Enter again', () => {
        const { container } = render(<MultiselectWithSelectAndUnselectAllButtons />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(inputContainer).toHaveTextContent('');
      });
      it('should remove the selected item after clicking the remove button', () => {
        const { container } = render(<MultiselectWithSelectAndUnselectAllButtons />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        const removeButton = container.querySelector('button[aria-label="Remove Option A"]')!;
        fireEvent.click(removeButton);
        expect(inputContainer).toHaveTextContent('');
      });
      it('toggle an item from the listbox using a keyboard', () => {
        const { container } = render(<MultiselectWithSelectAndUnselectAllButtons />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Backspace' });
        expect(inputContainer).toHaveTextContent('');
      });
      it('selects all items when clicking the "Select All" button', () => {
        const { getByText } = render(<MultiselectWithSelectAndUnselectAllButtons />);
        const selectAllButton = getByText('Select All');
        fireEvent.click(selectAllButton);
        const inputContainer = document.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option AOption BOption COption DOption E');
      });
      it('clears all items when clicking the "Clear All" button', () => {
        const { container, getByText } = render(<MultiselectWithSelectAndUnselectAllButtons />);
        const clearAllButton = getByText('Clear All');
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');

        fireEvent.click(clearAllButton);
        expect(inputContainer).not.toHaveTextContent('Option A');
      });
    });
  });


  describe('multiselect-with-scrollbar', () => {
    describe('withScrollbarComboboxReducer', () => {
      it('should return the same state when InputClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = withScrollbarComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputClick,
          changes,
        });

        expect(newState).toEqual(state);
      });

      it('should keep highlightedIndex when InputChange action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { isOpen: true };
        const newState = withScrollbarComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputChange,
          changes,
        });
        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });

      it('should keep highlightedIndex when ItemMouseMove action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = withScrollbarComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.ItemMouseMove,
          changes,
        });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });
      it('should update state with changes but keep highlightedIndex when MenuMouseLeave action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = withScrollbarComboboxReducer(state, { type: useCombobox.stateChangeTypes.MenuMouseLeave, changes });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });

      it('should keep the menu open and maintain highlightedIndex when InputKeyDownEnter action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = withScrollbarComboboxReducer(state, { type: useCombobox.stateChangeTypes.InputKeyDownEnter, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });

      it('should keep the menu open and maintain highlightedIndex when ItemClick action is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { selectedItem: 'item', isOpen: false };
        const newState = withScrollbarComboboxReducer(state, { type: useCombobox.stateChangeTypes.ItemClick, changes });

        expect(newState).toEqual({ ...changes, isOpen: true, highlightedIndex: state.highlightedIndex });
      });

      it('should return changes as default when unknown action type is dispatched', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = withScrollbarComboboxReducer(state, { type: 'unknown_action_type' as UseComboboxStateChangeTypes, changes });

        expect(newState).toEqual(changes);
      });
    });
    describe('multiselect-with-scrollbar behavior', () => {
      it('should toggle the selected item after clicking the item', () => {
        const { container } = render(<MultiselectWithScrollbar />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        const optionAItem = screen.getAllByText('Option A').find(item => item.tagName === 'LI')!;
        fireEvent.click(optionAItem);
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.click(optionAItem);
        expect(inputContainer).toHaveTextContent('');
      });
      it('should open when typing starts', () => {
        const { container } = render(<MultiselectWithScrollbar />);
        const input = container.querySelector('input')!;
        fireEvent.change(input, { target: { value: '123456789' } });
        expect(input).toHaveAttribute('aria-expanded', 'true');
      });
      it('should remove the selected item by highlighting it and hitting Enter again', () => {
        const { container } = render(<MultiselectWithScrollbar />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(inputContainer).toHaveTextContent('');
      });
      it('should remove the selected item after clicking the remove button', () => {
        const { container } = render(<MultiselectWithScrollbar />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        const removeButton = container.querySelector('button[aria-label="Remove Option A"]')!;
        fireEvent.click(removeButton);
        expect(inputContainer).toHaveTextContent('');
      });
      it('toggle an item from the listbox using a keyboard', () => {
        const { container } = render(<MultiselectWithScrollbar />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Backspace' });
        expect(inputContainer).toHaveTextContent('');
      });
    });
  });

  describe('multiselect-with-filterable-menu-and-manual-selection', () => {
    describe('manualFilterComboboxReducer', () => {
      it('should not change state on input click (leave menu closed if closed)', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = manualFilterComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputClick,
          changes,
        });

        expect(newState).toEqual({ ...state });
      });
      it('should return the same highlighted index when ItemMouseMove is fired', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = manualFilterComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.ItemMouseMove,
          changes,
        });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });

      it('should return the same highlighted index when MenuMouseLeave is fired', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = manualFilterComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.MenuMouseLeave,
          changes,
        });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });
      it('should keep the menu open on item click', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: false };
        const newState = manualFilterComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.ItemClick,
          changes,
        });

        expect(newState).toEqual({ ...changes, isOpen: true });
      });
      it('should keep the menu open on InputKeyDownEnter,', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: false };
        const newState = manualFilterComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputKeyDownEnter,
          changes,
        });

        expect(newState).toEqual({ ...changes, isOpen: true });
      });
    });
    describe('multiselect-with-filterable-menu-and-manual-selection behavior', () => {
      it('should toggle the selected item after clicking the item', () => {
        const { container } = render(<MultiselectWithFilterableMenuAndManualSelection />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        const optionAItem = screen.getAllByText('Option A').find(item => item.tagName === 'LI')!;
        fireEvent.click(optionAItem);
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.click(optionAItem);
        expect(inputContainer).toHaveTextContent('');
      });
      it('should open when typing starts', () => {
        const { container } = render(<MultiselectWithFilterableMenuAndManualSelection />);
        const input = container.querySelector('input')!;
        fireEvent.change(input, { target: { value: '123456789' } });
        expect(input).toHaveAttribute('aria-expanded', 'true');
      });
      it('should remove the selected item by highlighting it and hitting Enter again', () => {
        const { container } = render(<MultiselectWithFilterableMenuAndManualSelection />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(inputContainer).toHaveTextContent('');
      });
      it('should remove the selected item after clicking the remove button', () => {
        const { container } = render(<MultiselectWithFilterableMenuAndManualSelection />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        const removeButton = container.querySelector('button[aria-label="Remove Option A"]')!;
        fireEvent.click(removeButton);
        expect(inputContainer).toHaveTextContent('');
      });
      it('toggle an item from the listbox using a keyboard', () => {
        const { container } = render(<MultiselectWithFilterableMenuAndManualSelection />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Backspace' });
        expect(inputContainer).toHaveTextContent('');
      });
      it('filters the items list down when the input value changes, but requires manual selection', () => {
        const { container } = render(<MultiselectWithFilterableMenuAndManualSelection />);
        const input = container.querySelector('input')!;
        const inputContainer = container.querySelector('.v-input-container')!;

        fireEvent.change(input, { target: { value: 'C' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(inputContainer).not.toHaveTextContent('Option C'); // Enter keypress isn't enough because this is manual selection


        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(inputContainer).toHaveTextContent('Option C'); // but arrowing down to then pressing enter WILL select it
      });
    });
  });
  describe('multiselect-with-filterable-menu-and-automatic-selection', () => {
    describe('automaticFilterComboboxReducer', () => {
      it('should not change state on input click (leave menu closed if closed)', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = automaticFilterComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputClick,
          changes,
        });

        expect(newState).toEqual({ ...state });
      });
      it('should return the same highlighted index when ItemMouseMove is fired', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = automaticFilterComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.ItemMouseMove,
          changes,
        });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });

      it('should return the same highlighted index when MenuMouseLeave is fired', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: true };
        const newState = automaticFilterComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.MenuMouseLeave,
          changes,
        });

        expect(newState).toEqual({ ...changes, highlightedIndex: state.highlightedIndex });
      });
      it('should keep the menu open on item click', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: false };
        const newState = automaticFilterComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.ItemClick,
          changes,
        });

        expect(newState).toEqual({ ...changes, isOpen: true });
      });
      it('should keep the menu open on InputKeyDownEnter,', () => {
        const state = { selectedItem: undefined, inputValue: '', highlightedIndex: 0, isOpen: false };
        const changes = { highlightedIndex: 1, isOpen: false };
        const newState = automaticFilterComboboxReducer(state, {
          type: useCombobox.stateChangeTypes.InputKeyDownEnter,
          changes,
        });

        expect(newState).toEqual({ ...changes, isOpen: true });
      });
    });
    describe('multiselect-with-filterable-menu-and-automatic-selection behavior', () => {
      it('should toggle the selected item after clicking the item', () => {
        const { container } = render(<MultiselectWithFilterableMenuAndAutomaticSelection />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        const optionAItem = screen.getAllByText('Option A').find(item => item.tagName === 'LI')!;
        fireEvent.click(optionAItem);
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.click(optionAItem);
        expect(inputContainer).toHaveTextContent('');
      });
      it('should open when typing starts', () => {
        const { container } = render(<MultiselectWithFilterableMenuAndAutomaticSelection />);
        const input = container.querySelector('input')!;
        fireEvent.change(input, { target: { value: '123456789' } });
        expect(input).toHaveAttribute('aria-expanded', 'true');
      });
      it('should remove the selected item by highlighting it and hitting Enter again', () => {
        const { container } = render(<MultiselectWithFilterableMenuAndAutomaticSelection />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(inputContainer).toHaveTextContent('');
      });
      it('should remove the selected item after clicking the remove button', () => {
        const { container } = render(<MultiselectWithFilterableMenuAndAutomaticSelection />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        const removeButton = container.querySelector('button[aria-label="Remove Option A"]')!;
        fireEvent.click(removeButton);
        expect(inputContainer).toHaveTextContent('');
      });
      it('toggle an item from the listbox using a keyboard', () => {
        const { container } = render(<MultiselectWithFilterableMenuAndAutomaticSelection />);
        const input = container.querySelector('input')!;
        fireEvent.keyDown(input, { key: 'ArrowDown' });
        fireEvent.keyDown(input, { key: 'Enter' });
        const inputContainer = container.querySelector('.v-input-container')!;
        expect(inputContainer).toHaveTextContent('Option A');
        fireEvent.keyDown(input, { key: 'Backspace' });
        expect(inputContainer).toHaveTextContent('');
      });
      it('filters the items list down when the input value changes, and automatically highlights', () => {
        const { container } = render(<MultiselectWithFilterableMenuAndAutomaticSelection />);
        const input = container.querySelector('input')!;
        const inputContainer = container.querySelector('.v-input-container')!;

        fireEvent.change(input, { target: { value: 'C' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(inputContainer).toHaveTextContent('Option C'); // Enter keypress isn't enough because this is automatic selection
      });
    });
  });
});
