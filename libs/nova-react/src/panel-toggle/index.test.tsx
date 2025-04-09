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

import PanelToggle from '.';

describe('PanelToggle', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<PanelToggle>Test PanelToggle</PanelToggle>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('v-button v-panel-toggle');
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<PanelToggle className="test-class" />);
    expect(container.firstElementChild?.className).toBe('v-button v-panel-toggle test-class');
  });

  it('should allow custom element', () => {
    const { container } = render(<PanelToggle element={<a />} />);
    expect(container.firstElementChild?.tagName).toBe('A');
  });

  it('should permeate basic props', () => {
    const { container } = render(<PanelToggle aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(<PanelToggle>Test Child</PanelToggle>);
    expect(container.firstElementChild?.firstChild?.textContent).toBe('Test Child');
  });
});
