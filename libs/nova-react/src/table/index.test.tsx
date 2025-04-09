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

import Table from '.';

describe('Table', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<Table />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.className).toBe('v-table');
    expect(container.firstElementChild?.tagName).toBe('TABLE');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<Table className="test-class" />);
    expect(container.firstElementChild?.className).toBe('v-table test-class');
  });

  it('should render alternate type with correct className', () => {
    const { container } = render(<Table alternate />);
    expect(container.firstElementChild?.className).toBe('v-table v-table-alt');
  });

  it('should render border type with correct className', () => {
    const { container } = render(<Table border />);
    expect(container.firstElementChild?.className).toBe('v-table v-table-border');
  });

  it('should render borderBlock type with correct className', () => {
    const { container } = render(<Table borderBlock />);
    expect(container.firstElementChild?.className).toBe('v-table v-table-border-block');
  });

  it('should render keyValue type with correct className', () => {
    const { container } = render(<Table keyValue />);
    expect(container.firstElementChild?.className).toBe('v-table v-table-key-value');
  });

  it('should render subtle type with correct className', () => {
    const { container } = render(<Table subtle />);
    expect(container.firstElementChild?.className).toBe('v-table v-table-subtle');
  });

  it('should render multiple types with correct className', () => {
    const { container } = render(<Table alternate border borderBlock keyValue subtle />);
    expect(container.firstElementChild?.className).toBe(
      'v-table v-table-alt v-table-border v-table-border-block v-table-key-value v-table-subtle'
    );
  });

  it('should permeate basic props', () => {
    const { container } = render(<Table aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow for child components', () => {
    const { container } = render(
      <Table>
        <tbody></tbody>
      </Table>
    );
    expect(container.firstElementChild?.firstElementChild?.tagName).toBe('TBODY');
  });
});
