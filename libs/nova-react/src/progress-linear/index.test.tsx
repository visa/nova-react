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
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import ProgressLinear from '.';

describe('Progress', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<ProgressLinear />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('v-progress v-progress-bar');
    expect(container.firstElementChild?.tagName).toBe('PROGRESS');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<ProgressLinear className="test-class" />);
    expect(container.firstElementChild?.className).toBe('v-progress v-progress-bar test-class');
  });

  it('should render invalid type with correct classNames', () => {
    const { container } = render(<ProgressLinear invalid />);
    expect(container.firstElementChild?.className).toBe('v-progress v-progress-bar v-progress-error');
  });

  it('should render pause state with correct style', () => {
    const { container } = render(<ProgressLinear paused />);
    expect(container.firstElementChild?.getAttribute('style')).toBe('animation-play-state: paused;');
  });

  it('should permeate basic props', () => {
    const { container } = render(<ProgressLinear aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });
});
