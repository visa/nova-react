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
import { Button, InputContainer, InputMessage, Label, Textarea, Utility, UtilityFragment } from '@visa/nova-react';
import { ChangeEvent, useState } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'text-count-textarea';
const maxCharacters = 400;

const getMessage = ({
  characterCount,
  characterCountInvalid,
  invalid,
}: {
  characterCount: number;
  characterCountInvalid: boolean;
  invalid: boolean;
}) => {
  if (invalid) return 'This is a required field';
  if (characterCountInvalid)
    return `${characterCount - maxCharacters} character${characterCount - maxCharacters !== 1 ? 's' : ''} over limit`;
  return `${maxCharacters - characterCount} character${maxCharacters - characterCount !== 1 ? 's' : ''} remaining`;
};

export const TextCountTextarea = () => {
  const [invalid, setInvalid] = useState(false);
  const [text, setText] = useState('');

  const characterCount = text.length;
  const characterCountInvalid = characterCount > maxCharacters;
  const messageIsError = characterCountInvalid || invalid;

  const message = getMessage({ characterCount, characterCountInvalid, invalid });

  const onReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInvalid(false);
    setText('');
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInvalid(characterCount === 0);
  };
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInvalid(false);
    setText(e.target.value);
  };

  return (
    <form onReset={onReset} onSubmit={onSubmit}>
      <Utility vFlex vFlexCol vGap={4}>
        <Label htmlFor={id}>Label (required)</Label>
        <InputContainer className="v-flex-row">
          <Textarea
            aria-describedby={`${id}-message`}
            aria-invalid={characterCountInvalid || invalid}
            aria-required="true"
            fixed
            id={id}
            name={id}
            onChange={onTextChange}
            style={{ blockSize: '130px' }}
            value={text}
          />
        </InputContainer>
        <UtilityFragment vFlex vFlexRow>
          <InputMessage
            aria-atomic={messageIsError}
            aria-live={messageIsError ? 'assertive' : 'polite'}
            id={`${id}-message`}
            role={messageIsError ? 'alert' : undefined}
          >
            {messageIsError && <VisaErrorTiny />}
            {message}
          </InputMessage>
        </UtilityFragment>
      </Utility>
      <Utility vFlex vFlexRow vGap={8} vMarginTop={16}>
        <Button type="submit">Submit</Button>
        <Button colorScheme="secondary" type="reset">
          Reset
        </Button>
      </Utility>
    </form>
  );
};
