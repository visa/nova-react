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
import { Checkbox, Chip, Utility } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'selection-group-chip';

const chips = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7'];

export const SelectionGroupChip = () => {
  return (
    <Utility vFlex vFlexWrap vGap={8} style={{ inlineSize: '50%' }}>
      {chips.map((chip, index) => (
        <Chip chipType="selection" htmlFor={`${id}-${index}`} key={`${id}-${index}`} tag="label">
          <span>{chip}</span>
          <Checkbox id={`${id}-${index}`} />
        </Chip>
      ))}
    </Utility>
  );
};
