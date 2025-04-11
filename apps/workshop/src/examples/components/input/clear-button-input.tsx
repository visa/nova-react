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
import { VisaClearAltTiny } from '@visa/nova-icons-react';
import { Button, Input, InputContainer, Label, Utility } from '@visa/nova-react';
import { FocusEvent, useEffect, useRef, useState } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'input-clear-button';

export const ClearButtonInput = () => {
  const [showClearButton, setShowClearButton] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowClearButton(false);
    }
  };

  const handleClear = () => {
    setInputValue('');
    // Put focus back into the input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputValue !== '') setShowClearButton(true);
    else setShowClearButton(false);
  }, [inputValue]);

  return (
    <Utility vFlex vFlexCol vGap={4}>
      <Label htmlFor={id}>Label (required)</Label>
      <InputContainer
        onBlur={e => handleBlur(e)}
        onFocus={() => {
          if (inputValue !== '') setShowClearButton(true);
        }}
      >
        <Input
          ref={inputRef}
          aria-required="true"
          id={id}
          onChange={e => setInputValue(e.currentTarget.value)}
          type="text"
          value={inputValue}
        />
        {showClearButton && (
          <Button aria-label="Clear" buttonSize="small" colorScheme="tertiary" iconButton onClick={handleClear} subtle>
            <VisaClearAltTiny />
          </Button>
        )}
      </InputContainer>
    </Utility>
  );
};
