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
import { Button, Checkbox, InputMessage, Label, Utility, UtilityFragment } from '@visa/nova-react';
import { FormEvent, useRef, useState } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'group-with-validation-checkbox';

type CheckboxStats = {
  checked: boolean;
  label: string;
  required: boolean;
  value: string;
};

const defaultCheckboxStats: CheckboxStats[] = [
  {
    checked: false,
    label: 'Label 1',
    required: true,
    value: 'label-1',
  },
  {
    checked: true,
    label: 'Label 2',
    required: true,
    value: 'label-2',
  },
  {
    checked: false,
    label: 'Label 3',
    required: true,
    value: 'label-3',
  },
  {
    checked: false,
    label: 'Label 4',
    required: true,
    value: 'label-4',
  },
];

export const GroupWithValidationCheckbox = () => {
  const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [checkboxStats, setCheckboxStats] = useState(defaultCheckboxStats);
  const [invalid, setInvalid] = useState(false);

  const onCheckboxChange = (event: FormEvent<HTMLInputElement>, index: number) => {
    const { checked } = event.currentTarget;
    const newCheckboxStats = [...checkboxStats];
    newCheckboxStats[index].checked = checked;
    setCheckboxStats(newCheckboxStats);
  };

  const onSubmit = () => {
    // Check if any of the checkbox are checked
    const isInvalid = !checkboxStats.some(checkbox => checkbox.checked);
    // Set invalid state
    setInvalid(isInvalid);
    // If invalid focus on the first checkbox
    if (isInvalid) checkboxRefs.current[0]?.focus();
  };

  return (
    <>
      <fieldset aria-labelledby={`${id}-legend`}>
        <Label aria-describedby={`${id}-message`} id={`${id}-legend`} tag="legend">
          Group label
        </Label>
        <Utility tag="ul" vFlex vFlexCol>
          {checkboxStats.map((checkboxStat, index) => (
            <Utility key={index} tag="li" vAlignItems="center" vFlex vGap={2}>
              <Checkbox
                aria-invalid={invalid}
                checked={checkboxStat.checked}
                id={`${id}-option-${index}`}
                onChange={event => onCheckboxChange(event, index)}
                ref={ref => {
                  checkboxRefs.current[index] = ref;
                }}
                value={checkboxStat.value}
              />
              <Label htmlFor={`${id}-option-${index}`}>{checkboxStat.label}</Label>
            </Utility>
          ))}
        </Utility>

        <UtilityFragment vMarginTop={4}>
          <InputMessage aria-atomic="true" aria-live="assertive" id={`${id}-message`} role="alert" variant="body-3">
            {invalid && (
              <>
                <VisaErrorTiny />
                This is required text that describes the error in more detail.
              </>
            )}
          </InputMessage>
        </UtilityFragment>
      </fieldset>
      <UtilityFragment vMarginTop={12}>
        <Button onClick={onSubmit}>Submit</Button>
      </UtilityFragment>
    </>
  );
};
