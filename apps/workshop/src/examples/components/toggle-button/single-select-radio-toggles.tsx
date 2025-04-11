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
import { Radio, Toggle, ToggleContainer } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'single-select-radio-toggles';

const options = [
  { id: `${id}-label-1`, label: 'Label 1', defaultSelected: true },
  { id: `${id}-label-2`, label: 'Label 2' },
  { id: `${id}-label-3`, label: 'Label 3' },
];

export const SingleSelectRadioToggles = () => {
  return (
    <ToggleContainer>
      {options.map((option, index) => (
        <Toggle className="v-gap-6" htmlFor={option.id} key={`${id}-option-${index}`}>
          <Radio defaultChecked={option.defaultSelected} id={option.id} name={`${id}-options`} />
          {option.label}
        </Toggle>
      ))}
    </ToggleContainer>
  );
};
