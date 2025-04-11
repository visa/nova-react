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
import { VisaErrorTiny } from '@visa/nova-icons-react';
import { FormEvent, useRef, useState } from 'react';
import { Button, Checkbox, CheckboxPanel, InputMessage, Typography, Utility } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'error-group-panel-checkbox';

type Option = {
  checked: boolean;
  label: string;
  value: string;
  message?: string;
};

const defaultOptions: Option[] = [
  {
    checked: false,
    label: 'Label 1',
    message: 'This is optional text that describes the label in more detail.',
    value: 'label-1',
  },
  {
    checked: false,
    label: 'Label 2',
    message: 'This is optional text that describes the label in more detail.',
    value: 'label-2',
  },
  {
    checked: false,
    label: 'Label 3',
    message: 'This is optional text that describes the label in more detail.',
    value: 'label-3',
  },
];

export const ErrorPanelGroupCheckbox = () => {
  const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [options, setOptions] = useState(defaultOptions);
  const [invalid, setInvalid] = useState(false);

  const onCheckboxChange = (event: FormEvent<HTMLInputElement>, index: number) => {
    const { checked } = event.currentTarget;
    const newOptions = [...options];
    newOptions[index].checked = checked;
    setOptions(newOptions);
  };

  const onSubmit = () => {
    // Check if any of the checkbox are checked
    const isInvalid = !options.some(checkbox => checkbox.checked);
    // Set invalid state
    setInvalid(isInvalid);
    // If invalid focus on the first checkbox
    if (isInvalid) checkboxRefs.current[0]?.focus();
  };

  return (
    <>
      <fieldset aria-labelledby={`${id}-legend`}>
        <Typography aria-describedby={`${id}-message`} id={`${id}-legend`} tag="legend" variant="label">
          Group Label
        </Typography>
        <Utility vFlex vFlexCol vGap={8}>
          {options.map((option, index) => {
            const optionId = `${id}-option-${index}`;
            const messageId = `${optionId}-message`;
            return (
              <Utility element={<CheckboxPanel />} htmlFor={optionId} key={optionId} vAlignItems="start">
                <Utility vFlex vGap={2} style={{ inlineSize: '100%' }}>
                  <Checkbox
                    aria-describedby={messageId}
                    aria-invalid={invalid}
                    checked={option.checked}
                    className="v-flex-shrink-0"
                    id={optionId}
                    onChange={event => onCheckboxChange(event, index)}
                    ref={ref => {
                      checkboxRefs.current[index] = ref;
                    }}
                    value={option.value}
                  />
                  <Utility vFlex vFlexCol vGap={2} vMarginVertical={8}>
                    {option.label}
                    <InputMessage id={messageId}>{option.message}</InputMessage>
                  </Utility>
                </Utility>
              </Utility>
            );
          })}
        </Utility>
        <InputMessage aria-atomic="true" aria-live="assertive" id={`${id}-message`} role="alert" variant="body-3">
          {invalid && (
            <>
              <VisaErrorTiny />
              This is required text that describes the error in more detail.
            </>
          )}
        </InputMessage>
      </fieldset>
      <Button onClick={onSubmit}>Submit</Button>
    </>
  );
};
