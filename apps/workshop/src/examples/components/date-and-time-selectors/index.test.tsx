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

import { DefaultDateSelector } from './default-date-selector';
import { ReadOnlyDateSelector } from './read-only-date-selector';
import { DisabledDateSelector } from './disabled-date-selector';
import { DateSelectorWithError } from './date-selector-with-error';
import { MinMaxDateInput } from './min-max-date-input';
import { DefaultDateRangeSelector } from './default-date-range-selector';
import { StackedDateRangeSelector } from './stacked-date-range-selector';
import { DefaultTimeSelector } from './default-time-selector';
import { ReadOnlyTimeSelector } from './read-only-time-selector';
import { DisabledTimeSelector } from './disabled-time-selector';
import { TimeSelectorWithError } from './time-selector-with-error';

const examples = [
  {
    Component: DefaultDateSelector,
    title: metaData['default-date-selector'].title,
  },
  {
    Component: ReadOnlyDateSelector,
    title: metaData['read-only-date-selector'].title,
  },
  {
    Component: DisabledDateSelector,
    title: metaData['disabled-date-selector'].title,
  },
  {
    Component: DateSelectorWithError,
    title: metaData['date-selector-with-error'].title,
  },
  {
    Component: MinMaxDateInput,
    title: metaData['min-max-date-input'].title,
  },
  {
    Component: DefaultDateRangeSelector,
    title: metaData['default-date-range-selector'].title,
  },
  {
    Component: StackedDateRangeSelector,
    title: metaData['stacked-date-range-selector'].title,
  },
  {
    Component: DefaultTimeSelector,
    title: metaData['default-time-selector'].title,
  },
  {
    Component: ReadOnlyTimeSelector,
    title: metaData['read-only-time-selector'].title,
  },
  {
    Component: DisabledTimeSelector,
    title: metaData['disabled-time-selector'].title,
  },
  {
    Component: TimeSelectorWithError,
    title: metaData['time-selector-with-error'].title,
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

  describe('date range', () => {
    it('should adjust ranges after changing end and start dates', () => {
      render(<DefaultDateRangeSelector />);
      const startDateInput = screen.getByLabelText<HTMLInputElement>('Start Date Label (required)');
      const endDateInput = screen.getByLabelText<HTMLInputElement>('End Date Label (required)')!;
      fireEvent.change(startDateInput, { target: { value: '2022-01-01' } });
      fireEvent.change(endDateInput, { target: { value: '2022-01-31' } });
      expect(startDateInput.max).toBe('2022-01-31');
      expect(endDateInput.min).toBe('2022-01-01');
    });
  });

  describe('stacked date range', () => {
    it('should adjust ranges after changing end and start dates', () => {
      render(<StackedDateRangeSelector />);
      const startDateInput = screen.getByLabelText<HTMLInputElement>('Start Date Label (required)');
      const endDateInput = screen.getByLabelText<HTMLInputElement>('End Date Label (required)')!;
      fireEvent.change(startDateInput, { target: { value: '2022-01-01' } });
      fireEvent.change(endDateInput, { target: { value: '2022-01-31' } });
      expect(startDateInput.max).toBe('2022-01-31');
      expect(endDateInput.min).toBe('2022-01-01');
    });
  });

  describe('date selector with error', () => {
    it('should show error', () => {
      const { container } = render(<DateSelectorWithError />);
      const errorButton = container.querySelector<HTMLButtonElement>('#date-selector-with-error-submit-button')!;
      fireEvent.click(errorButton);
      expect(screen.getByText('This is required text that describes the error in more detail.')).toBeInTheDocument();
      const resetButton = container.querySelector<HTMLButtonElement>('#date-selector-with-error-reset-button')!;
      fireEvent.click(resetButton);
      expect(screen.queryByText('This is required text that describes the error in more detail.')).toBeNull();
    });
  });
});

describe('time selector with error', () => {
  it('should show error', () => {
    const { container } = render(<TimeSelectorWithError />);
    const errorButton = container.querySelector<HTMLButtonElement>('#time-selector-with-error-submit-button')!;
    fireEvent.click(errorButton);
    expect(screen.getByText('This is required text that describes the error in more detail.')).toBeInTheDocument();
    const resetButton = container.querySelector<HTMLButtonElement>('#time-selector-with-error-reset-button')!;
    fireEvent.click(resetButton);
    expect(screen.queryByText('This is required text that describes the error in more detail.')).toBeNull();
  });
});