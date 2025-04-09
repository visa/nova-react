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
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import Tab from '.';

describe('Tab', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(
      <ul>
        <Tab data-testid="test-id" />
      </ul>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('test-id').className).toBe('v-tab');
    expect(screen.getByTestId('test-id').tagName).toBe('LI');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<Tab className="test-class" />);
    expect(container.firstElementChild?.className).toBe('v-tab test-class');
  });

  it('should allow custom tag', () => {
    const { container } = render(<Tab tag="button" />);
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });

  it('should allow section title', () => {
    const { container } = render(<Tab sectionTitle />);
    expect(container.firstElementChild?.className).toBe('v-tab v-tab-section-title');
  });

  it('should permeate basic props', () => {
    const { container } = render(<Tab aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(<Tab>Test Child</Tab>);
    expect(container.firstElementChild?.firstChild?.textContent).toBe('Test Child');
  });
});
