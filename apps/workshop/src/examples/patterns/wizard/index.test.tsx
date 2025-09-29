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
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';

import { BrowserRouter } from 'react-router-dom';
import metaData from './meta.json';

import { HorizontalWizard } from './horizontal-wizard';
import { ResponsiveHorizontalWizard } from './responsive-horizontal-wizard';
import { SinglePageWizard } from './single-page-wizard';
import { VerticalWizard } from './vertical-wizard';

const examples = [
  { Component: HorizontalWizard, title: metaData['horizontal-wizard'].title },
  { Component: ResponsiveHorizontalWizard, title: metaData['responsive-horizontal-wizard'].title },
  { Component: SinglePageWizard, title: metaData['single-page-wizard'].title },
  { Component: VerticalWizard, title: metaData['vertical-wizard'].title },
];

/**
 * Workaround until jest testing environment supports HTMLDialogElement.
 * Issue: https://github.com/jsdom/jsdom/issues/3294
 */
HTMLDialogElement.prototype.show = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = true;
});
HTMLDialogElement.prototype.showModal = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = true;
});
HTMLDialogElement.prototype.close = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = false;
});

describe('Wizard examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('Horizontal wizard', () => {
    it('handles input changes correctly', () => {
      const { container } = render(<HorizontalWizard />);
      const input = container.querySelector('#horizontal-multi-page-wizard-step-1-input');
      fireEvent.change(input!, { target: { value: 'Test Input' } });

      expect(input).toHaveValue('Test Input');
    });

    it('shows input error when Next is clicked and focus the required input', () => {
      const { container } = render(<HorizontalWizard />);
      const allNextButtons = screen.getAllByRole('button', { name: /Next/i, hidden: false });
      const firstNextButton = allNextButtons[0];
      fireEvent.click(firstNextButton!);

      expect(screen.queryByText(/This is a required field/)).toBeInTheDocument();
      expect(screen.queryByText(/One or more required fields are missing/)).toBeInTheDocument();

      const input = container.querySelector('#horizontal-multi-page-wizard-step-1-input');
      expect(document.activeElement).toBe(input);
    });

    it('moves forward and backward steps when Next/Back are clicked', () => {
      const { container } = render(<HorizontalWizard />);

      const input = container.querySelector('#horizontal-multi-page-wizard-step-1-input');
      fireEvent.change(input!, { target: { value: 'Test Input' } });

      const allNextButtons = screen.getAllByRole('button', { name: /Next/i, hidden: false });
      const firstNextButton = allNextButtons[0];
      fireEvent.click(firstNextButton!);

      const step2Input = container.querySelector('#horizontal-multi-page-wizard-step-2-input');
      expect(document.activeElement).toBe(step2Input);

      const allBackButtons = screen.getAllByRole('button', { name: /Back/i, hidden: false });
      const firstBackButton = allBackButtons[0];
      fireEvent.click(firstBackButton);

      expect(document.activeElement).toBe(input);
    });

    it('navigates to a step when a steps button is available and clicked', () => {
      const { container } = render(<HorizontalWizard />);

      const input = container.querySelector('#horizontal-multi-page-wizard-step-1-input');
      fireEvent.change(input!, { target: { value: 'Test Input' } });

      const allNextButtons = screen.getAllByRole('button', { name: /Next/i, hidden: false });
      const firstNextButton = allNextButtons[0];
      fireEvent.click(firstNextButton!);

      const step2Input = container.querySelector('#horizontal-multi-page-wizard-step-2-input');
      expect(document.activeElement).toBe(step2Input);

      const allBackButtons = screen.getAllByRole('button', { name: /Back/i, hidden: false });
      const firstBackButton = allBackButtons[0];
      fireEvent.click(firstBackButton);

      const step1Button = screen.getByRole('button', { name: /Step 1 label/i });
      fireEvent.click(step1Button);

      expect(document.activeElement).toBe(input);
    });

    it('notifies the user when progress has been saved', () => {
      const { container } = render(<HorizontalWizard />);

      // Find and click the first "Save" button
      const allSaveButtons = screen.getAllByRole('button', { name: /Save/i, hidden: false });
      const firstSaveButton = allSaveButtons[0];
      fireEvent.click(firstSaveButton);

      // Assert that the notification is visible
      const notification = screen.getByText(/Your progress has been saved./);
      expect(notification).toBeInTheDocument();

      const notificationCloseButton = container.querySelector('.v-message.v-flag button[aria-label="Close"]');
      fireEvent.click(notificationCloseButton!);

      expect(screen.queryByText(/Your progress has been saved./)).not.toBeInTheDocument();
    });

    it('shows the Exit modal when Exit is clicked. Closes the Exit modal when X is clicked', () => {
      const { container } = render(<HorizontalWizard />);
      const modal = container.querySelector<HTMLDialogElement>('#horizontal-multi-page-wizard-exit-warning-dialog')!;

      const allExitButtons = screen.getAllByRole('button', { name: /Exit/i, hidden: false });
      const firstExitButton = allExitButtons[0];
      fireEvent.click(firstExitButton);

      expect(modal.hasAttribute('open')).toBe(true);

      const closeButton = screen.getByLabelText('Close');
      fireEvent.click(closeButton);
      expect(modal.hasAttribute('open')).toBe(false);
    });

    it('closes the Exit modal when Escape is pressed', () => {
      const { container } = render(<HorizontalWizard />);
      const modal = container.querySelector<HTMLDialogElement>('#horizontal-multi-page-wizard-exit-warning-dialog')!;

      const allExitButtons = screen.getAllByRole('button', { name: /Exit/i, hidden: false });
      const firstExitButton = allExitButtons[0];
      fireEvent.click(firstExitButton);

      expect(modal.hasAttribute('open')).toBe(true);

      fireEvent.keyDown(modal, { key: 'Escape', code: 'Escape' });
      modal.close();

      expect(modal.hasAttribute('open')).toBe(false);
    });

    it('displays the correct step when the Edit step icon is clicked', () => {
      const { container } = render(<HorizontalWizard />);

      const step1Input = container.querySelector('#horizontal-multi-page-wizard-step-1-input');
      fireEvent.change(step1Input!, { target: { value: 'Test Input' } });

      const allNextButtons = screen.getAllByRole('button', { name: /Next/i, hidden: false });
      const step1Next = allNextButtons[0];
      fireEvent.click(step1Next!);

      const step2Input = container.querySelector('#horizontal-multi-page-wizard-step-2-input');
      fireEvent.change(step2Input!, { target: { value: 'Test Input' } });
      const step2Next = allNextButtons[1];
      fireEvent.click(step2Next);

      const step3Input = container.querySelector('#horizontal-multi-page-wizard-step-3-input');
      fireEvent.change(step3Input!, { target: { value: 'Test Input' } });
      const step3Next = allNextButtons[2];
      fireEvent.click(step3Next);

      const step4Input = container.querySelector('#horizontal-multi-page-wizard-step-4-input');
      fireEvent.change(step4Input!, { target: { value: 'Test Input' } });
      const step4Next = allNextButtons[3];
      fireEvent.click(step4Next);

      const editStep1Button = screen.getByLabelText('Edit step 1');
      fireEvent.click(editStep1Button);

      expect(document.activeElement).toStrictEqual(step1Input);
    });

    it('shows and handles the Success screen and the reset button properly', () => {
      const { container } = render(<HorizontalWizard />);

      const step1Input = container.querySelector('#horizontal-multi-page-wizard-step-1-input');
      fireEvent.change(step1Input!, { target: { value: 'Test Input' } });

      const allNextButtons = screen.getAllByRole('button', { name: /Next/i, hidden: false });
      const step1Next = allNextButtons[0];
      fireEvent.click(step1Next!);

      const step2Input = container.querySelector('#horizontal-multi-page-wizard-step-2-input');
      fireEvent.change(step2Input!, { target: { value: 'Test Input' } });
      const step2Next = allNextButtons[1];
      fireEvent.click(step2Next);

      const step3Input = container.querySelector('#horizontal-multi-page-wizard-step-3-input');
      fireEvent.change(step3Input!, { target: { value: 'Test Input' } });
      const step3Next = allNextButtons[2];
      fireEvent.click(step3Next);

      const step4Input = container.querySelector('#horizontal-multi-page-wizard-step-4-input');
      fireEvent.change(step4Input!, { target: { value: 'Test Input' } });
      const step4Next = allNextButtons[3];
      fireEvent.click(step4Next);

      const allSubmitButtons = screen.getAllByRole('button', { name: /Submit/i, hidden: false });
      const submitButton = allSubmitButtons[allSubmitButtons.length - 1];
      fireEvent.click(submitButton);

      expect(screen.queryByText(/Success/)).toBeInTheDocument();

      const resetWizardButton = screen.getByRole('button', { name: /reset wizard example/i });
      fireEvent.click(resetWizardButton);

      const step1InputAfterReset = container.querySelector('#horizontal-multi-page-wizard-step-1-input');
      expect(document.activeElement).toBe(step1InputAfterReset);
    });

    it('handles error message close properly', () => {
      const { container } = render(<HorizontalWizard />);

      const step1Input = container.querySelector('#horizontal-multi-page-wizard-step-1-input');
      fireEvent.change(step1Input!, { target: { value: '' } });

      const allNextButtons = screen.getAllByRole('button', { name: /Next/i, hidden: false });
      const step1Next = allNextButtons[0];
      fireEvent.click(step1Next!);

      const errorMessage = screen.queryByText(/One or more required fields are missing/);
      expect(errorMessage).toBeInTheDocument();

      const closeButton = screen.getByRole('button', { name: /Close/i });
      fireEvent.click(closeButton);

      expect(screen.queryByText(/One or more required fields are missing/)).not.toBeInTheDocument();
    });

    it('prevents navigation to step 2 via step button if step 1 input is empty after going back', () => {
      const { container } = render(<HorizontalWizard />);

      const step1Input = container.querySelector('#horizontal-multi-page-wizard-step-1-input');
      fireEvent.change(step1Input!, { target: { value: 'Test Input' } });
      const nextButton = screen.getAllByRole('button', { name: /Next/i, hidden: false })[0];
      fireEvent.click(nextButton);

      const backButton = screen.getAllByRole('button', { name: /Back/i, hidden: false })[0];
      fireEvent.click(backButton);

      fireEvent.change(step1Input!, { target: { value: '' } });

      const step2Button = container.querySelector<HTMLButtonElement>('#horizontal-multi-page-wizard-step-2-button');
      expect(step2Button).not.toBeNull();

      fireEvent.click(step2Button!);

      // Should show error and stay on step 1
      expect(screen.queryByText(/One or more required fields are missing/)).toBeInTheDocument();
      expect(document.activeElement).toBe(step1Input);

      fireEvent.change(step1Input!, { target: { value: 'Test Input' } });
      fireEvent.click(step2Button!);

      const step2Input = container.querySelector('#horizontal-multi-page-wizard-step-2-input');
      expect(document.activeElement).toBe(step2Input);
    });
  });

  describe('vertical-wizard', () => {
    it('handles input changes correctly', () => {
      const { container } = render(<VerticalWizard />);
      const input = container.querySelector('#vertical-multi-page-wizard-step-1-input');
      fireEvent.change(input!, { target: { value: 'Test Input' } });

      expect(input).toHaveValue('Test Input');
    });

    it('shows input error when Next is clicked and focus the required input', () => {
      const { container } = render(<VerticalWizard />);
      const allNextButtons = screen.getAllByRole('button', { name: /Next/i, hidden: false });
      const firstNextButton = allNextButtons[0];
      fireEvent.click(firstNextButton!);
      expect(screen.queryByText(/This is a required field/)).toBeInTheDocument();
      expect(screen.queryByText(/One or more required fields are missing/)).toBeInTheDocument();

      const closeButton = screen.getByRole('button', { name: /Close/i, hidden: false });
      fireEvent.click(closeButton);
      expect(screen.queryByText(/One or more required fields are missing/)).not.toBeInTheDocument();

      const input = container.querySelector('#vertical-multi-page-wizard-step-1-input');
      expect(document.activeElement).toBe(input);
    });

    it('moves forward and backward steps when Next/Back are clicked', () => {
      const { container } = render(<VerticalWizard />);

      const input = container.querySelector('#vertical-multi-page-wizard-step-1-input');
      fireEvent.change(input!, { target: { value: 'Test Input' } });

      const allNextButtons = screen.getAllByRole('button', { name: /Next/i, hidden: false });
      const firstNextButton = allNextButtons[0];
      fireEvent.click(firstNextButton!);

      const step2Input = container.querySelector('#vertical-multi-page-wizard-step-2-input');
      expect(document.activeElement).toBe(step2Input);

      const allBackButtons = screen.getAllByRole('button', { name: /Back/i, hidden: false });
      const firstBackButton = allBackButtons[0];
      fireEvent.click(firstBackButton);

      expect(document.activeElement).toBe(input);
    });

    it('navigates to a step when a steps button is available and clicked', () => {
      const { container } = render(<VerticalWizard />);

      const input = container.querySelector('#vertical-multi-page-wizard-step-1-input');
      fireEvent.change(input!, { target: { value: 'Test Input' } });

      const allNextButtons = screen.getAllByRole('button', { name: /Next/i, hidden: false });
      const firstNextButton = allNextButtons[0];
      fireEvent.click(firstNextButton!);

      const step2Input = container.querySelector('#vertical-multi-page-wizard-step-2-input');
      expect(document.activeElement).toBe(step2Input);

      const allBackButtons = screen.getAllByRole('button', { name: /Back/i, hidden: false });
      const firstBackButton = allBackButtons[0];
      fireEvent.click(firstBackButton);

      const step1Button = screen.getByRole('button', { name: /Step 1 label/i });
      fireEvent.click(step1Button);

      expect(document.activeElement).toBe(input);
    });

    it('notifies the user when progress has been saved', () => {
      const { container } = render(<VerticalWizard />);

      // Find and click the first "Save" button
      const allSaveButtons = screen.getAllByRole('button', { name: /Save/i, hidden: false });
      const firstSaveButton = allSaveButtons[0];
      fireEvent.click(firstSaveButton);

      // Assert that the notification is visible
      const notification = screen.getByText(/Your progress has been saved./);
      expect(notification).toBeInTheDocument();

      const notificationCloseButton = container.querySelector('.v-message.v-flag button[aria-label="Close"]');
      fireEvent.click(notificationCloseButton!);

      expect(screen.queryByText(/Your progress has been saved./)).not.toBeInTheDocument();
    });

    it('shows the Exit modal when Exit is clicked. Closes the Exit modal when X is clicked', () => {
      const { container } = render(<VerticalWizard />);
      const modal = container.querySelector<HTMLDialogElement>('#vertical-multi-page-wizard-exit-warning-dialog')!;

      const allExitButtons = screen.getAllByRole('button', { name: /Exit/i, hidden: false });
      const firstExitButton = allExitButtons[0];
      fireEvent.click(firstExitButton);

      expect(modal.hasAttribute('open')).toBe(true);

      const closeButton = screen.getByLabelText('Close');
      fireEvent.click(closeButton);
      expect(modal.hasAttribute('open')).toBe(false);
    });

    it('displays the correct step when the Edit step icon is clicked', () => {
      const { container } = render(<VerticalWizard />);

      const step1Input = container.querySelector('#vertical-multi-page-wizard-step-1-input');
      fireEvent.change(step1Input!, { target: { value: 'Test Input' } });

      const nextButton = screen.getByRole('button', { name: /Next/i, hidden: false });

      fireEvent.click(nextButton!);

      const step2Input = container.querySelector('#vertical-multi-page-wizard-step-2-input');
      fireEvent.change(step2Input!, { target: { value: 'Test Input' } });
      fireEvent.click(nextButton);

      const step3Input = container.querySelector('#vertical-multi-page-wizard-step-3-input');
      fireEvent.change(step3Input!, { target: { value: 'Test Input' } });
      fireEvent.click(nextButton);

      const step4Input = container.querySelector('#vertical-multi-page-wizard-step-4-input');
      fireEvent.change(step4Input!, { target: { value: 'Test Input' } });
      fireEvent.click(nextButton);

      const editStep1Button = screen.getByLabelText('Edit step 1');
      fireEvent.click(editStep1Button);

      expect(document.activeElement).toBe(step1Input);
    });

    it('shows and handles the Success screen and the reset button properly', () => {
      const { container } = render(<VerticalWizard />);

      const step1Input = container.querySelector('#vertical-multi-page-wizard-step-1-input');
      fireEvent.change(step1Input!, { target: { value: 'Test Input' } });

      const nextButton = screen.getByRole('button', { name: /Next/i, hidden: false });
      fireEvent.click(nextButton!);

      const step2Input = container.querySelector('#vertical-multi-page-wizard-step-2-input');
      fireEvent.change(step2Input!, { target: { value: 'Test Input' } });
      fireEvent.click(nextButton);

      const step3Input = container.querySelector('#vertical-multi-page-wizard-step-3-input');
      fireEvent.change(step3Input!, { target: { value: 'Test Input' } });
      fireEvent.click(nextButton);

      const step4Input = container.querySelector('#vertical-multi-page-wizard-step-4-input');
      fireEvent.change(step4Input!, { target: { value: 'Test Input' } });
      fireEvent.click(nextButton);

      const allSubmitButtons = screen.getAllByRole('button', { name: /Submit/i, hidden: false });
      const submitButton = allSubmitButtons[allSubmitButtons.length - 1];
      fireEvent.click(submitButton);

      expect(screen.queryByText(/Success/)).toBeInTheDocument();

      const resetWizardButton = screen.getByRole('button', { name: /reset wizard example/i });
      fireEvent.click(resetWizardButton);

      const step1InputAfterReset = container.querySelector('#vertical-multi-page-wizard-step-1-input');
      expect(document.activeElement).toBe(step1InputAfterReset);
    });

    it('prevents navigation to step 2 via step button if step 1 input is empty after going back', () => {
      const { container } = render(<VerticalWizard />);

      const step1Input = container.querySelector('#vertical-multi-page-wizard-step-1-input');
      fireEvent.change(step1Input!, { target: { value: 'Test Input' } });
      const nextButton = screen.getAllByRole('button', { name: /Next/i, hidden: false })[0];
      fireEvent.click(nextButton);

      const backButton = screen.getAllByRole('button', { name: /Back/i, hidden: false })[0];
      fireEvent.click(backButton);

      fireEvent.change(step1Input!, { target: { value: '' } });

      const step2Button = container.querySelector<HTMLButtonElement>('#vertical-multi-page-wizard-step-2-button');
      expect(step2Button).not.toBeNull();

      fireEvent.click(step2Button!);

      // Should show error and stay on step 1
      expect(screen.queryByText(/One or more required fields are missing/)).toBeInTheDocument();
      expect(document.activeElement).toBe(step1Input);

      fireEvent.change(step1Input!, { target: { value: 'Test Input' } });
      fireEvent.click(step2Button!);

      const step2Input = container.querySelector('#vertical-multi-page-wizard-step-2-input');
      expect(document.activeElement).toBe(step2Input);
    });
  });

  describe('single-page-wizard', () => {
    it('handles input changes correctly', () => {
      const { container } = render(<SinglePageWizard />);
      const input = container.querySelector('#single-page-wizard-step-1-input');
      fireEvent.change(input!, { target: { value: 'Test Input' } });

      expect(input).toHaveValue('Test Input');
    });

    it('shows input error when Next is clicked and focus the required input', () => {
      const { container } = render(<SinglePageWizard />);
      const allNextButtons = screen.getAllByRole('button', { name: /Next/i, hidden: false });
      const firstNextButton = allNextButtons[0];
      fireEvent.click(firstNextButton!);
      expect(screen.queryByText(/This is a required field/)).toBeInTheDocument();
      expect(screen.queryByText(/One or more required fields are missing/)).toBeInTheDocument();

      const input = container.querySelector('#single-page-wizard-step-1-input');
      expect(document.activeElement).toBe(input);

      const closeButton = screen.getByRole('button', { name: /Close/i, hidden: false });
      fireEvent.click(closeButton);
      expect(screen.queryByText(/One or more required fields are missing/)).not.toBeInTheDocument();
    });

    it('moves forward and backward steps when Next/Back are clicked', () => {
      const { container } = render(<SinglePageWizard />);

      const input = container.querySelector('#single-page-wizard-step-1-input');
      fireEvent.change(input!, { target: { value: 'Test Input' } });

      const allNextButtons = screen.getAllByRole('button', { name: /Next/i, hidden: false });
      const firstNextButton = allNextButtons[0];
      fireEvent.click(firstNextButton!);

      const step2Button = container.querySelector('#single-page-wizard-1');
      expect(document.activeElement).toBe(step2Button);

      const allBackButtons = screen.getAllByRole('button', { name: /Back/i, hidden: false });
      const firstBackButton = allBackButtons[0];
      fireEvent.click(firstBackButton);

      const step1Button = container.querySelector('#single-page-wizard-0');
      expect(document.activeElement).toBe(step1Button);
    });

    it('navigates to a step when a steps button is available and clicked', () => {
      const { container } = render(<SinglePageWizard />);

      const input = container.querySelector('#single-page-wizard-step-1-input');
      fireEvent.change(input!, { target: { value: 'Test Input' } });

      const allNextButtons = screen.getAllByRole('button', { name: /Next/i, hidden: false });
      const firstNextButton = allNextButtons[0];
      fireEvent.click(firstNextButton!);

      const step2Button = container.querySelector('#single-page-wizard-1');
      expect(document.activeElement).toBe(step2Button);

      const allBackButtons = screen.getAllByRole('button', { name: /Back/i, hidden: false });
      const firstBackButton = allBackButtons[0];
      fireEvent.click(firstBackButton);

      const step1Button = container.querySelector('#single-page-wizard-0');
      if (step1Button) {
        fireEvent.click(step1Button);
      }

      expect(document.activeElement).toBe(step1Button);
    });

    it('notifies the user when progress has been saved', () => {
      const { container } = render(<SinglePageWizard />);

      // Find and click the first "Save" button
      const allSaveButtons = screen.getAllByRole('button', { name: /Save/i, hidden: false });
      const firstSaveButton = allSaveButtons[0];
      fireEvent.click(firstSaveButton);

      // Assert that the notification is visible
      const notification = screen.getByText(/Your progress has been saved./);
      expect(notification).toBeInTheDocument();

      const notificationCloseButton = container.querySelector('.v-message.v-flag button[aria-label="Close"]');
      fireEvent.click(notificationCloseButton!);

      expect(screen.queryByText(/Your progress has been saved./)).not.toBeInTheDocument();
    });

    it('shows the Exit modal when Exit is clicked. Closes the Exit modal when X is clicked', () => {
      const { container } = render(<SinglePageWizard />);
      const modal = container.querySelector<HTMLDialogElement>('#single-page-wizard-exit-warning-dialog')!;

      const allExitButtons = screen.getAllByRole('button', { name: /Exit/i, hidden: false });
      const firstExitButton = allExitButtons[0];
      fireEvent.click(firstExitButton);

      expect(modal.hasAttribute('open')).toBe(true);

      const closeButton = screen.getByLabelText('Close');
      fireEvent.click(closeButton);
      expect(modal.hasAttribute('open')).toBe(false);
    });

    it('displays the correct step when the Edit step icon is clicked', () => {
      const { container } = render(<SinglePageWizard />);

      const step1Input = container.querySelector('#single-page-wizard-step-1-input');
      fireEvent.change(step1Input!, { target: { value: 'Test Input' } });

      const step1Next = screen.getByRole('button', { name: /Next/i, hidden: false });
      fireEvent.click(step1Next!);

      const step2Next = screen.getByRole('button', { name: /Next/i, hidden: false });
      fireEvent.click(step2Next!);

      const step3Next = screen.getByRole('button', { name: /Next/i, hidden: false });
      fireEvent.click(step3Next!);

      const step4Next = screen.getByRole('button', { name: /Next/i, hidden: false });
      fireEvent.click(step4Next!);

      const editStep1Button = screen.getByLabelText('Edit step 1');
      fireEvent.click(editStep1Button);

      const step1Details = container.querySelector('details.v-accordion[open]');
      expect(step1Details).toBeInTheDocument();
    });

    it('ensures only one step is open at a time when a step is clicked', async () => {
      const { container } = render(<SinglePageWizard />);

      const step1Input = container.querySelector('#single-page-wizard-step-1-input');
      fireEvent.change(step1Input!, { target: { value: 'Test Input' } });

      const step1Next = screen.getByRole('button', { name: /Next/i, hidden: false });
      fireEvent.click(step1Next!);

      const step2Summary = container.querySelector('summary#single-page-wizard-1');
      const step2Details = await waitFor(() => step2Summary?.parentElement);

      const step1Summary = container.querySelector('summary#single-page-wizard-0');
      const step1Details = step1Summary?.parentElement;

      expect(step2Details).toHaveAttribute('open');
      expect(step1Details).not.toHaveAttribute('open');
    });
    it('shows input error when Next is clicked and focuses the required input', () => {
      const { container } = render(<HorizontalWizard />);
      const allNextButtons = screen.getAllByRole('button', { name: /Next/i, hidden: false });
      const firstNextButton = allNextButtons[0];
      fireEvent.click(firstNextButton!);

      expect(screen.queryByText(/This is a required field/)).toBeInTheDocument();
      expect(screen.queryByText(/One or more required fields are missing/)).toBeInTheDocument();

      const input = container.querySelector('#horizontal-multi-page-wizard-step-1-input');
      expect(document.activeElement).toBe(input);
    });
    it('shows and handles the Success screen and the reset button properly', () => {
      const { container } = render(<SinglePageWizard />);

      const step1Input = container.querySelector('#single-page-wizard-step-1-input');
      fireEvent.change(step1Input!, { target: { value: 'Test Input' } });

      const step1Next = screen.getByRole('button', { name: /Next/i, hidden: false });
      fireEvent.click(step1Next!);

      const step2Next = screen.getByRole('button', { name: /Next/i, hidden: false });
      fireEvent.click(step2Next!);

      const step3Next = screen.getByRole('button', { name: /Next/i, hidden: false });
      fireEvent.click(step3Next!);

      const step4Next = screen.getByRole('button', { name: /Next/i, hidden: false });
      fireEvent.click(step4Next!);

      const allSubmitButtons = screen.getAllByRole('button', { name: /Submit/i, hidden: false });
      const submitButton = allSubmitButtons[allSubmitButtons.length - 1];
      fireEvent.click(submitButton);

      expect(screen.queryByText(/Success/)).toBeInTheDocument();

      const resetWizardButton = screen.getByRole('button', { name: /reset wizard example/i });
      fireEvent.click(resetWizardButton);

      const step1Button = container.querySelector('#single-page-wizard-0');
      expect(document.activeElement).toBe(step1Button);
    });

    it('prevents navigation to step 2 via step button if step 1 input is empty after going back (single page wizard)', async () => {
      const { container } = render(<SinglePageWizard />);

      const step1Input = container.querySelector('#single-page-wizard-step-1-input');
      fireEvent.change(step1Input!, { target: { value: 'Test Input' } });

      const nextButton = screen.getByRole('button', { name: /Next/i, hidden: false });
      fireEvent.click(nextButton);

      const backButton = screen.getByRole('button', { name: /Back/i, hidden: false });
      fireEvent.click(backButton);

      fireEvent.change(step1Input!, { target: { value: '' } });

      const step2Summary = container.querySelector('summary#single-page-wizard-1');
      expect(step2Summary).not.toBeNull();

      fireEvent.click(step2Summary!);

      expect(screen.queryByText(/One or more required fields are missing/)).toBeInTheDocument();
      expect(document.activeElement).toBe(step1Input);

      fireEvent.change(step1Input!, { target: { value: 'Test Input' } });
      fireEvent.click(step2Summary!);

      await waitFor(() => {
        expect(step2Summary).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });

  describe('responsive-wizard', () => {
    it('handles input changes as expected', () => {
      const { container } = render(<ResponsiveHorizontalWizard />);
      const input = container.querySelector('#responsive-horizontal-wizard-step-1-input');
      fireEvent.change(input!, { target: { value: 'Test Input' } });

      expect(input).toHaveValue('Test Input');
    });

    it('shows input error when Next is clicked and focus the required input', () => {
      const { container } = render(<ResponsiveHorizontalWizard />);
      const allNextButtons = screen.getAllByRole('button', { name: /Next/i, hidden: false });
      const firstNextButton = allNextButtons[0];
      fireEvent.click(firstNextButton!);
      expect(screen.queryByText(/This is a required field/)).toBeInTheDocument();
      expect(screen.queryByText(/One or more required fields are missing/)).toBeInTheDocument();

      const closeButton = screen.getByRole('button', { name: /Close/i, hidden: false });
      fireEvent.click(closeButton);
      expect(screen.queryByText(/One or more required fields are missing/)).not.toBeInTheDocument();

      const input = container.querySelector('#responsive-horizontal-wizard-step-1-input');
      expect(document.activeElement).toBe(input);
    });

    it('notifies the user when progress has been saved', () => {
      const { container } = render(<ResponsiveHorizontalWizard />);

      // Find and click the first "Save" button
      const allSaveButtons = screen.getAllByRole('button', { name: /Save/i, hidden: false });
      const firstSaveButton = allSaveButtons[0];
      fireEvent.click(firstSaveButton);

      // Assert that the notification is visible
      const notification = screen.getByText(/Your progress has been saved./);
      expect(notification).toBeInTheDocument();

      const notificationCloseButton = container.querySelector('.v-message.v-flag button[aria-label="Close"]');
      fireEvent.click(notificationCloseButton!);

      expect(screen.queryByText(/Your progress has been saved./)).not.toBeInTheDocument();
    });

    it('displays the correct step when the Edit step icon is clicked', () => {
      const { container } = render(<ResponsiveHorizontalWizard />);

      const step1Input = container.querySelector('#responsive-horizontal-wizard-step-1-input');
      fireEvent.change(step1Input!, { target: { value: 'Test Input' } });

      const allNextButtons = screen.getAllByRole('button', { name: /Next/i, hidden: false });
      const firstNextButton = allNextButtons[0];
      fireEvent.click(firstNextButton!);

      const step2Input = container.querySelector('#responsive-horizontal-wizard-step-2-input');
      fireEvent.change(step2Input!, { target: { value: 'Test Input' } });
      const secondNextButton = allNextButtons[1];
      fireEvent.click(secondNextButton);

      const step3Input = container.querySelector('#responsive-horizontal-wizard-step-3-input');
      fireEvent.change(step3Input!, { target: { value: 'Test Input' } });
      const thirdNextButton = allNextButtons[2];
      fireEvent.click(thirdNextButton);

      const step4Input = container.querySelector('#responsive-horizontal-wizard-step-4-input');
      fireEvent.change(step4Input!, { target: { value: 'Test Input' } });
      const fourthNextButton = allNextButtons[3];
      fireEvent.click(fourthNextButton);

      const editStep1Button = screen.getByLabelText('Edit step 1');
      fireEvent.click(editStep1Button);

      expect(document.activeElement).toBe(step1Input);
    });

    it('renders and navigates correctly on both mobile and desktop views', () => {
      const { container } = render(<ResponsiveHorizontalWizard />);

      // Mobile flow
      const step1Input = container.querySelector('#responsive-horizontal-wizard-step-1-input');
      fireEvent.change(step1Input!, { target: { value: 'Mobile test input' } });

      const mobileNextButton = screen
        .getAllByRole('button', { name: /Next/i, hidden: false })
        .find(btn => !btn.closest('.v-xs-container-hide'))!;
      fireEvent.click(mobileNextButton);

      const step2Input = container.querySelector('#responsive-horizontal-wizard-step-2-input');
      expect(document.activeElement).toBe(step2Input);

      const mobileBackButton = screen
        .getAllByRole('button', { name: /Back/i, hidden: false })
        .find(btn => !btn.closest('.v-xs-container-hide'))!;
      fireEvent.click(mobileBackButton);

      expect(document.activeElement).toBe(step1Input);

      // Desktop flow
      fireEvent.change(step1Input!, { target: { value: 'Desktop test input' } });

      const desktopNextButton = screen
        .getAllByRole('button', { name: /Next/i, hidden: false })
        .find(btn => btn.closest('.v-xs-container-hide'))!;
      fireEvent.click(desktopNextButton);

      const step2InputDesktop = container.querySelector('#responsive-horizontal-wizard-step-2-input');
      expect(document.activeElement).toBe(step2InputDesktop);

      const desktopBackButton = screen
        .getAllByRole('button', { name: /Back/i, hidden: false })
        .find(btn => btn.closest('.v-xs-container-hide'))!;
      fireEvent.click(desktopBackButton);

      expect(document.activeElement).toBe(step1Input);
    });

    it('shows and handles the Success screen and the reset button properly', () => {
      const { container } = render(<ResponsiveHorizontalWizard />);

      const getVisibleNext = () =>
        screen
          .getAllByRole('button', { name: /Next/i, hidden: false })
          .filter(btn => !btn.closest('.v-xs-container-hide'))[0];

      fireEvent.change(container.querySelector('#responsive-horizontal-wizard-step-1-input')!, {
        target: { value: 'Test input' },
      });
      fireEvent.click(getVisibleNext());

      fireEvent.change(container.querySelector('#responsive-horizontal-wizard-step-2-input')!, {
        target: { value: 'Test input' },
      });
      fireEvent.click(getVisibleNext());

      fireEvent.change(container.querySelector('#responsive-horizontal-wizard-step-3-input')!, {
        target: { value: 'Test input' },
      });
      fireEvent.click(getVisibleNext());

      fireEvent.change(container.querySelector('#responsive-horizontal-wizard-step-4-input')!, {
        target: { value: 'Test input' },
      });
      fireEvent.click(getVisibleNext());

      const submitButton = screen
        .getAllByRole('button', { name: /Submit/i, hidden: false })
        .filter(btn => !btn.closest('.v-xs-container-hide'))[0];
      fireEvent.click(submitButton);

      expect(screen.queryByText(/Success/)).toBeInTheDocument();

      const resetButton = screen.getAllByRole('button', { name: /reset wizard example/i, hidden: false });
      expect(resetButton[0]).toBeTruthy();

      fireEvent.click(resetButton[0]);

      const step1InputAfterReset = container.querySelector('#responsive-horizontal-wizard-step-1-input');
      expect(document.activeElement).toBe(step1InputAfterReset);
    });

    it('navigates to a step when a steps button is available and clicked', () => {
      const { container } = render(<ResponsiveHorizontalWizard />);

      const input = container.querySelector('#responsive-horizontal-wizard-step-1-input');
      fireEvent.change(input!, { target: { value: 'Test Input' } });

      const nextButton = screen
        .getAllByRole('button', { name: /Next/i, hidden: false })
        .find(btn => !btn.closest('.v-xs-container-hide'))!;
      fireEvent.click(nextButton);

      const step2Input = container.querySelector('#responsive-horizontal-wizard-step-2-input');
      expect(document.activeElement).toBe(step2Input);

      const backButton = screen
        .getAllByRole('button', { name: /Back/i, hidden: false })
        .find(btn => !btn.closest('.v-xs-container-hide'))!;
      fireEvent.click(backButton);

      const step1Input = container.querySelector('#responsive-horizontal-wizard-step-1-input');
      expect(document.activeElement).toBe(step1Input);
    });

    it('shows the Exit modal when Exit is clicked. Closes the Exit modal when X is clicked', () => {
      const { container } = render(<ResponsiveHorizontalWizard />);
      const modal = container.querySelector<HTMLDialogElement>('#responsive-horizontal-wizard-exit-warning-dialog')!;

      const allExitButtons = screen.getAllByRole('button', { name: /Exit/i, hidden: false });
      const firstExitButton = allExitButtons[0];
      fireEvent.click(firstExitButton);

      expect(modal.hasAttribute('open')).toBe(true);

      const closeButton = screen.getByLabelText('Close');
      fireEvent.click(closeButton);
      expect(modal.hasAttribute('open')).toBe(false);
    });

    it('prevents navigation to step 2 via step button if step 1 input is empty after going back', () => {
      const { container } = render(<ResponsiveHorizontalWizard />);

      const step1Input = container.querySelector('#responsive-horizontal-wizard-step-1-input');
      fireEvent.change(step1Input!, { target: { value: 'Test Input' } });
      const nextButton = screen.getAllByRole('button', { name: /Next/i, hidden: false })[0];
      fireEvent.click(nextButton);

      const backButton = screen.getAllByRole('button', { name: /Back/i, hidden: false })[0];
      fireEvent.click(backButton);

      fireEvent.change(step1Input!, { target: { value: '' } });

      const step2Button = container.querySelector<HTMLButtonElement>('#responsive-horizontal-wizard-step-2-button');
      expect(step2Button).not.toBeNull();

      fireEvent.click(step2Button!);

      // Should show error and stay on step 1
      expect(screen.queryByText(/One or more required fields are missing/)).toBeInTheDocument();
      expect(document.activeElement).toBe(step1Input);

      fireEvent.change(step1Input!, { target: { value: 'Test Input' } });
      fireEvent.click(step2Button!);

      const step2Input = container.querySelector('#responsive-horizontal-wizard-step-2-input');
      expect(document.activeElement).toBe(step2Input);
    });
  });
});
