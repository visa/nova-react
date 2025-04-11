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
import { Label, Radio, Typography, Utility } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'group-radio';

const radios = ['Label 1', 'Label 2', 'Label 3'];

export const GroupRadio = () => {
  return (
    <fieldset>
      <Typography tag="legend" variant="label">
        Group label (required)
      </Typography>
      <Utility vFlex vFlexCol vGap={4}>
        {radios.map((radio, index) => (
          <Utility key={`${id}-option-${index}`} vAlignItems="center" vFlex vGap={2}>
            <Radio id={`${id}-option-${index}`} name={`${id}-options`} />
            <Label htmlFor={`${id}-option-${index}`}>{radio}</Label>
          </Utility>
        ))}
      </Utility>
    </fieldset>
  );
};
