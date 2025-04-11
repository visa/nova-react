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

import Button from '.';

describe('Button', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<Button>V-Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('v-button');
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<Button className="test-class" />);
    expect(container.firstElementChild?.className).toBe('v-button test-class');
  });

  it('should render alternate type with correct classNames', () => {
    const { container } = render(<Button alternate />);
    expect(container.firstElementChild?.className).toBe('v-button v-alternate');
  });

  it('should render large size with correct classNames', () => {
    const { container } = render(<Button buttonSize="large" />);
    expect(container.firstElementChild?.className).toBe('v-button v-button-large');
  });

  it('should render small size with correct classNames', () => {
    const { container } = render(<Button buttonSize="small" />);
    expect(container.firstElementChild?.className).toBe('v-button v-button-small');
  });

  it('should render secondary color scheme with correct classNames', () => {
    const { container } = render(<Button colorScheme="secondary" />);
    expect(container.firstElementChild?.className).toBe('v-button v-button-secondary');
  });

  it('should render tertiary color scheme with correct classNames', () => {
    const { container } = render(<Button colorScheme="tertiary" />);
    expect(container.firstElementChild?.className).toBe('v-button v-button-tertiary');
  });

  it('should render destructive type with correct classNames', () => {
    const { container } = render(<Button destructive />);
    expect(container.firstElementChild?.className).toBe('v-button v-button-destructive');
  });

  it('should render icon type with correct classNames', () => {
    const { container } = render(<Button iconButton />);
    expect(container.firstElementChild?.className).toBe('v-button v-button-icon');
  });

  it('should render stacked type with correct classNames', () => {
    const { container } = render(<Button stacked />);
    expect(container.firstElementChild?.className).toBe('v-button v-button-stacked');
  });

  it('should render subtle type with correct classNames', () => {
    const { container } = render(<Button subtle />);
    expect(container.firstElementChild?.className).toBe('v-button v-button-subtle');
  });

  it('should render two tone type with correct classNames', () => {
    const { container } = render(<Button iconTwoColor />);
    expect(container.firstElementChild?.className).toBe('v-button v-icon-two-color');
  });

  it('should render multiple types with correct classNames', () => {
    const { container } = render(
      <Button alternate buttonSize="large" colorScheme="secondary" destructive iconButton iconTwoColor stacked subtle />
    );
    expect(container.firstElementChild?.className).toBe(
      'v-button v-alternate v-button-large v-button-secondary v-button-destructive v-button-icon v-icon-two-color v-button-stacked v-button-subtle'
    );
  });

  it('should allow custom elements', () => {
    const { container } = render(<Button element={<a />} />);
    expect(container.firstElementChild?.tagName).toBe('A');
  });

  it('should allow custom props on custom elements', () => {
    const { container } = render(<Button element={<a href="hi" />} />);
    expect(container.firstElementChild).toHaveAttribute('href', 'hi');
  });

  it('should allow custom elements and merge classNames', () => {
    const { container } = render(<Button className="test-class-1" element={<a className="test-class-2" />} />);
    expect(container.firstElementChild?.className).toBe('v-button test-class-1 test-class-2');
  });

  it('should allow custom tags', () => {
    const { container } = render(<Button tag="a" />);
    expect(container.firstElementChild?.tagName).toBe('A');
  });

  it('should permeate basic props', () => {
    const { container } = render(<Button aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(<Button>Test Child</Button>);
    expect(container.firstElementChild?.firstChild?.textContent).toBe('Test Child');
  });
});
