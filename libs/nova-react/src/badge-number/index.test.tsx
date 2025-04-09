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

import BadgeNumber from './';

describe('BadgeNumber', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<BadgeNumber />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('v-badge v-badge-number v-typography-label-active');
    expect(container.firstElementChild?.tagName).toBe('DIV');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<BadgeNumber className="test-class" />);
    expect(container.firstElementChild?.className).toBe('v-badge v-badge-number v-typography-label-active test-class');
  });

  it('should render active type with correct classNames', () => {
    const { container } = render(<BadgeNumber active />);
    expect(container.firstElementChild?.className).toBe(
      'v-badge v-badge-active v-badge-number v-typography-label-active'
    );
  });
  it('should render critical type with correct classNames', () => {
    const { container } = render(<BadgeNumber badgeType="critical" />);
    expect(container.firstElementChild?.className).toBe(
      'v-badge v-badge-number v-badge-critical v-typography-label-active'
    );
  });

  it('should render neutral type with correct classNames', () => {
    const { container } = render(<BadgeNumber badgeType="neutral" />);
    expect(container.firstElementChild?.className).toBe(
      'v-badge v-badge-number v-badge-neutral v-typography-label-active'
    );
  });

  it('should render stable type with correct classNames', () => {
    const { container } = render(<BadgeNumber badgeType="stable" />);
    expect(container.firstElementChild?.className).toBe(
      'v-badge v-badge-number v-badge-stable v-typography-label-active'
    );
  });

  it('should render subtle type with correct classNames', () => {
    const { container } = render(<BadgeNumber badgeType="subtle" />);
    expect(container.firstElementChild?.className).toBe(
      'v-badge v-badge-number v-badge-subtle v-typography-label-active'
    );
  });

  it('should render warning type with correct classNames', () => {
    const { container } = render(<BadgeNumber badgeType="warning" />);
    expect(container.firstElementChild?.className).toBe(
      'v-badge v-badge-number v-badge-warning v-typography-label-active'
    );
  });

  it('should render clear type with correct classNames', () => {
    const { container } = render(<BadgeNumber clear />);
    expect(container.firstElementChild?.className).toBe(
      'v-badge v-badge-number v-badge-clear v-typography-label-active'
    );
  });

  it('should allow custom tags', () => {
    const { container } = render(<BadgeNumber tag="button" />);
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });

  it('should permeate basic props', () => {
    const { container } = render(<BadgeNumber aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(<BadgeNumber>Test Child</BadgeNumber>);
    expect(container.firstElementChild?.firstChild?.textContent).toBe('Test Child');
  });
});
