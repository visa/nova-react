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

import Tbody from '.';

describe('Tbody', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(
      <table>
        <Tbody data-testid="test-id" />
      </table>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('test-id').className).toBe('');
    expect(screen.getByTestId('test-id').tagName).toBe('TBODY');
  });

  it('should allow custom classNames', () => {
    render(
      <table>
        <Tbody className="test-class" data-testid="test-id" />
      </table>
    );
    expect(screen.getByTestId('test-id').className).toBe('test-class');
  });

  it('should permeate basic props', () => {
    render(
      <table>
        <Tbody aria-label="test-aria-label" data-testid="test-id" id="test-id" role="menu" />
      </table>
    );
    expect(screen.getByTestId('test-id').getAttribute('aria-label')).toBe('test-aria-label');
    expect(screen.getByTestId('test-id').getAttribute('id')).toBe('test-id');
    expect(screen.getByTestId('test-id').getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(
      <table>
        <Tbody>
          <tr></tr>
        </Tbody>
      </table>
    );
    expect(container.firstElementChild?.firstElementChild?.firstElementChild?.tagName).toBe('TR');
  });
});
