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
import { Label, Listbox, ListboxContainer, ListboxItem, useListbox } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'use-listbox-usage';

const options = [
  {
    label: 'Item A',
  },
  {
    disabled: true,
    label: 'Item B',
  },
  {
    label: 'Item C',
  },
  {
    label: 'Item D',
  },
  {
    label: 'Item E',
  },
];

export const UseListboxExample = () => {
  // useListbox hook returns the following:
  // isIndexSelected: function that returns a boolean value to determine if the index is selected or not
  // getTabIndex: function that returns the correct tabIndex based on the index and disabled state
  // onKeyNavigation: function that handles keyboard navigation, and toggles the list item selected state
  // ref: a ref object that is used to store the list item elements
  // toggleIndexSelected: function that toggles the list item selected state, based on the index provided
  const { isIndexSelected, getTabIndex, onKeyNavigation, ref, toggleIndexSelected } = useListbox({
    defaultSelected: 0,
  }); // Default to active on first list item

  return (
    <fieldset>
      <Label id={`${id}-legend`} tag="legend">
        Label (required)
      </Label>
      <ListboxContainer>
        <Listbox aria-labelledby={`${id}-legend`} id={id} onKeyDown={onKeyNavigation} role="listbox" scroll>
          {options.map((option, index) => (
            <ListboxItem
              aria-disabled={option.disabled}
              aria-selected={isIndexSelected(index)}
              key={`${id}-option-${index}`}
              onClick={() => toggleIndexSelected(index)}
              ref={el => {
                ref.current[index] = el;
              }}
              role="option"
              tabIndex={getTabIndex(index, option.disabled)}
            >
              <span className="v-radio v-flex-shrink-0 " />
              {option.label}
            </ListboxItem>
          ))}
        </Listbox>
      </ListboxContainer>
    </fieldset>
  );
};
