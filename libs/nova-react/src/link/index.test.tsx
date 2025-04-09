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

import Link from '.';

describe('Link', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<Link />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('v-link');
    expect(container.firstElementChild?.tagName).toBe('A');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<Link className="test-class" />);
    expect(container.firstElementChild?.className).toBe('v-link test-class');
  });

  it('should allow disabled state', () => {
    const { container } = render(<Link disabled />);
    expect(container.firstElementChild).toHaveAttribute('aria-disabled', 'true');
  });

  it('should allow disabled state with custom element', () => {
    const { container } = render(<Link element={<button />} disabled />);
    expect(container.firstElementChild).toHaveAttribute('aria-disabled', 'true');
  });

  it('should render alternate type with correct classNames', () => {
    const { container } = render(<Link alternate />);
    expect(container.firstElementChild?.className).toBe('v-link v-alternate');
  });

  it('should render skip-link type with correct classNames', () => {
    const { container } = render(<Link skipLink />);
    expect(container.firstElementChild?.className).toBe('v-link v-skip-link');
  });

  it('should render no underline type with correct classNames', () => {
    const { container } = render(<Link noUnderline />);
    expect(container.firstElementChild?.className).toBe('v-link v-link-no-underline');
  });

  it('should allow custom elements', () => {
    const { container } = render(<Link element={<button />} />);
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });

  it('should allow custom elements props', () => {
    const { container } = render(<Link element={<button disabled />} />);
    expect((container.firstElementChild as HTMLButtonElement)?.disabled).toBe(true);
  });

  it('should allow custom elements and merge classNames', () => {
    const { container } = render(<Link className="test-class-1" element={<button className="test-class-2" />} />);
    expect(container.firstElementChild?.className).toBe('v-link test-class-2 test-class-1');
  });

  it('should allow custom tags', () => {
    const { container } = render(<Link tag="button" />);
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });

  it('should permeate basic props', () => {
    const { container } = render(<Link aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(<Link>Test Child</Link>);
    expect(container.firstElementChild?.firstChild?.textContent).toBe('Test Child');
  });
});
