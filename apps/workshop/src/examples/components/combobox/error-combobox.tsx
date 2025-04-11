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
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaErrorTiny } from '@visa/nova-icons-react';
import {
  Button,
  Combobox,
  DropdownContainer,
  Input,
  InputContainer,
  InputMessage,
  Label,
  Listbox,
  ListboxContainer,
  ListboxItem,
  Radio,
  Utility,
  UtilityFragment,
} from '@visa/nova-react';
import { UseComboboxState, UseComboboxStateChangeOptions, useCombobox } from 'downshift';
import { useState } from 'react';

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

export const ErrorCombobox = () => {
  const [errorState, setErrorState] = useState(false);

  const {
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    selectItem,
    highlightedIndex,
    inputValue,
    isOpen,
    selectedItem,
  } = useCombobox({
    items,
    itemToString,
    stateReducer,
  });
  const { id: listboxId, ...listboxProps } = getMenuProps();

  return (
    <Utility vFlexCol vGap={12}>
      <Combobox>
        <DropdownContainer className="v-flex v-flex-col v-gap-4">
          <Label {...getLabelProps()}>Label (required)</Label>
          <InputContainer className="v-flex-row">
            <Input
              aria-describedby="input-error-message"
              aria-haspopup="listbox"
              aria-invalid={errorState ? 'true' : 'false'}
              name="text-input-field-6"
              type="text"
              {...getInputProps({
                'aria-expanded': isOpen && items.length > 0,
                'aria-owns': listboxId,
                onChange: () => selectItem(null),
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
          {errorState && !isOpen && (
            <InputMessage aria-atomic="true" aria-live="assertive" id="input-error-message" role="alert">
              <VisaErrorTiny />
              This is required text that describes the error in more detail.
            </InputMessage>
          )}
        </DropdownContainer>
        <ListboxContainer>
          <Listbox id={listboxId} {...listboxProps}>
            {items.map((item, index) => (
              <ListboxItem
                className={highlightedIndex === index ? 'v-listbox-item-highlighted' : ''}
                key={`error-combobox-${index}`}
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
      <Utility vFlex vGap={12}>
        <Button onClick={() => (!inputValue && !selectedItem ? setErrorState(true) : setErrorState(false))}>
          Submit
        </Button>
        <Button
          colorScheme="secondary"
          onClick={() => {
            setErrorState(false);
            selectItem(null);
          }}
        >
          Reset
        </Button>
      </Utility>
    </Utility>
  );
};
