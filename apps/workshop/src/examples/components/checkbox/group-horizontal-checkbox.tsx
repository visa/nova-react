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
import { Checkbox, Label, Utility } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'group-horizontal-checkbox';

const checkboxes = ['Label 1', 'Label 2', 'Label 3', 'Label 4'];

export const GroupHorizontalCheckbox = () => {
  return (
    <fieldset aria-labelledby={`${id}-legend`}>
      <Label className="v-label" id={`${id}-legend`} tag="legend">
        Group label
      </Label>
      <Utility tag="ul" vFlex vFlexRow vFlexWrap vGap={24}>
        {checkboxes.map((checkbox, index) => (
          <Utility key={`${id}-option-${index}`} tag="li" vAlignItems="center" vFlex vGap={2}>
            <Checkbox id={`${id}-option-${index}`} />
            <Label htmlFor={`${id}-option-${index}`}>{checkbox}</Label>
          </Utility>
        ))}
      </Utility>
    </fieldset>
  );
};
