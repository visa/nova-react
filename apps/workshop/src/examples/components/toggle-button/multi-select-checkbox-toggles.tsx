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
import { VisaMapLocationLow, VisaViewGridLow, VisaViewListLow } from '@visa/nova-icons-react';
import { Checkbox, Toggle, ToggleContainer } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'multi-select-checkbox-toggle';

const options = [
  { id: `${id}-label-1`, label: 'Label 1', icon: <VisaMapLocationLow />, checked: true },
  { id: `${id}-label-2`, label: 'Label 2', icon: <VisaViewListLow />, checked: false },
  { id: `${id}-label-3`, label: 'Label 3', icon: <VisaViewGridLow />, checked: true },
];

export const MultiSelectCheckboxToggles = () => {
  return (
    <ToggleContainer>
      {options.map(({ label, icon, checked }, index) => (
        <Toggle className="v-gap-6" aria-label={label} htmlFor={`${id}-option-${index}`} key={`${id}-option-${index}`}>
          <Checkbox defaultChecked={checked} id={`${id}-option-${index}`} name={`${id}-options`} /> {icon}
        </Toggle>
      ))}
    </ToggleContainer>
  );
};
