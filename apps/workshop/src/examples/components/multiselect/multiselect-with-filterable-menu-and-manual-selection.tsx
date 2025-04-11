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
  Checkbox,
  Chip,
  Combobox,
  DropdownContainer,
  Input,
  InputContainer,
  Label,
  Listbox,
  ListboxContainer,
  ListboxItem,
  Typography,
  Utility,
  UtilityFragment,
} from '@visa/nova-react';
import { UseComboboxState, UseComboboxStateChangeOptions, useCombobox, useMultipleSelection } from 'downshift';
import { useMemo, useState } from 'react';

type Item = { value: string };

const id = 'multiselect-with-filterable-menu-and-manual-selection';
const multiselectItems: Item[] = [
  { value: 'Option A' },
  { value: 'Option B' },
  { value: 'Option C' },
  { value: 'Option D' },
  { value: 'Option E' },
];

export const itemToString = (item: Item | null) => (item ? item.value : '');

export const comboboxStateReducer = <ItemType,>(
  state: UseComboboxState<ItemType>,
  { type, changes }: UseComboboxStateChangeOptions<ItemType>
) => {
  switch (type) {
    case useCombobox.stateChangeTypes.InputClick:
      return {
        // don't open the menu just because the input was clicked
        // instead, wait for an keystroke or a toggle button click
        ...state,
      };
    case useCombobox.stateChangeTypes.ItemMouseMove:
    case useCombobox.stateChangeTypes.MenuMouseLeave:
      return {
        ...changes,
        // don't change the focused item just because the mouse moved
        highlightedIndex: state.highlightedIndex,
      };
    case useCombobox.stateChangeTypes.InputKeyDownEnter:
    case useCombobox.stateChangeTypes.ItemClick:
      return {
        ...changes,
        isOpen: true, // keep the menu open on item select or Enter press
        // and if we're selecting an item, maintain the same highlightedIndex
        ...(changes.selectedItem && { highlightedIndex: state.highlightedIndex }),
      };
    default:
      return changes;
  }
};

export const MultiselectWithFilterableMenuAndManualSelection = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const items = useMemo(
    () => multiselectItems.filter(item => item.value.toLowerCase().includes(inputValue.toLowerCase())),
    [inputValue]
  );

  const { getDropdownProps, removeSelectedItem } = useMultipleSelection({
    selectedItems,
    onStateChange({ selectedItems: newSelectedItems, type }) {
      if (
        type === useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace ||
        type === useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete ||
        type === useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace ||
        type === useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem
      ) {
        setSelectedItems(newSelectedItems!);
      }
    },
  });
  const {
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
    isOpen,
    setHighlightedIndex,
  } = useCombobox({
    items,
    itemToString,
    inputValue,
    stateReducer: comboboxStateReducer,
    onStateChange({ inputValue: newInputValue, type, selectedItem }) {
      if (type === useCombobox.stateChangeTypes.InputChange) {
        setInputValue(newInputValue!);
      }
      if (type === useCombobox.stateChangeTypes.ItemClick && !!selectedItem) {
        // make sure the highlighted index is on the item that was just clicked
        setHighlightedIndex(items.indexOf(selectedItem));
      }
    },
  });

  const resultsFound = items.length > 0;

  return (
    <Combobox>
      <UtilityFragment vFlex vFlexCol vGap={4}>
        <DropdownContainer>
          <Label {...getLabelProps()}>Label (required)</Label>
          <UtilityFragment vPaddingVertical={3} vPaddingLeft={3} vPaddingRight={6}>
            <InputContainer>
              <Utility vFlex vFlexGrow vFlexShrink vFlexWrap vGap={2}>
                {selectedItems.map((item, index) => (
                  <UtilityFragment vFlexShrink0 key={`selected-item-${index}`}>
                    <Chip chipSize="compact">
                      <Label>{item.value}</Label>
                      <Button
                        aria-label={`Remove ${item.value}`}
                        colorScheme="tertiary"
                        iconButton
                        onClick={() => removeSelectedItem(item)}
                        subtle
                      >
                        <VisaClearAltTiny />
                      </Button>
                    </Chip>
                  </UtilityFragment>
                ))}
                <UtilityFragment vFlexShrink style={{ flexBasis: '50px' }}>
                  <Input
                    name={id}
                    {...getInputProps(
                      getDropdownProps({
                        onKeyDown: e => {
                          if (e.key === 'Enter') {
                            if (highlightedIndex !== -1 && resultsFound && isOpen) {
                              const selectedItem = items[highlightedIndex];
                              if (selectedItems.includes(selectedItem)) {
                                removeSelectedItem(selectedItem);
                              } else {
                                setSelectedItems([...selectedItems, selectedItem]);
                                setInputValue('');
                              }
                            }
                          }
                        },
                      })
                    )}
                  />
                </UtilityFragment>
              </Utility>
              <Button
                aria-haspopup="listbox"
                aria-label={`${id}-toggle-button`}
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
        <UtilityFragment
          vAlignItems={resultsFound ? undefined : 'center'}
          vFlex={resultsFound || undefined}
          vJustifyContent={resultsFound ? undefined : 'center'}
          style={resultsFound ? undefined : { minBlockSize: 180 }}
        >
          <Listbox {...getMenuProps()}>
            {items.map((item, index) => (
              <ListboxItem<HTMLLIElement>
                key={`${id}-example-${index}`}
                className={highlightedIndex === index ? 'v-listbox-item-highlighted' : ''}
                {...getItemProps({
                  item,
                  index,
                  'aria-selected': selectedItems.includes(item),
                  onClick: () => {
                    if (selectedItems.includes(item)) {
                      removeSelectedItem(item);
                    } else {
                      setSelectedItems([...selectedItems, item]);
                      setInputValue('');
                    }
                  },
                })}
              >
                <Checkbox tag="span" />
                {item.value}
              </ListboxItem>
            ))}
            {!resultsFound && (
              <li aria-atomic="true" aria-live="assertive">
                <Typography variant="label-large">No results found</Typography>
              </li>
            )}
          </Listbox>
        </UtilityFragment>
      </ListboxContainer>
    </Combobox>
  );
};
