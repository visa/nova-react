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

import CheckboxPanel from '.';

describe('CheckboxPanel', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<CheckboxPanel />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('v-label v-checkbox-panel v-action v-action-secondary');
    expect(container.firstElementChild?.tagName).toBe('LABEL');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<CheckboxPanel className="test-class" />);
    expect(container.firstElementChild?.className).toBe(
      'v-label v-checkbox-panel v-action v-action-secondary test-class'
    );
  });

  it('should allow custom tags', () => {
    const { container } = render(<CheckboxPanel tag="button" />);
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });

  it('should permeate basic props', () => {
    const { container } = render(<CheckboxPanel aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(<CheckboxPanel>Test Child</CheckboxPanel>);
    expect(container.firstElementChild?.firstChild?.textContent).toBe('Test Child');
  });
});
