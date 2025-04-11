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
import { InputMessage, Radio, RadioPanel, Typography, Utility } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'group-panel-radio';

const radios = ['Label 1', 'Label 2', 'Label 3'];

export const GroupPanelRadio = () => {
  return (
    <fieldset aria-labelledby={`${id}-legend`}>
      <Typography id={`${id}-legend`} tag="legend" variant="label">
        Group label (required)
      </Typography>
      <Utility vFlex vFlexCol vGap={8}>
        {radios.map((radio, index) => (
          <RadioPanel className="v-align-items-start" htmlFor={`${id}-option-${index}`} key={`${id}-option-${index}`}>
            <Utility vFlex vGap={2} style={{ inlineSize: '100%' }}>
              <Radio className="v-flex-shrink-0" id={`${id}-option-${index}`} name={`${id}-options`} />
              <Utility vFlex vFlexCol vGap={2} vMarginVertical={8}>
                {radio}
                <InputMessage id={`${id}-radio-${index}-message`}>
                  This is optional text that describes the label in more detail.
                </InputMessage>
              </Utility>
            </Utility>
          </RadioPanel>
        ))}
      </Utility>
    </fieldset>
  );
};
