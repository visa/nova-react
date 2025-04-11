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
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import metaData from './meta.json';

import { CheckedCheckbox } from './checked-checkbox';
import { DefaultCheckbox } from './default-checkbox';
import { DisabledCheckedCheckbox } from './disabled-checked-checkbox';
import { DisabledPanelCheckbox } from './disabled-panel-checkbox';
import { DisabledUncheckedCheckbox } from './disabled-unchecked-checkbox';
import { ErrorPanelGroupCheckbox } from './error-group-panel-checkbox';
import { ErrorIndeterminateGroupCheckbox } from './error-indeterminate-group-checkbox';
import { GroupCheckbox } from './group-checkbox';
import { GroupHorizontalCheckbox } from './group-horizontal-checkbox';
import { GroupPanelCheckbox } from './group-panel-checkbox';
import { GroupWithValidationCheckbox } from './group-with-validation-checkbox';
import { IndeterminateGroupCheckbox } from './indeterminate-group-checkbox';
import { InlineMessageCheckbox } from './inline-message-checkbox';
import { StandaloneCheckbox } from './standalone-checkbox';
import { ValidationCheckbox } from './validation-checkbox';
import { WithDescriptionPanelCheckbox } from './with-description-panel-checkbox';
import { WithoutDescriptionPanelCheckbox } from './without-description-panel-checkbox';

const examples = [
  { Component: CheckedCheckbox, title: metaData['checked-checkbox'].title },
  { Component: DefaultCheckbox, title: metaData['default-checkbox'].title },
  { Component: DisabledCheckedCheckbox, title: metaData['disabled-checked-checkbox'].title },
  { Component: DisabledPanelCheckbox, title: metaData['disabled-panel-checkbox'].title },
  { Component: DisabledUncheckedCheckbox, title: metaData['disabled-unchecked-checkbox'].title },
  { Component: ErrorPanelGroupCheckbox, title: metaData['error-group-panel-checkbox'].title },
  { Component: ErrorIndeterminateGroupCheckbox, title: metaData['error-indeterminate-group-checkbox'].title },
  { Component: GroupCheckbox, title: metaData['group-checkbox'].title },
  { Component: GroupHorizontalCheckbox, title: metaData['group-horizontal-checkbox'].title },
  { Component: GroupPanelCheckbox, title: metaData['group-panel-checkbox'].title },
  { Component: GroupWithValidationCheckbox, title: metaData['group-with-validation-checkbox'].title },
  { Component: IndeterminateGroupCheckbox, title: metaData['indeterminate-group-checkbox'].title },
  { Component: InlineMessageCheckbox, title: metaData['inline-message-checkbox'].title },
  { Component: StandaloneCheckbox, title: metaData['standalone-checkbox'].title },
  { Component: ValidationCheckbox, title: metaData['validation-checkbox'].title },
  { Component: WithDescriptionPanelCheckbox, title: metaData['with-description-panel-checkbox'].title },
  { Component: WithoutDescriptionPanelCheckbox, title: metaData['without-description-panel-checkbox'].title },
];

describe('Checkbox examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('checkbox with error', () => {
    it('should show error text when submit clicked', () => {
      render(<ValidationCheckbox />);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(screen.getByText('This is required text that describes the error in more detail.')).toBeInTheDocument();
    });

    it('should not show error text when submit clicked', () => {
      const { container } = render(<ValidationCheckbox />);
      const checkbox = screen.getByText('Label');
      fireEvent.click(checkbox);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(container.querySelector('#error-checkbox-message')).not.toBeInTheDocument();
    });
  });

  describe('checkbox group with error', () => {
    it('should show error text when submit clicked', () => {
      render(<GroupWithValidationCheckbox />);
      const checkbox = screen.getByText('Label 2');
      fireEvent.click(checkbox);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(screen.getByText('This is required text that describes the error in more detail.')).toBeInTheDocument();
    });

    it('should not show error text when submit clicked', () => {
      const { container } = render(<GroupWithValidationCheckbox />);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(container.querySelector('#error-checkbox-message')).not.toBeInTheDocument();
    });
  });

  describe('indeterminate checkbox group', () => {
    it('checkbox group should be checked when all children are checked', () => {
      render(<IndeterminateGroupCheckbox />);
      const checkboxGroup = screen.getByLabelText<HTMLInputElement>('L1 label 1');
      expect(checkboxGroup.indeterminate).toBe(true);
      const checkbox1 = screen.getByText('L2 label 2');
      fireEvent.click(checkbox1);
      const checkbox2 = screen.getByText('L2 label 3');
      fireEvent.click(checkbox2);
      expect(checkboxGroup.indeterminate).toBe(false);
    });
    it('checkbox children should be checked when parent is checked', () => {
      render(<IndeterminateGroupCheckbox />);
      const checkboxGroup = screen.getByLabelText<HTMLInputElement>('L1 label 1');
      const checkbox2 = screen.getByLabelText<HTMLInputElement>('L2 label 1');
      fireEvent.click(checkboxGroup);
      expect(checkbox2.hasAttribute('checked')).toBe(true);
    });
  });
  describe('error indeterminate checkbox group', () => {
    it('should show error text when submit clicked', () => {
      render(<ErrorIndeterminateGroupCheckbox />);
      const checkbox = screen.getByText('L2 label 1');
      fireEvent.click(checkbox);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(screen.getByText('This is required text that describes the error in more detail.')).toBeInTheDocument();
    });
    it('checkbox children should be checked when parent is checked', () => {
      render(<ErrorIndeterminateGroupCheckbox />);
      const checkboxGroup = screen.getByLabelText<HTMLInputElement>('L1 label 1');
      fireEvent.click(checkboxGroup);
      expect(screen.queryByText('This is required text that describes the error in more detail.')).toBeNull();
    });
  });

  describe('checkbox panel group with error', () => {
    it('should show error text when submit clicked', () => {
      render(<ErrorPanelGroupCheckbox />);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(screen.getByText('This is required text that describes the error in more detail.')).toBeInTheDocument();
    });
    it('should not show error text when submit clicked', () => {
      render(<ErrorPanelGroupCheckbox />);
      const checkbox = screen.getByText('Label 1');
      fireEvent.click(checkbox);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(screen.queryByText('This is required text that describes the error in more detail.')).toBeNull();
    });
  });
});
