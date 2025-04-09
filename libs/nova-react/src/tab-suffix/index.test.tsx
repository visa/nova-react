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

import TabSuffix from '.';
import Button from '../button';

describe('TabSuffix', () => {
  it('renders children correctly', () => {
    const { container } = render(
      <TabSuffix>
        <div>Test Content</div>
      </TabSuffix>
    );

    expect(container).toMatchSnapshot();
  });

  it('should allow custom elements', () => {
    const { container } = render(<TabSuffix element={<a />} />);
    expect(container.firstElementChild?.tagName).toBe('A');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<TabSuffix element={<div />} className="test-class" />);
    expect(container.firstElementChild?.className).toBe('v-tab-suffix test-class');
  });

  it('should permeate basic props', () => {
    const { container } = render(<TabSuffix aria-label="test-aria-label" element={<div />} id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(
      <TabSuffix>
        <Button />
      </TabSuffix>
    );
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });
});
