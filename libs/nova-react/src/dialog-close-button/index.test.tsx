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

import DialogCloseButton from '.';

describe('DialogCloseButton', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<DialogCloseButton />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe(
      'v-button v-button-small v-button-tertiary v-button-icon v-button-subtle -v-mt-20 -v-ml-12 -v-mr-18'
    );
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<DialogCloseButton className="test-class" />);
    expect(container.firstElementChild?.className).toBe(
      'v-button v-button-small v-button-tertiary v-button-icon v-button-subtle -v-mt-20 -v-ml-12 -v-mr-18 test-class'
    );
  });

  it('should render with aria-label', () => {
    const { container } = render(<DialogCloseButton ariaLabel="test-aria-label" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
  });

  it('should allow custom elements', () => {
    const { container } = render(<DialogCloseButton element={<a />} />);
    expect(container.firstElementChild?.tagName).toBe('A');
  });

  it('should permeate basic props', () => {
    const { container } = render(<DialogCloseButton aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(<DialogCloseButton>Test Child</DialogCloseButton>);
    expect(container.firstElementChild?.firstChild?.textContent).toBe('Test Child');
  });
});
