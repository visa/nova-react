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
import { act, fireEvent, render, screen } from '@testing-library/react';

import metaData from './meta.json';

import { UseButtonDebounceExample } from './use-button-debounce-example';

const examples = [{ Component: UseButtonDebounceExample, title: metaData['use-button-debounce-example'].title }];

beforeAll(() => jest.useFakeTimers());
afterAll(() => jest.useRealTimers());

describe('useDebounce example', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('button debounce', () => {
    it('should show success state after debounce and reset', () => {
      render(<UseButtonDebounceExample />);

      const submitButton = screen.getByText('Submit debounced');
      fireEvent.click(submitButton);

      // Advance timers by the delay
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(screen.queryByText('Button click successful, many thanks')).toBeInTheDocument();

      const resetButton = screen.getByText('Reset');
      fireEvent.click(resetButton);

      expect(screen.queryByText('Waiting for button click')).toBeInTheDocument();
    });
  });
});
