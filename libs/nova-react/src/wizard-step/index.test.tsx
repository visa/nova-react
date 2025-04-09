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

import WizardStep from './';

describe('WizardStep', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(
      <ul>
        <WizardStep data-testid="test-id" />
      </ul>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(screen.getByTestId('test-id')?.className).toBe('v-wizard-step');
    expect(screen.getByTestId('test-id')?.tagName).toBe('LI');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<WizardStep className="test-class" />);
    expect(container.firstElementChild?.className).toBe('v-wizard-step test-class');
  });

  it('should allow custom tags', () => {
    const { container } = render(<WizardStep tag="button" />);
    expect(container.firstElementChild?.tagName).toBe('BUTTON');
  });

  it('should permeate basic props', () => {
    const { container } = render(<WizardStep aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should allow custom elements', () => {
    const { container } = render(<WizardStep element={<a />} />);
    expect(container.firstElementChild?.tagName).toBe('A');
  });

  it('should allow custom props on custom elements', () => {
    const { container } = render(<WizardStep element={<a href="hi" />} />);
    expect(container.firstElementChild).toHaveAttribute('href', 'hi');
  });

  it('should allow custom elements and merge classNames', () => {
    const { container } = render(<WizardStep className="test-class-1" element={<a className="test-class-2" />} />);
    expect(container.firstElementChild?.className).toBe('v-wizard-step test-class-1 test-class-2');
  });

  it('should allow for child components', () => {
    const { container } = render(<WizardStep>Test Child</WizardStep>);
    expect(container.firstElementChild?.firstChild?.textContent).toBe('Test Child');
  });
});
