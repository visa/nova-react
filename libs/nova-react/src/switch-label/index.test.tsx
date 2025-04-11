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

import SwitchLabel from '.';

describe('SwitchLabel', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<SwitchLabel />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('v-label v-switch-label');
    expect(container.firstElementChild?.tagName).toBe('LABEL');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<SwitchLabel className="test-class" />);
    expect(container.firstElementChild?.className).toBe('v-label v-switch-label test-class');
  });

  it('should allow custom tag', () => {
    const { container } = render(<SwitchLabel tag="button" />);
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });

  it('should permeate basic props', () => {
    const { container } = render(<SwitchLabel aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(<SwitchLabel>Test Child</SwitchLabel>);
    expect(container.firstElementChild?.firstChild?.textContent).toBe('Test Child');
  });
});
