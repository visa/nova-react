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
/* eslint-disable @cspell/spellchecker */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import metaData from './meta.json';

import { ActionButtonInput } from './action-button-input';
import { UsRegionAddressInput } from './address-input';
import { ClearButtonInput } from './clear-button-input';
import { CustomFormInput } from './custom-form-input';
import { CVVInput } from './cvv-input';
import { DefaultInput } from './default-input';
import { DisabledInput } from './disabled-input';
import { ErrorInput } from './error-input';
import { MaskButtonInput } from './mask-button-input';
import { ReadOnlyInput } from './read-only-input';
import { TextCountTextarea } from './text-count-textarea';
import { InitialValueInput } from './initial-value-input';
import { InlineMessageInput } from './inline-message-input';
import { PrefixInput } from './prefix-input';
import { SuffixInput } from './suffix-input';
import { LeadingIconInput } from './leading-icon-input';
import { OneTimePasscodeInput } from './one-time-passcode-input';
import { NativeResizeTextarea } from './native-resize-textarea';
import { NativeNoResizeTextarea } from './native-no-resize-textarea';
import { FixedHeightTextarea } from './fixed-height-textarea';
import { ResizeTextarea } from './resize-textarea';
import { NativeRowTextarea } from './native-row-textarea';
import { CustomInlineLabelInput } from './custom-inline-label-input';

const examples = [
  { Component: InitialValueInput, title: metaData['initial-value-input'].title },
  { Component: InlineMessageInput, title: metaData['inline-message-input'].title },
  { Component: PrefixInput, title: metaData['prefix-input'].title },
  { Component: SuffixInput, title: metaData['suffix-input'].title },
  { Component: LeadingIconInput, title: metaData['leading-icon-input'].title },
  { Component: OneTimePasscodeInput, title: metaData['one-time-passcode-input'].title },
  { Component: NativeResizeTextarea, title: metaData['native-resize-textarea'].title },
  { Component: NativeNoResizeTextarea, title: metaData['native-no-resize-textarea'].title },
  { Component: FixedHeightTextarea, title: metaData['fixed-height-textarea'].title },
  { Component: ResizeTextarea, title: metaData['resize-textarea'].title },
  { Component: NativeRowTextarea, title: metaData['native-row-textarea'].title },
  { Component: CustomInlineLabelInput, title: metaData['custom-inline-label-input'].title },
  {
    Component: DefaultInput,
    title: metaData['default-input'].title,
  },
  {
    Component: DisabledInput,
    title: metaData['disabled-input'].title,
  },
  {
    Component: ReadOnlyInput,
    title: metaData['read-only-input'].title,
  },
  {
    Component: ErrorInput,
    title: metaData['error-input'].title,
  },
  {
    Component: CVVInput,
    title: metaData['cvv-input'].title,
  },
  {
    Component: UsRegionAddressInput,
    title: metaData['address-input'].title,
  },
  {
    Component: TextCountTextarea,
    title: metaData['text-count-textarea'].title,
  },
];

