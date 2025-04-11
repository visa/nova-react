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
import { VisaErrorTiny } from '@visa/nova-icons-react';
import { Button, InputMessage, Label, Listbox, ListboxContainer, ListboxItem, Radio, Utility } from '@visa/nova-react';
import { FormEvent, useState } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'error-single-select-listbox';

const options = ['Item A', 'Item B', 'Item C', 'Item D', 'Item E', 'Item F', 'Item G'];

export const ErrorSingleListbox = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [invalid, setInvalid] = useState(false);

  const onReset = (event: FormEvent) => {
    event.preventDefault();
    setInvalid(false);
    setSelectedIndex(-1);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setInvalid(selectedIndex === -1);
  };

  return (
    <form onReset={onReset} onSubmit={onSubmit}>
      <fieldset aria-invalid={invalid}>
        <Label id={`${id}-legend`} tag="legend">
          Label (required)
        </Label>
        <ListboxContainer error={invalid}>
          <Listbox id={id} scroll tag="div">
            {options.map((option, index) => (
              <ListboxItem htmlFor={`${id}-option-${index}`} key={`${id}-option-${index}`} tag="label">
                <Radio
                  checked={selectedIndex === index}
                  className="v-flex-shrink-0"
                  id={`${id}-option-${index}`}
                  name={`${id}-options`}
                  onChange={() => setSelectedIndex(index)}
                />
                <Label tag="span">{option}</Label>
              </ListboxItem>
            ))}
          </Listbox>
        </ListboxContainer>
        {invalid && (
          <InputMessage id={`${id}-message`}>
            <VisaErrorTiny />
            This is required text that describes the error in more detail.
          </InputMessage>
        )}
      </fieldset>

      <Utility vFlex vFlexRow vGap={8}>
        <Utility element={<Button type="submit" />} vMarginTop={8}>
          Submit
        </Utility>
        <Utility element={<Button colorScheme="secondary" type="reset" />} vMarginTop={8}>
          Reset
        </Utility>
      </Utility>
    </form>
  );
};
