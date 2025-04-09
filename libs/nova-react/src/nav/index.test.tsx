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

import Nav from '.';

describe('Nav', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<Nav />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('v-nav');
    expect(container.firstElementChild?.tagName).toBe('NAV');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<Nav className="test-class" />);
    expect(container.firstElementChild?.className).toBe('v-nav test-class');
  });

  it('should render alternate type with correct classNames', () => {
    const { container } = render(<Nav alternate />);
    expect(container.firstElementChild?.className).toBe('v-nav v-alternate');
  });

  it('should render drawer type with correct classNames', () => {
    const { container } = render(<Nav drawer />);
    expect(container.firstElementChild?.className).toBe('v-nav v-nav-drawer');
  });

  it('should render horizontal orientation with correct classNames', () => {
    const { container } = render(<Nav orientation="horizontal" />);
    expect(container.firstElementChild?.className).toBe('v-nav v-nav-horizontal');
  });

  it('should render vertical orientation with correct classNames', () => {
    const { container } = render(<Nav orientation="vertical" />);
    expect(container.firstElementChild?.className).toBe('v-nav v-nav-vertical');
  });

  it('should allow custom tag', () => {
    const { container } = render(<Nav tag="button" />);
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });

  it('should permeate basic props', () => {
    const { container } = render(<Nav aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(<Nav>Test Child</Nav>);
    expect(container.firstElementChild?.firstChild?.textContent).toBe('Test Child');
  });
});
