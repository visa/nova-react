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
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaClearAltTiny } from '@visa/nova-icons-react';
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
import { FocusEvent, useState } from 'react';

type Item = { value: string };

const items: Item[] = [
  { value: 'Option A' },
  { value: 'Option B' },
  { value: 'Option C' },
  { value: 'Option D' },
  { value: 'Option E' },
];

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

export const ClearButtonCombobox = () => {
  const {
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    selectItem,
    highlightedIndex,
    isOpen,
    inputValue,
  } = useCombobox({
    initialInputValue: 'Option A',
    items,
    itemToString,
    stateReducer,
  });
  const { id: listboxId, ...listboxProps } = getMenuProps();

  const [focused, setFocused] = useState(false);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setFocused(false);
    }
  };

  const onClear = () => selectItem(null);
  const showClearButton = inputValue.length > 0 && focused;

  return (
    <Combobox>
      <UtilityFragment vFlex vFlexCol vGap={4}>
        <DropdownContainer>
          <Label {...getLabelProps()}>Label</Label>
          <UtilityFragment vFlexRow>
            <InputContainer
              onBlur={e => handleBlur(e)}
              onFocus={() => {
                setFocused(true);
              }}
            >
              <Input
                aria-haspopup="listbox"
                name="text-input-field-4"
                type="text"
                {...getInputProps({ 'aria-expanded': isOpen && items.length > 0, 'aria-owns': listboxId })}
              />
              {showClearButton && (
                <Button
                  aria-label="clear"
                  buttonSize="small"
                  colorScheme="tertiary"
                  iconButton
                  onClick={onClear}
                  subtle
                >
                  <VisaClearAltTiny />
                </Button>
              )}
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
          {items.map((item, index) => (
            <ListboxItem
              className={highlightedIndex === index ? 'v-listbox-item-highlighted' : ''}
              key={`clear-button-combobox-${index}`}
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
          ))}
        </Listbox>
      </ListboxContainer>
    </Combobox>
  );
};
