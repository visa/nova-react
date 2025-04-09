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

import BadgeEllipse from './';

describe('BadgeEllipse', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<BadgeEllipse />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-tiny v-ellipse');
    expect(container.firstElementChild?.tagName).toBe('svg');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<BadgeEllipse className="test-class" />);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-tiny v-ellipse test-class');
  });

  it('should allow custom aria-labels', () => {
    const { container } = render(<BadgeEllipse aria-label="test label" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test label');
  });

  it('should have aria-hidden if custom aria-label is not provided', () => {
    const { container } = render(<BadgeEllipse />);
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
  });
});
