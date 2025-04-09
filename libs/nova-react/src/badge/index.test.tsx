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

import Badge from '.';

describe('Badge', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<Badge />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('v-badge');
    expect(container.firstElementChild?.tagName).toBe('DIV');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<Badge className="test-class" />);
    expect(container.firstElementChild?.className).toBe('v-badge test-class');
  });

  it('should render active type with correct classNames', () => {
    const { container } = render(<Badge active />);
    expect(container.firstElementChild?.className).toBe('v-badge v-badge-active');
  });

  it('should render critical type with correct classNames', () => {
    const { container } = render(<Badge badgeType="critical" />);
    expect(container.firstElementChild?.className).toBe('v-badge v-badge-critical');
  });

  it('should render neutral type with correct classNames', () => {
    const { container } = render(<Badge badgeType="neutral" />);
    expect(container.firstElementChild?.className).toBe('v-badge v-badge-neutral');
  });

  it('should render stable type with correct classNames', () => {
    const { container } = render(<Badge badgeType="stable" />);
    expect(container.firstElementChild?.className).toBe('v-badge v-badge-stable');
  });

  it('should render subtle type with correct classNames', () => {
    const { container } = render(<Badge badgeType="subtle" />);
    expect(container.firstElementChild?.className).toBe('v-badge v-badge-subtle');
  });

  it('should render warning type with correct classNames', () => {
    const { container } = render(<Badge badgeType="warning" />);
    expect(container.firstElementChild?.className).toBe('v-badge v-badge-warning');
  });

  it('should render number variant with correct classNames', () => {
    const { container } = render(<Badge badgeVariant="number" />);
    expect(container.firstElementChild?.className).toBe('v-badge v-badge-number v-typography-label-active');
  });

  it('should render icon variant with correct classNames', () => {
    const { container } = render(<Badge badgeVariant="icon" />);
    expect(container.firstElementChild?.className).toBe('v-badge v-badge-icon');
  });

  it('should render clear type with correct classNames', () => {
    const { container } = render(<Badge clear />);
    expect(container.firstElementChild?.className).toBe('v-badge v-badge-clear');
  });

  it('should allow custom tags', () => {
    const { container } = render(<Badge tag="button" />);
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });

  it('should permeate basic props', () => {
    const { container } = render(<Badge aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(<Badge>Test Child</Badge>);
    expect(container.firstElementChild?.firstChild?.textContent).toBe('Test Child');
  });
});
