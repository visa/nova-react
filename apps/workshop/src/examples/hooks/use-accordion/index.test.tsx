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
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import metaData from './meta.json';

import { UseAccordionExample } from './use-accordion-example';

const examples = [{ Component: UseAccordionExample, title: metaData['use-accordion-example'].title }];

describe('useAccordion example', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('useAccordionExample', () => {
    it('should expand an accordion when press Enter', async () => {
      render(<UseAccordionExample />);
      const user = userEvent.setup();
      const element1 = screen.getByText('Section label 1');

      await user.tab();
      await user.keyboard('{ArrowDown}');
      expect(element1).toHaveFocus();
      await user.keyboard('{ArrowDown}');
      expect(element1).toHaveFocus();

      fireEvent.click(element1);
      expect(element1).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
