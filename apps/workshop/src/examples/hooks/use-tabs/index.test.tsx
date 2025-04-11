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

import { AutoSelectTabs } from './auto-select-tabs';
import { UseTabsExample } from './use-tabs-example';

const examples = [
  { Component: AutoSelectTabs, title: metaData['auto-select-tabs'].title },
  { Component: UseTabsExample, title: metaData['use-tabs-example'].title },
];

describe('useTabs example', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('useTabs example', () => {
    it('should have active tab after click', () => {
      render(<UseTabsExample />);
      const tab = screen.getByText('Tab 2');
      fireEvent.click(tab);
      expect(tab).toHaveAttribute('aria-selected', 'true');
    });
    it('should have active tab after keyboard navigation', async () => {
      render(<UseTabsExample />);
      const user = userEvent.setup();
      const tab = screen.getByText('Tab 2');
      await user.tab();
      await user.keyboard('{ArrowRight}');
      await user.keyboard('{Enter}');
      expect(tab).toHaveAttribute('aria-selected', 'true');
    });
  });
  describe('auto-active horizontal tab', () => {
    it('should have active tab after click', () => {
      render(<AutoSelectTabs />);
      const tab = screen.getByText('Tab 2');
      fireEvent.click(tab);
      expect(tab).toHaveAttribute('aria-selected', 'true');
    });
    it('should have active tab after keyboard navigation', async () => {
      render(<AutoSelectTabs />);
      const user = userEvent.setup();
      const tab = screen.getByText('Tab 2');
      await user.tab();
      await user.keyboard('{ArrowRight}');
      expect(tab).toHaveAttribute('aria-selected', 'true');
    });
  });
});
