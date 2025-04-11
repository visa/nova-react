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
import { CSSProperties, forwardRef, useState } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'indeterminate-group-checkbox';

type Option = {
  checked?: boolean;
  children?: Option[];
  disabled?: boolean;
  label: string;
};

// NOTE: This example only works with one level of nesting. A different data structure and way of state management would be required for deeper nesting.
const defaultOptions: Option[] = [
  {
    label: 'L1 label 1',
    children: [
      {
        checked: true,
        label: 'L2 label 1',
      },
      {
        label: 'L2 label 2',
      },
      {
        label: 'L2 label 3',
      },
    ],
  },
];

type CheckboxGroupProps = {
  disabled?: boolean;
  invalid?: boolean;
  onCheckboxChange: (checked: boolean, parentIndex: number | undefined, childIndex: number) => void;
  options: Option[];
  parentId: string;
  parentIndex?: number;
};

const CheckboxGroup = forwardRef<HTMLInputElement, CheckboxGroupProps>(
  ({ disabled, invalid, onCheckboxChange, options, parentId, parentIndex }: CheckboxGroupProps, ref) =>
    options.map((option, index) => {
      const optionId = `${parentId}-option-${index}`;
      const someChildrenChecked = option.children?.some(child => child.checked);
      const someChildrenUnchecked = option.children?.some(child => !child.checked);
      const indeterminate = someChildrenChecked && someChildrenUnchecked;
      return (
        <Utility key={optionId} tag="li" vFlex vFlexCol>
          <Utility vAlignItems="center" vFlex vGap={2}>
            <Checkbox
              aria-invalid={invalid}
              checked={!indeterminate && (option.checked ?? false)}
              disabled={option.disabled || disabled}
              id={optionId}
              indeterminate={indeterminate}
              onChange={event => onCheckboxChange(event.currentTarget.checked, parentIndex, index)}
              ref={index === 0 ? ref : undefined}
            />
            <Label htmlFor={optionId}>{option.label}</Label>
          </Utility>
          {option?.children && (
            <Utility vFlex vFlexCol vMarginLeft={16} tag="ul">
              <CheckboxGroup
                disabled={option.disabled || disabled}
                invalid={invalid}
                onCheckboxChange={onCheckboxChange}
                options={option.children}
                parentId={optionId}
                parentIndex={(parentIndex || 0) + index}
              />
            </Utility>
          )}
        </Utility>
      );
    })
);

CheckboxGroup.displayName = 'CheckboxGroup';

export const IndeterminateGroupCheckbox = () => {
  const [options, setOptions] = useState(defaultOptions);

  const onCheckboxChange = (checked: boolean, parentIndex: number | undefined, childIndex: number) => {
    // Initialize our new options array
    const newOptions = [...options];

    const checkboxGroup = newOptions[parentIndex === undefined ? childIndex : parentIndex];
    const checkboxChild = checkboxGroup?.children && checkboxGroup?.children[childIndex];
    // If parentIndex is undefined then it is a parent checkbox change
    if (parentIndex === undefined) {
      checkboxGroup.checked = checked;
      checkboxGroup.children?.forEach(child => {
        child.checked = checked;
      });
    }
    // If children exist and they're all checked make sure the group is checked
    if (checkboxChild) {
      checkboxChild.checked = checked;
      const allChildrenChecked = checkboxGroup.children?.every(child => child?.checked) || false;
      checkboxGroup.checked = allChildrenChecked;
    }

    // Update the state
    setOptions(newOptions);
  };

  return (
    <fieldset aria-labelledby={`${id}-legend`} style={{ '--v-checkbox-group-gap': '8px' } as CSSProperties}>
      <Label id={`${id}-legend`} tag="legend">
        Group label
      </Label>
      <Utility tag="ul" vFlex vFlexCol>
        <CheckboxGroup onCheckboxChange={onCheckboxChange} options={options} parentId={id} />
      </Utility>
    </fieldset>
  );
};
