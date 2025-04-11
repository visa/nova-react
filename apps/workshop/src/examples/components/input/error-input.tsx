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
import { Button, Input, InputContainer, InputMessage, Label, Utility } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'input-error';

const DEFAULT_INPUT_STATE = {
  value: '',
  error: false,
};

export const ErrorInput = () => {
  const [inputState, setInputState] = useState(DEFAULT_INPUT_STATE);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    // Customize this for your own validation needs
    setInputState(prevInputState => ({
      ...prevInputState,
      error: true,
    }));

    // Focus on the input with error
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleReset = () => {
    setInputState(DEFAULT_INPUT_STATE);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState({
      value: e.target.value,
      error: false,
    });
  };

  return (
    <>
      <Utility vFlex vFlexCol vGap={4}>
        <Label htmlFor={id}>Label (required)</Label>
        <InputContainer>
          <Input
            aria-describedby={`${id}-message`}
            aria-invalid={inputState.error}
            aria-required="true"
            ref={inputRef}
            id={id}
            type="text"
            value={inputState.value}
            onChange={handleInputChange}
          />
        </InputContainer>
        {inputState.error && (
          <InputMessage aria-atomic="true" aria-live="assertive" id={`${id}-message`} role="alert">
            <VisaErrorTiny />
            This is required text that describes the error in more detail.
          </InputMessage>
        )}
      </Utility>
      <Utility vFlex vGap={12} vMarginTop={16}>
        <Button id={`${id}-submit-button`} onClick={handleSubmit}>
          Submit
        </Button>
        <Button id={`${id}-reset-button`} colorScheme="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Utility>
    </>
  );
};
