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
import { VisaChevronDownTiny } from '@visa/nova-icons-react';
import { InputContainer, InputControl, InputMessage, Label, Select, Utility } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'select-with-inline-message';

const options = ['Option A', 'Option B', 'Option C', 'Option D', 'Option E'];

export const SelectWithInlineMessage = () => {
  return (
    <Utility aria-labelledby={`${id}-message`} tag="fieldset" vFlex vFlexCol vGap={6}>
      <Label htmlFor={id}>Label (required)</Label>
      <InputContainer>
        <Select aria-describedby={`${id}-message`} id={id} name={`${id}-name`}>
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
      <InputMessage id={`${id}-message`}>This is optional text that describes the label in more detail.</InputMessage>
    </Utility>
  );
};
