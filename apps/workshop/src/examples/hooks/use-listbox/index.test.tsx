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

import { UseListboxExample } from './use-listbox-example';

const examples = [{ Component: UseListboxExample, title: metaData['use-listbox-example'].title }];

describe('useListbox example', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('option single listbox', () => {
    it('should select option when clicked', () => {
      render(<UseListboxExample />);
      const itemOption = screen.getByText('Item C');
      fireEvent.click(itemOption);
      expect(itemOption).toHaveAttribute('aria-selected', 'true');
    });
    it('should focus correctly on keyboard navigation', async () => {
      render(<UseListboxExample />);
      const user = userEvent.setup();
      const itemOption = screen.getByText('Item C');
      await user.tab();
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      expect(itemOption).toHaveFocus();
    });
  });
});
