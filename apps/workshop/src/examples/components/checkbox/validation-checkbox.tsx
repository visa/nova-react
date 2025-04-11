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
import { ChangeEvent, useRef, useState } from 'react';
import { Button, Checkbox, InputMessage, Label, Utility, UtilityFragment } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'validation-checkbox';

export const ValidationCheckbox = () => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const onCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const onSubmit = () => {
    if (checked) return setInvalid(false);
    setInvalid(true);
    checkboxRef.current?.focus();
  };

  return (
    <>
      <Utility tag="fieldset" vFlex vFlexCol>
        <Utility vAlignItems="center" vFlex vGap={2}>
          <Checkbox
            aria-describedby={`${id}-message`}
            aria-invalid={invalid}
            aria-required={true}
            checked={checked}
            id={id}
            onChange={onCheckboxChange}
            ref={checkboxRef}
            value="1"
          />
          <Label htmlFor={id}>Label</Label>
        </Utility>
        {invalid && (
          <UtilityFragment vMarginTop={4}>
            <InputMessage aria-atomic="true" aria-live="assertive" id={`${id}-message`} role="alert" variant="body-3">
              <VisaErrorTiny />
              This is required text that describes the error in more detail.
            </InputMessage>
          </UtilityFragment>
        )}
      </Utility>
      <UtilityFragment vMarginTop={12}>
        <Button onClick={onSubmit}>Submit</Button>
      </UtilityFragment>
    </>
  );
};
