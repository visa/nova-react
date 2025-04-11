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
import { ChangeEvent, useRef, useState } from 'react';
import { VisaErrorTiny } from '@visa/nova-icons-react';
import { Button, InputMessage, Label, Radio, Utility, UtilityFragment } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'radio-error';

export const ErrorRadio = () => {
  const radioRef = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const onRadioButtonChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const onSubmit = () => {
    if (checked) setInvalid(false);
    else {
      setInvalid(true);
      radioRef.current?.focus();
    }
  };
  return (
    <>
      <fieldset aria-labelledby={`${id}-message`}>
        <Utility vFlex vAlignItems="center" vGap={2}>
          <Radio
            aria-invalid={invalid}
            aria-required="true"
            checked={checked}
            id={id}
            name={id}
            onChange={onRadioButtonChange}
            ref={radioRef}
          />
          <Label htmlFor={id} id={`${id}-label`}>
            Label
          </Label>
        </Utility>
        {invalid && (
          <UtilityFragment vAlignItems="center" vFlex vGap={2} vMarginTop={4}>
            <InputMessage
              aria-atomic="true"
              aria-live="assertive"
              className="v-typography-label"
              id={`${id}-message`}
              role="alert"
            >
              <VisaErrorTiny />
              This is required text that describes the error in more detail.
            </InputMessage>
          </UtilityFragment>
        )}
      </fieldset>
      <Utility vFlex vGap={12} vMarginTop={12}>
        <Button onClick={onSubmit}>Submit</Button>
        <Button colorScheme="secondary" onClick={() => setChecked(false)}>
          Reset
        </Button>
      </Utility>
    </>
  );
};
