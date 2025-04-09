/**
 *              Copyright (c) 2025 Visa, Inc.
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

import { UseWizardExample } from './use-wizard-example';

const examples = [{ Component: UseWizardExample, title: metaData['use-wizard-example'].title }];

describe('useWizard example', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('useWizard example', () => {
    it('should have active on the step after clicking the button', () => {
      render(<UseWizardExample />);
      const nextButton = screen.getByText('Next step');

      fireEvent.click(nextButton);
      fireEvent.click(nextButton);

      const stepButton = screen.getByText('Step label 3');
      fireEvent.click(stepButton);
      expect(stepButton.className).toBe(
        'v-button v-button-tertiary v-typography-label-large-active v-typography-color-default v-gap-8'
      );
    });
    it('should have reset span style on the previous badge', () => {
      render(<UseWizardExample />);
      const nextButton = screen.getByText('Next step');
      const previousButton = screen.getByText('Previous step');

      fireEvent.click(nextButton);
      const step1Button = screen.getByText('Step label 1');
      const step2Button = screen.getByText('Step label 2');
      expect(step2Button.className).toBe(
        'v-button v-button-tertiary v-typography-label-large-active v-typography-color-default v-gap-8'
      );
      fireEvent.click(previousButton);
      expect(step1Button.className).toBe(
        'v-button v-button-tertiary v-typography-label-large-active v-typography-color-default v-gap-8'
      );
    });
    it('should have error style on the error badge', () => {
      render(<UseWizardExample />);
      const nextErrorButton = screen.getByText('Set step error');

      fireEvent.click(nextErrorButton);

      const stepButton = screen.getByText('Step label 1');

      expect(stepButton.children[0].className).toBe('v-badge v-badge-icon v-badge-critical');
    });
    it('should have complete style on the complete badge', () => {
      render(<UseWizardExample />);
      const nextSuccessButton = screen.getByText('Set step successful');

      fireEvent.click(nextSuccessButton);

      const stepButton = screen.getByText('Step label 1');

      expect(stepButton.children[0].className).toBe('v-badge v-badge-icon v-badge-stable');
    });
    it('should have reset the current step after reset the step status', () => {
      render(<UseWizardExample />);
      const nextSuccessButton = screen.getByText('Set step successful');
      const resetButton = screen.getByText('Reset current step');

      fireEvent.click(nextSuccessButton);
      const stepButton = screen.getByText('Step label 1');
      expect(stepButton.children[0].className).toBe('v-badge v-badge-icon v-badge-stable');

      fireEvent.click(resetButton);
      expect(stepButton.children[0].className).toBe('v-badge v-badge-active v-badge-icon v-badge-subtle');
    });

    it('should reset the wizard status after reset the wizard', () => {
      render(<UseWizardExample />);
      const nextSuccessButton = screen.getByText('Set step successful');
      const resetWizardButton = screen.getByText('Reset wizard');

      fireEvent.click(nextSuccessButton);
      const stepButton = screen.getByText('Step label 1');
      expect(stepButton.children[0].className).toBe('v-badge v-badge-icon v-badge-stable');

      fireEvent.click(resetWizardButton);
      expect(stepButton.children[0].className).toBe('v-badge v-badge-active v-badge-icon v-badge-subtle');
    });

    it('should reset the wizard status after reset the wizard to step 2', () => {
      render(<UseWizardExample />);
      const nextButton = screen.getByText('Next step');
      const resetWizardButton = screen.getByText('Reset to step 2');

      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      const step3Button = screen.getByText('Step label 3');
      const step2Button = screen.getByText('Step label 2');
      expect(step3Button.className).toBe(
        'v-button v-button-tertiary v-typography-body-2 v-typography-color-default v-gap-8'
      );

      fireEvent.click(resetWizardButton);
      expect(step2Button.className).toBe(
        'v-button v-button-tertiary v-typography-label-large-active v-typography-color-default v-gap-8'
      );
      expect(step3Button.children[0].className).toBe('v-badge v-badge-icon v-badge-subtle v-badge-clear');
    });
  });
});
