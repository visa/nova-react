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

import Panel from '../panel';

describe('Panel', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<Panel />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('v-panel');
    expect(container.firstElementChild?.tagName).toBe('DIV');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<Panel className="test-class" />);
    expect(container.firstElementChild?.className).toBe('v-panel test-class');
  });

  it('should render expandable type with the correct classNames', () => {
    const { container } = render(<Panel expandable />);
    expect(container.firstElementChild?.className).toBe('v-panel v-panel-expandable');
  });

  it('should render responsive type with the correct classNames', () => {
    const { container } = render(<Panel responsive />);
    expect(container.firstElementChild?.className).toBe('v-panel v-panel-responsive');
  });

  it('should allow custom tag', () => {
    const { container } = render(<Panel tag="button" />);
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });

  it('should permeate basic props', () => {
    const { container } = render(<Panel aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(<Panel>Test Child</Panel>);
    expect(container.firstElementChild?.firstChild?.textContent).toBe('Test Child');
  });
});
