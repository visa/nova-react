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
import { VisaMapLocationTiny, VisaViewGridTiny, VisaViewListTiny } from '@visa/nova-icons-react';
import { Toggle, ToggleContainer, UtilityFragment } from '@visa/nova-react';
import { useState } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'leading-icon-toggle';

const options = [
  { label: 'Label 1', id: `${id}-label-1`, icon: <VisaMapLocationTiny />, defaultSelected: true },
  { label: 'Label 2', id: `${id}-label-2`, icon: <VisaViewListTiny /> },
  { label: 'Label 3', id: `${id}-label-3`, icon: <VisaViewGridTiny /> },
];

export const LeadingIconToggles = () => {
  const [togglePressedState, setTogglePressedState] = useState(options.map(o => !!o.defaultSelected));

  const handleSingleSelectTogglePress = (pressedIndex: number) => {
    setTogglePressedState(options.map((_, buttonIndex) => pressedIndex === buttonIndex));
  };

  return (
    <ToggleContainer>
      {options.map((option, optionIndex) => (
        <UtilityFragment key={option.id} vGap={6}>
          <Toggle
            tag="button"
            aria-pressed={togglePressedState[optionIndex]}
            onClick={() => handleSingleSelectTogglePress(optionIndex)}
          >
            {option.icon}
            {option.label}
          </Toggle>
        </UtilityFragment>
      ))}
    </ToggleContainer>
  );
};
