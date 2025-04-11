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
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import metaData from './meta.json';

import { BrowserRouter } from 'react-router-dom';
import { CloseButtonDialog } from './close-button-dialog';
import { DefaultDialog } from './default-dialog';
import { ErrorDialog } from './error-dialog';
import { SuccessDialog } from './success-dialog';
import { TouringTipsDialog } from './touring-tips-dialog';
import { WarningDialog } from './warning-dialog';

const examples = [
  { Component: CloseButtonDialog, title: metaData['close-button-dialog'].title },
  { Component: DefaultDialog, title: metaData['default-dialog'].title },
  { Component: ErrorDialog, title: metaData['error-dialog'].title },
  { Component: SuccessDialog, title: metaData['success-dialog'].title },
  { Component: TouringTipsDialog, title: metaData['touring-tips-dialog'].title },
  { Component: WarningDialog, title: metaData['warning-dialog'].title },
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

describe('Dialog examples', () => {
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

  describe('close button dialog', () => {
    it('should open modal', () => {
      const { container } = render(<CloseButtonDialog />);
      const button = screen.getByText('Open dialog without close icon');
      fireEvent.click(button);
      const modal = container.querySelector<HTMLDialogElement>('#no-close-dialog')!;
      expect(modal.hasAttribute('open')).toBe(true);
    });
    it('should close modal', () => {
      const { container } = render(<CloseButtonDialog />);
      const button = screen.getByText('Open dialog without close icon');
      fireEvent.click(button);
      const closeButton = screen.getByText('Close');
      fireEvent.click(closeButton);
      const modal = container.querySelector<HTMLDialogElement>('#no-close-dialog')!;
      expect(modal.hasAttribute('open')).toBe(false);
    });
    it('should trap focus', async () => {
      render(<CloseButtonDialog />);
      const button = screen.getByText('Open dialog without close icon');
      fireEvent.click(button);
      const user = userEvent.setup();
      await user.tab();
      await user.tab();
      await user.tab();
      const closeButton = screen.getByText('Close');
      expect(closeButton).toHaveFocus();
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      expect(closeButton).toHaveFocus();
    });
  });

  describe('default dialog', () => {
    it('should open modal', () => {
      const { container } = render(<DefaultDialog />);
      const button = screen.getByText('Open default dialog');
      fireEvent.click(button);
      const modal = container.querySelector<HTMLDialogElement>('#dialog')!;
      expect(modal.hasAttribute('open')).toBe(true);
    });
    it('should close modal', () => {
      const { container } = render(<DefaultDialog />);
      const button = screen.getByText('Open default dialog');
      fireEvent.click(button);
      const closeButton = container.querySelector('[aria-label="Close"]')!;
      fireEvent.click(closeButton);
      const modal = container.querySelector<HTMLDialogElement>('#dialog')!;
      expect(modal.hasAttribute('open')).toBe(false);
    });
    it('should trap focus', async () => {
      render(<DefaultDialog />);
      const button = screen.getByText('Open default dialog');
      fireEvent.click(button);
      const primaryButton = screen.getByText('Primary action');
      const user = userEvent.setup();
      await user.tab();
      await user.tab();
      await user.tab();
      await user.tab();
      await user.tab();
      expect(primaryButton).toHaveFocus();
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      expect(primaryButton).toHaveFocus();
    });
  });
  describe('error dialog', () => {
    it('should open modal', () => {
      const { container } = render(<ErrorDialog />);
      const button = screen.getByText('Open error dialog');
      fireEvent.click(button);
      const modal = container.querySelector<HTMLDialogElement>('#error-dialog')!;
      expect(modal.hasAttribute('open')).toBe(true);
    });
    it('should close modal', () => {
      const { container } = render(<ErrorDialog />);
      const button = screen.getByText('Open error dialog');
      fireEvent.click(button);
      const closeButton = container.querySelector('[aria-label="Close"]')!;
      fireEvent.click(closeButton);
      const modal = container.querySelector<HTMLDialogElement>('#error-dialog')!;
      expect(modal.hasAttribute('open')).toBe(false);
    });
    it('should trap focus', async () => {
      render(<ErrorDialog />);
      const button = screen.getByText('Open error dialog');
      const primaryButton = screen.getByText('Primary action');
      fireEvent.click(button);
      const user = userEvent.setup();
      await user.tab();
      await user.tab();
      expect(primaryButton).toHaveFocus();
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      expect(primaryButton).toHaveFocus();
    });
  });
  describe('success dialog', () => {
    it('should open modal', () => {
      const { container } = render(<SuccessDialog />);
      const button = screen.getByText('Open success dialog');
      fireEvent.click(button);
      const modal = container.querySelector<HTMLDialogElement>('#success-dialog')!;
      expect(modal.hasAttribute('open')).toBe(true);
    });
    it('should close modal', () => {
      const { container } = render(<SuccessDialog />);
      const button = screen.getByText('Open success dialog');
      fireEvent.click(button);
      const closeButton = container.querySelector('[aria-label="Close"]')!;
      fireEvent.click(closeButton);
      const modal = container.querySelector<HTMLDialogElement>('#success-dialog')!;
      expect(modal.hasAttribute('open')).toBe(false);
    });
    it('should trap focus', async () => {
      render(<SuccessDialog />);
      const button = screen.getByText('Open success dialog');
      const primaryButton = screen.getByText('Primary action');
      fireEvent.click(button);
      const user = userEvent.setup();
      await user.tab();
      await user.tab();
      expect(primaryButton).toHaveFocus();
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      expect(primaryButton).toHaveFocus();
    });
  });
  describe('warning dialog', () => {
    it('should open modal', () => {
      const { container } = render(<WarningDialog />);
      const button = screen.getByText('Open warning dialog');
      fireEvent.click(button);
      const modal = container.querySelector<HTMLDialogElement>('#warning-dialog')!;
      expect(modal.hasAttribute('open')).toBe(true);
    });
    it('should close modal', () => {
      const { container } = render(<WarningDialog />);
      const button = screen.getByText('Open warning dialog');
      fireEvent.click(button);
      const closeButton = container.querySelector('[aria-label="Close"]')!;
      fireEvent.click(closeButton);
      const modal = container.querySelector<HTMLDialogElement>('#warning-dialog')!;
      expect(modal.hasAttribute('open')).toBe(false);
    });
    it('should trap focus', async () => {
      render(<WarningDialog />);
      const button = screen.getByText('Open warning dialog');
      const primaryButton = screen.getByText('Primary action');
      fireEvent.click(button);
      const user = userEvent.setup();
      await user.tab();
      await user.tab();
      expect(primaryButton).toHaveFocus();
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      expect(primaryButton).toHaveFocus();
    });
  });

  describe('touring tips dialog', () => {
    it('should open modal', () => {
      const { container } = render(<TouringTipsDialog />);
      const button = screen.getByText('Open touring tips dialog');
      fireEvent.click(button);
      const modal = container.querySelector<HTMLDialogElement>('#touring-tips-dialog')!;
      expect(modal.hasAttribute('open')).toBe(true);
    });
    it('should close modal', () => {
      const { container } = render(<TouringTipsDialog />);
      const button = screen.getByText('Open touring tips dialog');
      fireEvent.click(button);
      const closeButton = container.querySelector('[aria-label="Close"]')!;
      fireEvent.click(closeButton);
      const modal = container.querySelector<HTMLDialogElement>('#touring-tips-dialog')!;
      expect(modal.hasAttribute('open')).toBe(false);
    });
    it('should trap focus', async () => {
      render(<TouringTipsDialog />);
      const button = screen.getByText('Open touring tips dialog');
      fireEvent.click(button);
      const primaryButton = screen.getByText('Previous');
      const user = userEvent.setup();
      await user.tab();
      await user.tab();
      await user.tab();
      await user.tab();
      await user.tab();
      expect(primaryButton).toHaveFocus();
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      expect(primaryButton).toHaveFocus();
    });
  });
});
