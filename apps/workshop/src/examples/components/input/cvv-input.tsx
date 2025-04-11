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
import { Button, Input, InputContainer, InputMessage, Label, Utility } from '@visa/nova-react';
import { FormEvent, useState } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'cvv-input';

const cvvLength = 3;

export const CVVInput = () => {
  const [invalid, setInvalid] = useState(false);
  const [focused, setFocused] = useState(false);

  const onReset = () => {
    setInvalid(false);
  };
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = event.currentTarget.checkValidity();
    const formData = new FormData(event.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());

    // If valid, alert with CVV
    if (isValid) alert(`Success!\nCVV: ${formDataObject['cvv-input']}`);
    // If invalid, focus on invalid element
    else (event.currentTarget.querySelector(':invalid') as HTMLInputElement)?.focus();

    setInvalid(!isValid);
  };

  return (
    <Utility noValidate onReset={onReset} onSubmit={onSubmit} tag="form" vFlex vFlexCol vGap={4}>
      <Label htmlFor={id}>Security code</Label>
      <InputContainer>
        <Input
          aria-describedby={`${id}-message`}
          aria-invalid={invalid}
          aria-required="true"
          autoComplete="cc-csc"
          id={id}
          maxLength={cvvLength}
          name={id}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          pattern={`[0-9]{${cvvLength}}`}
          required
          type={focused ? 'text' : 'password'}
        />
      </InputContainer>
      {invalid && (
        <InputMessage id={`${id}-message`}>
          <VisaErrorTiny />
          Please choose a valid security code.
        </InputMessage>
      )}
      <Utility vFlex vFlexRow vGap={8} vMarginTop={16}>
        <Button type="submit">Submit</Button>
        <Button colorScheme="secondary" type="reset">
          Reset
        </Button>
      </Utility>
    </Utility>
  );
};
