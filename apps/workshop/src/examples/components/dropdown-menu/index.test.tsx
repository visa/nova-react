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
import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import metaData from './meta.json';

import { DefaultDropdownMenu } from './default-dropdown-menu';
import { IconDropdownMenu } from './icon-dropdown-menu';
import { DropdownMenuWithTabs } from './dropdown-menu-with-tabs';
import { DropdownMenuWithLeadingIcons } from './dropdown-menu-with-leading-icons';

const examples = [
  { Component: DefaultDropdownMenu, title: metaData['default-dropdown-menu'].title },
  { Component: IconDropdownMenu, title: metaData['icon-dropdown-menu'].title },
  { Component: DropdownMenuWithTabs, title: metaData['dropdown-menu-with-tabs'].title },
  { Component: DropdownMenuWithLeadingIcons, title: metaData['dropdown-menu-with-leading-icons'].title },
];

describe('Dropdown menu examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      // See floating-ui docs on why we do this (https://floating-ui.com/docs/react#testing)
      await act(async () => {});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('default dropdown menu', () => {
    it('should open dropdown menu when clicked', async () => {
      const { container } = render(<DefaultDropdownMenu />);
      // See floating-ui docs on why we do this (https://floating-ui.com/docs/react#testing)
      await act(async () => {});
      const dropdownMenuButton = screen.getByText('Action');
      fireEvent.click(dropdownMenuButton);
      expect(container.querySelector('#dropdown-menu-default')).toBeInTheDocument();
    });
  });
  describe('dropdown menu with icon', () => {
    it('should open dropdown menu when clicked', async () => {
      const { container } = render(<IconDropdownMenu />);
      // See floating-ui docs on why we do this (https://floating-ui.com/docs/react#testing)
      await act(async () => {});
      const dropdownMenuButton = container.querySelector('#dropdown-menu-icon-button')!;
      fireEvent.click(dropdownMenuButton);
      expect(container.querySelector('#dropdown-menu-icon')).toBeInTheDocument();
    });
  });
  describe('dropdown menu with leading icons', () => {
    it('should open dropdown menu when clicked', async () => {
      const { container } = render(<DropdownMenuWithLeadingIcons />);
      // See floating-ui docs on why we do this (https://floating-ui.com/docs/react#testing)
      await act(async () => {});
      const dropdownMenuButton = container.querySelector('#dropdown-menu-with-leading-icons-button')!;
      fireEvent.click(dropdownMenuButton);
      expect(container.querySelector('#dropdown-menu-with-leading-icons')).toBeInTheDocument();
    });
  });
  describe('dropdown menu with tabs', () => {
    it('should open dropdown menu when clicked', async () => {
      const { container } = render(<DropdownMenuWithTabs />);
      // See floating-ui docs on why we do this (https://floating-ui.com/docs/react#testing)
      await act(async () => {});
      const dropdownMenuButton = container.querySelector('#dropdown-menu-with-tabs-button')!;
      fireEvent.click(dropdownMenuButton);
      expect(container.querySelector('#dropdown-menu-with-tabs')).toBeInTheDocument();
    });
  });
});