describe('Input examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('clear button input', () => {
    it('should clear input', () => {
      const { container } = render(<ClearButtonInput />);
      const input = container.querySelector<HTMLInputElement>('#input-clear-button')!;
      fireEvent.change(input, { target: { value: 'Test' } });
      expect(container.querySelector<HTMLButtonElement>('[aria-label="Clear"]')).toBeInTheDocument();
      fireEvent.blur(input);
      expect(container.querySelector<HTMLButtonElement>('[aria-label="Clear"]')).not.toBeInTheDocument();
      fireEvent.focus(input);
      const clearButton = container.querySelector<HTMLButtonElement>('[aria-label="Clear"]')!;
      fireEvent.click(clearButton);
      expect(input.value).toBe('');
    });
  });

  describe('disabled input', () => {
    it('should toggle disabled state', () => {
      const { container } = render(<DisabledInput />);
      const disableInputCheckbox = container.querySelector<HTMLInputElement>('#disabled-input-checkbox')!;
      const input = container.querySelector<HTMLInputElement>('#disabled-input')!;
      expect(input.disabled).toBe(true);
      fireEvent.click(disableInputCheckbox);
      expect(input.disabled).toBe(false);
    });
  });

  describe('readonly input', () => {
    it('should toggle read only state', () => {
      const { container } = render(<ReadOnlyInput />);
      const readonlyInputCheckbox = container.querySelector<HTMLInputElement>('#input-readonly-checkbox')!;
      const input = container.querySelector<HTMLInputElement>('#input-readonly')!;
      expect(input.readOnly).toBe(true);
      fireEvent.click(readonlyInputCheckbox);
      expect(input.disabled).toBe(false);
    });
  });
  describe('error input', () => {
    it('should show error', () => {
      const { container } = render(<ErrorInput />);
      const errorButton = container.querySelector<HTMLButtonElement>('#input-error-submit-button')!;
      fireEvent.click(errorButton);
      expect(screen.getByText('This is required text that describes the error in more detail.')).toBeInTheDocument();
      const resetButton = container.querySelector<HTMLButtonElement>('#input-error-reset-button')!;
      fireEvent.click(resetButton);
      expect(screen.queryByText('This is required text that describes the error in more detail.')).toBeNull();
    });
    it('should handle changes', () => {
      const { container } = render(<ErrorInput />);
      const input = container.querySelector<HTMLInputElement>('#input-error')!;
      fireEvent.change(input, { target: { value: 'Test' } });
      expect(input.value).toBe('Test');
    });
  });

  describe('action button input', () => {
    it('should show input', () => {
      const { container } = render(<ActionButtonInput />);
      const showButton = container.querySelector('[aria-label="hide text"]')!;
      const input = container.querySelector<HTMLInputElement>('#input-action-button')!;
      fireEvent.change(input, { target: { value: 'password' } });
      fireEvent.click(showButton);
      expect(input.value).toBe('password');
    });
  });

  describe('mask button input', () => {
    it('should show input', () => {
      const { container } = render(<MaskButtonInput />);
      const showButton = container.querySelector('[aria-label="show text"]')!;
      const input = container.querySelector<HTMLInputElement>('#input-mask-button')!;
      fireEvent.click(showButton);
      expect(input.value).toBe('password');
    });
  });

  describe('custom form input', () => {
    it('should submit and alert', () => {
      const { container } = render(<CustomFormInput />);
      const input = container.querySelector<HTMLInputElement>('#input-form-control')!;
      window.alert = jest.fn();
      fireEvent.change(input, { target: { value: 'test' } });
      const submitButton = container.querySelector<HTMLButtonElement>('[type="submit"]')!;
      fireEvent.click(submitButton);
      expect(window.alert).toHaveBeenCalledWith('test submitted!');
    });
  });

  describe('textarea with fixed height and character counter', () => {
    it('should display the correct count', async () => {
      const { container } = render(<TextCountTextarea />);
      const textarea = container.querySelector<HTMLInputElement>('#text-count-textarea')!;
      expect(screen.getByText('400 characters remaining')).toBeInTheDocument();
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(screen.getByText('This is a required field')).toBeInTheDocument();
      fireEvent.change(textarea, { target: { value: '123456789' } });
      expect(screen.getByText('391 characters remaining')).toBeInTheDocument();
      fireEvent.change(textarea, {
        target: {
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui o',
        },
      });
      expect(screen.getByText('2 characters over limit')).toBeInTheDocument();
      const resetButton = screen.getByText('Reset');
      fireEvent.click(resetButton);
      expect(textarea.value).toBe('');
      expect(screen.queryByText('400 characters remaining')).toBeInTheDocument();
    });
    it('should display singular character counts', async () => {
      const { container } = render(<TextCountTextarea />);
      const textarea = container.querySelector<HTMLInputElement>('#text-count-textarea')!;
      fireEvent.change(textarea, {
        target: {
          value:
            'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui o',
        },
      });
      expect(screen.queryByText('1 character over limit')).toBeInTheDocument();
      fireEvent.change(textarea, {
        target: {
          value:
            'em ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui o',
        },
      });
      expect(screen.getByText('1 character remaining')).toBeInTheDocument();
    });
  });

  describe('cvv input', () => {
    it('should show error', () => {
      render(<CVVInput />);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(screen.getByText('Please choose a valid security code.')).toBeInTheDocument();
    });
    it('should reset error', () => {
      render(<CVVInput />);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      const resetButton = screen.getByText('Reset');
      fireEvent.click(resetButton);
      expect(screen.queryByText('Please choose a valid security code.')).not.toBeInTheDocument();
    });
    it('should show cvv', () => {
      const { container } = render(<CVVInput />);
      const input = container.querySelector<HTMLInputElement>('#cvv-input')!;
      act(() => {
        input.focus();
      });
      expect(input).toHaveAttribute('type', 'text');
    });
    it('should hide cvv', () => {
      const { container } = render(<CVVInput />);
      const input = container.querySelector<HTMLInputElement>('#cvv-input')!;
      act(() => {
        input.focus();
      });
      const submitButton = screen.getByText('Submit');
      act(() => {
        submitButton.focus();
      });
      expect(input).toHaveAttribute('type', 'password');
    });
    it('show alert if valid', () => {
      const windowMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
      const { container } = render(<CVVInput />);
      const submitButton = screen.getByText('Submit');
      const input = container.querySelector<HTMLInputElement>('#cvv-input')!;
      fireEvent.change(input, { target: { value: 123 } });
      fireEvent.click(submitButton);
      expect(windowMock).toHaveBeenCalled();
    });
  });
});
