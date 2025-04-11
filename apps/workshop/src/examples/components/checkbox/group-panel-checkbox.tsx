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
import { Checkbox, CheckboxPanel, InputMessage, Typography, Utility } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'group-panel-checkbox';

const checkboxes = [
  { label: 'Label 1', message: 'This is optional text that describes the label in more detail.' },
  { label: 'Label 2', message: 'This is optional text that describes the label in more detail.' },
  { label: 'Label 3', message: 'This is optional text that describes the label in more detail.' },
];

export const GroupPanelCheckbox = () => {
  return (
    <fieldset aria-labelledby={`${id}-legend`}>
      <Typography id={`${id}-legend`} tag="legend" variant="label">
        Group Label
      </Typography>
      <Utility vFlex vFlexCol vGap={8}>
        {checkboxes.map((checkbox, index) => {
          const optionId = `${id}-option-${index}`;
          const messageId = `${optionId}-option-${index}`;
          return (
            <CheckboxPanel className="v-align-items-start" key={optionId} htmlFor={optionId}>
              <Utility vFlex vGap={2} style={{ inlineSize: '100%' }}>
                <Checkbox aria-describedby={messageId} className="v-flex-shrink-0" id={optionId} name={optionId} />
                <Utility vFlex vFlexCol vGap={2} vMarginVertical={8}>
                  {checkbox.label}
                  <InputMessage id={messageId}>{checkbox.message}</InputMessage>
                </Utility>
              </Utility>
            </CheckboxPanel>
          );
        })}
      </Utility>
    </fieldset>
  );
};
