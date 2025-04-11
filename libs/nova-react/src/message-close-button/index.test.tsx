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

import MessageCloseButton from '.';

describe('MessageCloseButton', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<MessageCloseButton />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe(
      'v-button v-button-small v-button-tertiary v-button-icon v-button-subtle'
    );
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<MessageCloseButton className="test-class" />);
    expect(container.firstElementChild?.className).toBe(
      'v-button v-button-small v-button-tertiary v-button-icon v-button-subtle test-class'
    );
  });

  it('should render with aria-label', () => {
    const { container } = render(<MessageCloseButton ariaLabel="test-aria-label" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
  });

  it('should allow custom elements', () => {
    const { container } = render(<MessageCloseButton element={<a />} />);
    expect(container.firstElementChild?.tagName).toBe('A');
  });

  it('should permeate basic props', () => {
    const { container } = render(<MessageCloseButton aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(<MessageCloseButton>Test Child</MessageCloseButton>);
    expect(container.firstElementChild?.firstChild?.textContent).toBe('Test Child');
  });
});
