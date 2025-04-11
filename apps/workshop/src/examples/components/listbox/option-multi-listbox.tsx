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
const id = 'option-multi-select-listbox';

const options = ['Item A', 'Item B', 'Item C', 'Item D', 'Item E', 'Item F', 'Item G'];

export const OptionMultiListbox = () => {
  const {
    isIndexSelected,
    getTabIndex,
    onKeyNavigation,
    ref: listItemsRef,
    toggleIndexSelected,
  } = useListbox({ defaultSelected: [0, 3] }); // Default to active on first list item

  return (
    <fieldset>
      <Label id={`${id}-legend`} tag="legend">
        Label (required)
      </Label>
      <ListboxContainer>
        <Listbox aria-labelledby={`${id}-legend`} id={id} onKeyDown={onKeyNavigation} role="listbox" scroll>
          {options.map((option, index) => {
            const disabled = index === 1;
            return (
              <ListboxItem
                aria-disabled={disabled || undefined}
                aria-selected={isIndexSelected(index)}
                key={`${id}-option-${index}`}
                onClick={() => toggleIndexSelected(index)}
                ref={el => {
                  listItemsRef.current[index] = el;
                }}
                role="option"
                tabIndex={getTabIndex(index, disabled)}
              >
                <span className="v-checkbox v-flex-shrink-0" />
                {option}
              </ListboxItem>
            );
          })}
        </Listbox>
      </ListboxContainer>
    </fieldset>
  );
};
