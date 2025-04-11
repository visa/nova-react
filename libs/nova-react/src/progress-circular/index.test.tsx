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
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import ProgressCircular from '.';

describe('Progress', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<ProgressCircular aria-label="default circular progress" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('v-progress v-progress-circular');
    expect(container.firstElementChild?.tagName).toBe('DIV');
  });

  it('should render indeterminate type with correct classNames', () => {
    const { container } = render(<ProgressCircular indeterminate />);
    expect(container.firstElementChild?.className).toBe('v-progress v-progress-circular v-progress-indeterminate');
  });

  it('should render pause state with correct style', () => {
    const { container } = render(<ProgressCircular paused progressSize={8} />);
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      'animation-play-state: paused; --v-progress-circular-size: 8px;'
    );
  });

  it('should render pause state with custom styles', () => {
    const { container } = render(<ProgressCircular paused progressSize={8} style={{ width: 20 }} />);
    expect(container.firstElementChild?.getAttribute('style')).toBe(
      'animation-play-state: paused; --v-progress-circular-size: 8px; width: 20px;'
    );
  });

  it('should render small size with correct classNames', () => {
    const { container } = render(<ProgressCircular progressSize="small" />);
    expect(container.firstElementChild?.className).toBe('v-progress v-progress-circular v-progress-circular-small');
  });

  it('should render custom size with correct classNames', () => {
    const { container } = render(<ProgressCircular progressSize={8} />);
    expect(container.firstElementChild?.className).toBe('v-progress v-progress-circular');
  });

  it('should permeate basic props', () => {
    const { container } = render(<ProgressCircular aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child for circular progress', () => {
    render(
      <ProgressCircular>
        <div data-testid="test-id"></div>
      </ProgressCircular>
    );
    expect(screen.getByTestId('test-id').tagName).toBe('DIV');
  });
});
