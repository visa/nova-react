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

import Th from '.';

describe('Th', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <Th data-testid="test-id">Test</Th>
          </tr>
        </tbody>
      </table>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('test-id').className).toBe('v-th');
    expect(screen.getByTestId('test-id').tagName).toBe('TH');
  });

  it('should allow custom classNames', () => {
    render(
      <table>
        <tbody>
          <tr>
            <Th className="test-class" data-testid="test-id" />
          </tr>
        </tbody>
      </table>
    );
    expect(screen.getByTestId('test-id').className).toBe('v-th test-class');
  });

  it('should allow custom alternate th', () => {
    render(
      <table>
        <tbody>
          <tr>
            <Th alternate data-testid="test-id" />
          </tr>
        </tbody>
      </table>
    );
    expect(screen.getByTestId('test-id').className).toBe('v-th v-th-alt');
  });

  it('should permeate basic props', () => {
    render(
      <table>
        <tbody>
          <tr>
            <Th aria-label="test-aria-label" data-testid="test-id" id="test-td" role="menu"></Th>
          </tr>
        </tbody>
      </table>
    );
    expect(screen.getByTestId('test-id').getAttribute('aria-label')).toBe('test-aria-label');
    expect(screen.getByTestId('test-id').getAttribute('id')).toBe('test-td');
    expect(screen.getByTestId('test-id').getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    render(
      <table>
        <tbody>
          <tr>
            <Th data-testid="test-id">Test Child</Th>
          </tr>
        </tbody>
      </table>
    );
    expect(screen.getByTestId('test-id').textContent).toBe('Test Child');
  });
});
