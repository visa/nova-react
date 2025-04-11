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

import Avatar from '.';

describe('Avatar', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<Avatar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('v-avatar');
    expect(container.firstElementChild?.tagName).toBe('SPAN');
  });

  it('should render small avatar with correct className', () => {
    const { container } = render(<Avatar small />);
    expect(container.firstElementChild?.className).toBe('v-avatar v-avatar-small');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<Avatar className="test-class" />);
    expect(container.firstElementChild?.className).toBe('v-avatar test-class');
  });

  it('should allow custom tags', () => {
    const { container } = render(<Avatar tag="button" />);
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });

  it('should permeate basic props', () => {
    const { container } = render(<Avatar aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(<Avatar>Test Child</Avatar>);
    expect(container.firstElementChild?.firstChild?.textContent).toBe('Test Child');
  });
});
