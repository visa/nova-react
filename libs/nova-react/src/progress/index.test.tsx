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
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import Progress from '.';

describe('Progress', () => {
  it('should render defaults correctly (linear)', async () => {
    const { container } = render(<Progress />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('v-progress v-progress-bar');
    expect(container.firstElementChild?.tagName).toBe('PROGRESS');
  });

  it('should render circular defaults correctly', async () => {
    const { container } = render(<Progress aria-label="default circular progress" progressType="circular" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('v-progress v-progress-circular');

    expect(container.firstElementChild?.tagName).toBe('DIV');
  });

  it('should pass props to progress linear correctly', () => {
    const { container } = render(
      <Progress
        className="test-class"
        completed
        invalid
        paused
        progressType="linear"
        style={{ width: 20 }}
        value={50}
      />
    );
    expect(container.firstElementChild?.className).toBe(
      'v-progress v-progress-bar v-progress-error v-progress-complete test-class'
    );
    expect(container.firstElementChild?.getAttribute('style')).toBe('animation-play-state: paused; width: 20px;');
  });

  it('should pass props to progress circular correctly', () => {
    const { container } = render(
      <Progress
        className="test-class"
        indeterminate
        paused
        progressSize={2}
        progressType="circular"
        style={{ width: 20 }}
        value={50}
      >
        Test
      </Progress>
    );
    expect(container.firstElementChild?.className).toBe(
      'v-progress v-progress-circular v-progress-indeterminate test-class'
    );
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      'animation-play-state: paused; --v-progress-circular-size: 2px; width: 20px;'
    );
  });
});
