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

import Icon from '.';

describe('Icon', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<Icon />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-generic v-icon-low');
    expect(container.firstElementChild?.tagName).toBe('svg');
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
    expect(container.firstElementChild?.getAttribute('aria-labelledby')).toBe(null);
    expect(container.firstElementChild?.getAttribute('width')).toBe('24');
    expect(container.firstElementChild?.lastElementChild?.getAttribute('href')).toBe('generic-help-low');
  });
  it('should render the same with default props', async () => {
    const { container } = render(<Icon brand="generic" iconName="help" resolution="low" />);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-generic v-icon-low');
    expect(container.firstElementChild?.tagName).toBe('svg');
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
    expect(container.firstElementChild?.getAttribute('aria-labelledby')).toBe(null);
    expect(container.firstElementChild?.getAttribute('width')).toBe('24');
    expect(container.firstElementChild?.lastElementChild?.getAttribute('href')).toBe('generic-help-low');
  });

  it('should have the correct aria-labelledby', () => {
    const { container } = render(<Icon description="test-description" title="test-title" />);
    expect(container.firstElementChild?.getAttribute('aria-labelledby')).toBe('title-:r2:,description-:r2:');
  });

  it('should have the correct aria-labelledby with ariaBaseId', () => {
    const { container } = render(<Icon ariaBaseId="test-id" description="test-description" title="test-title" />);
    expect(container.firstElementChild?.getAttribute('aria-labelledby')).toBe('title-test-id,description-test-id');
  });

  it('should have the correct aria-labelledby with description only', () => {
    const { container } = render(<Icon description="test-description" />);
    expect(container.firstElementChild?.getAttribute('aria-labelledby')).toBe('description-:r4:');
  });

  it('should have the correct aria-labelledby with title only', () => {
    const { container } = render(<Icon title="test-title" />);
    expect(container.firstElementChild?.getAttribute('aria-labelledby')).toBe('title-:r5:');
  });

  it('should render the icon with the correct high resolution', () => {
    const { container } = render(<Icon resolution="high" />);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-generic v-icon-high');
    expect(container.firstElementChild?.getAttribute('width')).toBe('48');
  });

  it('should render the icon with the correct tiny resolution', () => {
    const { container } = render(<Icon resolution="tiny" />);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-generic v-icon-tiny');
    expect(container.firstElementChild?.getAttribute('width')).toBe('16');
  });

  it('should render the icon with the correct brand', () => {
    const { container } = render(<Icon brand="visa" />);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-visa v-icon-low');
  });

  it('should render the icon with the correct icon name', () => {
    const { container } = render(<Icon iconName="test" />);
    expect(container.firstElementChild?.lastElementChild?.getAttribute('href')).toBe('generic-test-low');
  });
  it('should render the icon with the correct className with rtl prop', () => {
    const { container } = render(<Icon rtl />);
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-generic v-icon-low v-icon-rtl');
  });

  it('should permeate basic props', () => {
    const { container } = render(<Icon aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });

  it('should render all props correctly', async () => {
    const { container } = render(
      <Icon
        ariaBaseId="test-id"
        brand="visa"
        className="test-class"
        description="test-description"
        iconName="test"
        resolution="high"
        title="test-title"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container.firstElementChild?.getAttribute('class')).toBe('v-icon v-icon-visa v-icon-high test-class');
    expect(container.firstElementChild?.getAttribute('aria-labelledby')).toBe('title-test-id,description-test-id');
    expect(container.firstElementChild?.getAttribute('width')).toBe('48');
    expect(container.firstElementChild?.lastElementChild?.getAttribute('href')).toBe('visa-test-high');
  });
});
