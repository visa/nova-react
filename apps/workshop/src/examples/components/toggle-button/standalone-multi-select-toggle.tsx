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
import { VisaMapLocationLow } from '@visa/nova-icons-react';
import { Toggle, ToggleContainer, UtilityFragment } from '@visa/nova-react';
import { useState } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'standalone-multi-select-toggle';

export const StandaloneMultiSelectToggle = () => {
  const [togglePressedState, setTogglePressedState] = useState<boolean>(false);

  const handleTogglePress = () => {
    setTogglePressedState(prevState => !prevState);
  };

  return (
    <ToggleContainer>
      <UtilityFragment vGap={6}>
        <Toggle id={id} tag="button" aria-label="Label 1" aria-pressed={togglePressedState} onClick={handleTogglePress}>
          <VisaMapLocationLow />
        </Toggle>
      </UtilityFragment>
    </ToggleContainer>
  );
};
