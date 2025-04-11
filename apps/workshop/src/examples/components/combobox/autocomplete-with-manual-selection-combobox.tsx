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
import { VisaChevronDownTiny, VisaChevronUpTiny } from '@visa/nova-icons-react';
import {
  Button,
  Combobox,
  DropdownContainer,
  Input,
  InputContainer,
  Label,
  Listbox,
  ListboxContainer,
  ListboxItem,
  Radio,
  UtilityFragment,
} from '@visa/nova-react';
import { UseComboboxState, UseComboboxStateChangeOptions, useCombobox } from 'downshift';
import { useState } from 'react';

type Item = { value: string };

const defaultItems: Item[] = [
  { value: 'Option A' },
  { value: 'Option B' },
  { value: 'Option C' },
  { value: 'Option D' },
  { value: 'Option E' },
];

export const filter = (item: Item, inputValue: string = '') =>
  item.value.toLowerCase().includes(inputValue!.toLowerCase());

export const itemToString = (item: Item | null) => (item ? item.value : '');

export const stateReducer = <ItemType,>(
  state: UseComboboxState<ItemType>,
  { type, changes }: UseComboboxStateChangeOptions<ItemType>
) =>
  // this prevents on mouse hover, the item in the list is automatic selected
  type === useCombobox.stateChangeTypes.ItemMouseMove || type === useCombobox.stateChangeTypes.MenuMouseLeave
    ? {
        ...changes, // default Downshift new state changes on item selection.
        highlightedIndex: state.highlightedIndex,
      }
    : changes;

export const AutocompleteWithManualSelectionCombobox = () => {
  const [items, setItems] = useState(defaultItems);
  const {
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    highlightedIndex,
    inputValue,
    isOpen,
  } = useCombobox({
    items,
    itemToString,
    onInputValueChange: ({ inputValue }) => {
      setItems(defaultItems.filter(item => filter(item, inputValue)));
    },
    stateReducer,
  });

  const { id: listboxId, ...listboxProps } = getMenuProps();

  return (
    <Combobox>
      <UtilityFragment vFlex vFlexCol vGap={4}>
        <DropdownContainer>
          <Label {...getLabelProps()}>Label</Label>
          <UtilityFragment vFlexRow>
            <InputContainer>
              <Input
                aria-haspopup="listbox"
                name="text-input-field-12"
                type="text"
                {...getInputProps({
                  'aria-expanded': isOpen && items.length > 0,
                  'aria-owns': listboxId
                })}
              />
              <Button
                aria-label="expand"
                buttonSize="small"
                colorScheme="tertiary"
                iconButton
                {...getToggleButtonProps()}
              >
                {isOpen ? <VisaChevronUpTiny /> : <VisaChevronDownTiny />}
              </Button>
            </InputContainer>
          </UtilityFragment>
        </DropdownContainer>
      </UtilityFragment>
      <ListboxContainer>
        <Listbox id={listboxId} {...listboxProps}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <ListboxItem
                className={highlightedIndex === index ? 'v-listbox-item-highlighted' : ''}
                key={`manual-autocomplete-combobox-${index}`}
                {...getItemProps({
                  'aria-selected': inputValue === item.value,
                  index,
                  item,
                })}
              >
                <UtilityFragment vFlexShrink0>
                  <Radio tag="span" />
                </UtilityFragment>
                {item.value}
              </ListboxItem>
            ))
          ) : (
            <UtilityFragment vFlex vJustifyContent="center" vPaddingVertical={8}>
              <li>No results found.</li>
            </UtilityFragment>
          )}
        </Listbox>
      </ListboxContainer>
    </Combobox>
  );
};
