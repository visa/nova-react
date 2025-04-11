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

import { UseFocusTrapExample } from './use-focus-trap-example';

const examples = [{ Component: UseFocusTrapExample, title: metaData['use-focus-trap-example'].title }];

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

describe('useFocusTrap example', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('dialog', () => {
    it('should open modal', () => {
      const { container } = render(<UseFocusTrapExample />);
      const button = screen.getByText('Open dialog');
      fireEvent.click(button);
      const modal = container.querySelector<HTMLDialogElement>('#use-focus-trap-usage')!;
      expect(modal.hasAttribute('open')).toBe(true);
    });
    it('should close modal', () => {
      const { container } = render(<UseFocusTrapExample />);
      const button = screen.getByText('Open dialog');
      fireEvent.click(button);
      const closeButton = container.querySelector('[aria-label="Close"]')!;
      fireEvent.click(closeButton);
      const modal = container.querySelector<HTMLDialogElement>('#use-focus-trap-usage')!;
      expect(modal.hasAttribute('open')).toBe(false);
    });
    it('should trap focus', async () => {
      render(<UseFocusTrapExample />);
      const button = screen.getByText('Open dialog');
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
});
