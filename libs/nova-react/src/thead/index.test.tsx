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
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import Thead from '.';

describe('Thead', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(
      <table>
        <Thead data-testid="test-id"></Thead>
      </table>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('test-id').className).toBe('');
    expect(screen.getByTestId('test-id').tagName).toBe('THEAD');
  });

  it('should allow custom classNames', () => {
    render(
      <table>
        <Thead className="test-class" data-testid="test-id"></Thead>
      </table>
    );
    expect(screen.getByTestId('test-id').className).toBe('test-class');
  });

  it('should permeate basic props', () => {
    render(
      <table>
        <Thead aria-label="test-aria-label" data-testid="test-id" id="test-td" role="menu"></Thead>
      </table>
    );
    expect(screen.getByTestId('test-id').getAttribute('aria-label')).toBe('test-aria-label');
    expect(screen.getByTestId('test-id').getAttribute('id')).toBe('test-td');
    expect(screen.getByTestId('test-id').getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    render(
      <table>
        <Thead className="test-class" data-testid="test-id">
          <tr></tr>
        </Thead>
      </table>
    );
    expect(screen.getByTestId('test-id').firstElementChild?.tagName).toBe('TR');
  });
});
