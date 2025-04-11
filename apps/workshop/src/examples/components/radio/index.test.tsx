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

import { DisabledPanelRadio } from './disabled-panel-radio';
import { DisabledRadio } from './disabled-radio';
import { DisabledSelectedRadio } from './disabled-selected-radio';
import { ErrorPanelGroupRadio } from './error-group-panel-radio';
import { ErrorGroupRadio } from './error-group-radio';
import { ErrorRadio } from './error-radio';
import { GroupPanelRadio } from './group-panel-radio';
import { GroupRadio } from './group-radio';
import { HorizontalGroupRadio } from './horizontal-group-radio';
import { SelectedRadio } from './selected-radio';
import { WithDescriptionPanelRadio } from './with-description-panel-radio';
import { WithDescriptionRadio } from './with-description-radio';
import { DefaultRadio } from './with-label-radio';
import { WithoutDescriptionPanelRadio } from './without-description-panel-radio';
import { NoLabelRadio } from './without-visible-label-radio';

const examples = [
  { Component: DisabledPanelRadio, title: metaData['disabled-panel-radio'].title },
  { Component: DisabledRadio, title: metaData['disabled-radio'].title },
  { Component: DisabledSelectedRadio, title: metaData['disabled-selected-radio'].title },
  { Component: ErrorPanelGroupRadio, title: metaData['error-group-panel-radio'].title },
  { Component: ErrorGroupRadio, title: metaData['error-group-radio'].title },
  { Component: ErrorRadio, title: metaData['error-radio'].title },
  { Component: GroupPanelRadio, title: metaData['group-panel-radio'].title },
  { Component: GroupRadio, title: metaData['group-radio'].title },
  { Component: HorizontalGroupRadio, title: metaData['horizontal-group-radio'].title },
  { Component: SelectedRadio, title: metaData['selected-radio'].title },
  { Component: WithDescriptionPanelRadio, title: metaData['with-description-panel-radio'].title },
  { Component: WithDescriptionRadio, title: metaData['with-description-radio'].title },
  { Component: DefaultRadio, title: metaData['with-label-radio'].title },
  { Component: WithoutDescriptionPanelRadio, title: metaData['without-description-panel-radio'].title },
  { Component: NoLabelRadio, title: metaData['without-visible-label-radio'].title },
];

describe('Radio examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('radio button with error', () => {
    it('should show error text when submit clicked', () => {
      render(<ErrorRadio />);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(screen.getByText('This is required text that describes the error in more detail.')).toBeInTheDocument();
    });
    it('should not show error text when submit clicked after radio click', () => {
      const { container } = render(<ErrorRadio />);
      const radio = screen.getByText('Label');
      fireEvent.click(radio);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(container.querySelector('#radio-message-error')).toBeNull();
    });

    it('should clear all inputs when clear selection clicked', () => {
      const { container } = render(<ErrorRadio />);
      const radio = container.querySelector<HTMLInputElement>('#radio-error')!;
      fireEvent.click(radio);
      const submitButton = screen.getByText('Reset');
      fireEvent.click(submitButton);
      expect(radio.checked).toBe(false);
    });
  });

  describe('radio button group with error', () => {
    it('should show error text when submit clicked', () => {
      render(<ErrorGroupRadio />);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(screen.getByText('This is required text that describes the error in more detail.')).toBeInTheDocument();
    });
    it('should not show error text when submit clicked after radio click', () => {
      const { container } = render(<ErrorGroupRadio />);
      const radio = screen.getByText('Label 1');
      fireEvent.click(radio);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(container.querySelector('#radio-message-9')).toBeNull();
    });

    it('should clear all inputs when clear selection clicked', () => {
      const { container } = render(<ErrorGroupRadio />);
      const radio = container.querySelector<HTMLInputElement>('#error-group-radio-option-2')!;
      fireEvent.click(radio);
      const submitButton = screen.getByText('Reset');
      fireEvent.click(submitButton);
      expect(radio.checked).toBe(false);
    });
  });

  describe('radio button panel group with error', () => {
    it('should show error text when submit clicked', () => {
      render(<ErrorPanelGroupRadio />);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(screen.getByText('This is required text that describes the error in more detail.')).toBeInTheDocument();
    });
    it('should not show error text when submit clicked after radio click', () => {
      const { container } = render(<ErrorPanelGroupRadio />);
      const radio = screen.getByText('Label 1');
      fireEvent.click(radio);
      const submitButton = screen.getByText('Submit');
      fireEvent.click(submitButton);
      expect(container.querySelector('#radio-panel-group-error-message-1')).toBeNull();
    });

    it('should clear all inputs when clear selection clicked', () => {
      const { container } = render(<ErrorPanelGroupRadio />);
      const radio = container.querySelector<HTMLInputElement>('#error-group-panel-radio-option-2')!;
      fireEvent.click(radio);
      const submitButton = screen.getByText('Reset');
      fireEvent.click(submitButton);
      expect(radio.checked).toBe(false);
    });
  });
});
