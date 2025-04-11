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
import { VisaChevronDownTiny, VisaErrorTiny } from '@visa/nova-icons-react';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button, InputContainer, InputControl, InputMessage, Label, Select, Utility } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'error-select';

const options = ['Option A', 'Option B', 'Option C', 'Option D', 'Option E'];

export const ErrorSelect = () => {
  const [invalid, setInvalid] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const selectRef = useRef<HTMLSelectElement>(null);

  const onReset = (event: FormEvent) => {
    event.preventDefault();
    setInvalid(false);
    setSelectValue('');
  };
  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;
    setInvalid(!value);
    setSelectValue(value);
  };
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const isInvalid = !selectValue;
    setInvalid(isInvalid);
    if (isInvalid) {
      selectRef.current?.focus();
    }
  };

  return (
    <Utility noValidate onReset={onReset} onSubmit={onSubmit} tag="form" vFlex vFlexCol vGap={16}>
      <Utility aria-labelledby={`${id}-message`} tag="fieldset" vFlex vFlexCol vGap={6}>
        <Label htmlFor={id}>Label (required)</Label>
        <InputContainer>
          <Select
            aria-describedby={`${id}-message`}
            aria-invalid={invalid}
            id={id}
            name="full-name"
            onChange={onSelectChange}
            ref={selectRef}
            required
            value={selectValue}
          >
            <option hidden value="" />
            {options.map((option, index) => (
              <option key={`${id}-option-${index}`} value={index}>
                {option}
              </option>
            ))}
          </Select>
          <InputControl>
            <VisaChevronDownTiny />
          </InputControl>
        </InputContainer>
        {invalid && (
          <InputMessage aria-atomic="true" aria-live="assertive" id={`${id}-message`}>
            <VisaErrorTiny />
            This is required text that describes the error in more detail
          </InputMessage>
        )}
      </Utility>
      <Utility vFlex vGap={10}>
        <Button type="submit">Submit</Button>
        <Button colorScheme="secondary" type="reset">
          Reset
        </Button>
      </Utility>
    </Utility>
  );
};
