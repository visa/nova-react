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

import AccordionToggleIcon from '.';

describe('AccordionToggleIcon', () => {
  it('should render defaults correctly', async () => {
    const { container } = render(<AccordionToggleIcon />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-icon v-icon-visa v-icon-tiny v-icon-chevron-right v-icon-rtl v-accordion-toggle-icon v-accordion-toggle-icon-closed'
    );
    expect(container.firstElementChild?.nodeName).toBe('svg');
  });

  it('should allow custom classNames', () => {
    const { container } = render(<AccordionToggleIcon className="test-class" />);
    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-icon v-icon-visa v-icon-tiny v-icon-chevron-right v-icon-rtl v-accordion-toggle-icon v-accordion-toggle-icon-closed test-class'
    );
  });

  it('should allow custom closed element', () => {
    const { container } = render(<AccordionToggleIcon elementClosed={<svg />} />);
    expect(container.firstElementChild?.tagName).toBe('svg');
  });

  it('should allow custom open element', () => {
    const { container } = render(<AccordionToggleIcon elementOpen={<svg />} />);
    expect(container.firstElementChild?.tagName).toBe('svg');
  });

  it('should allow custom open state', () => {
    const { container } = render(<AccordionToggleIcon accordionOpen={true} />);
    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-icon v-icon-visa v-icon-tiny v-icon-chevron-down v-accordion-toggle-icon v-accordion-toggle-icon-open'
    );
  });
  it('should allow custom closed state', () => {
    const { container } = render(<AccordionToggleIcon accordionOpen={false} />);
    expect(container.firstElementChild?.getAttribute('class')).toBe(
      'v-icon v-icon-visa v-icon-tiny v-icon-chevron-right v-icon-rtl v-accordion-toggle-icon v-accordion-toggle-icon-closed'
    );
  });

  it('should permeate basic props', () => {
    const { container } = render(<AccordionToggleIcon aria-label="test-aria-label" id="test-id" role="menu" />);
    expect(container.firstElementChild?.getAttribute('aria-label')).toBe('test-aria-label');
    expect(container.firstElementChild?.getAttribute('id')).toBe('test-id');
    expect(container.firstElementChild?.getAttribute('role')).toBe('menu');
  });
});
