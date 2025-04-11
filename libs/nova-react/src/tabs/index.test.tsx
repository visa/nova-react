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

import Tabs from '.';

describe('Tabs', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<Tabs />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('v-tabs v-tabs-horizontal');
    expect(container.firstElementChild?.tagName).toBe('UL');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<Tabs className="test-class" />);
    expect(container.firstElementChild?.className).toBe('v-tabs v-tabs-horizontal test-class');
  });

  it('should render stacked type with correct classNames', () => {
    const { container } = render(<Tabs stacked />);
    expect(container.firstElementChild?.className).toBe('v-tabs v-tabs-horizontal v-tabs-stacked');
  });

  it('should render horizontal orientation with correct classNames', () => {
    const { container } = render(<Tabs orientation="horizontal" />);
    expect(container.firstElementChild?.className).toBe('v-tabs v-tabs-horizontal');
  });

  it('should render vertical orientation with correct classNames', () => {
    const { container } = render(<Tabs orientation="vertical" />);
    expect(container.firstElementChild?.className).toBe('v-tabs v-tabs-vertical');
  });

  it('should allow custom tag', () => {
    const { container } = render(<Tabs tag="button" />);
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });

  it('should permeate basic props', () => {
    const { container } = render(<Tabs aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(<Tabs>Test Child</Tabs>);
    expect(container.firstElementChild?.firstChild?.textContent).toBe('Test Child');
  });
});
