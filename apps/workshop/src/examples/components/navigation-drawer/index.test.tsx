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
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';

import metaData from './meta.json';

import { DefaultNavigationDrawer } from './default-navigation-drawer';
import { NavigationDrawerWithActiveElement } from './navigation-drawer-with-active-element';
import { NavigationDrawerWithIcons } from './navigation-drawer-with-icons';
import { NavigationDrawerWithNestedElements } from './navigation-drawer-with-nested-elements';
import { NavigationDrawerWithSectionTitles } from './navigation-drawer-with-section-titles';
import { NavigationDrawerWithNestedElementsAndSectionTitles } from './navigation-drawer-with-nested-elements-and-section-titles';
import { AlternateNavigationDrawer } from './alternate-navigation-drawer';
import { AlternateNavigationDrawerWithActiveElement } from './alternate-navigation-drawer-with-active-element';
import { AlternateNavigationDrawerWithIcons } from './alternate-navigation-drawer-with-icons';

const examples = [
  { Component: DefaultNavigationDrawer, title: metaData['default-navigation-drawer'].title },
  { Component: NavigationDrawerWithActiveElement, title: metaData['navigation-drawer-with-active-element'].title },
  { Component: NavigationDrawerWithIcons, title: metaData['navigation-drawer-with-icons'].title },
  { Component: NavigationDrawerWithNestedElements, title: metaData['navigation-drawer-with-nested-elements'].title },
  { Component: NavigationDrawerWithSectionTitles, title: metaData['navigation-drawer-with-section-titles'].title },
  {
    Component: NavigationDrawerWithNestedElementsAndSectionTitles,
    title: metaData['navigation-drawer-with-nested-elements-and-section-titles'].title,
  },
  {
    Component: AlternateNavigationDrawer,
    title: metaData['alternate-navigation-drawer'].title,
  },
  {
    Component: AlternateNavigationDrawerWithActiveElement,
    title: metaData['alternate-navigation-drawer-with-active-element'].title,
  },
  {
    Component: AlternateNavigationDrawerWithIcons,
    title: metaData['alternate-navigation-drawer-with-icons'].title,
  },
];

/**
 * Workaround until jest testing environment supports HTMLDialogElement.
 * Issue: https://github.com/jsdom/jsdom/issues/3294
 */
HTMLDialogElement.prototype.show = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = true;
});
HTMLDialogElement.prototype.showModal = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = true;
});
HTMLDialogElement.prototype.close = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = false;
});

describe('Navigation drawer examples', () => {
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

  describe('default navigation drawer', () => {
    it('should show when "open drawer" is clicked', () => {
      const { container } = render(<DefaultNavigationDrawer />);
      const button = screen.getByText('Open drawer');
      fireEvent.click(button);

      const drawer = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(drawer.hasAttribute('open')).toBe(true);
    });

    it('should close when close clicked', () => {
      const { container } = render(<DefaultNavigationDrawer />);
      const closeButton = container.querySelector('[aria-label="Close"]')!;
      fireEvent.click(closeButton);

      const modal = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(modal.hasAttribute('open')).toBe(false);
    });
    it('should show account menu when account tab is clicked', () => {
      render(<DefaultNavigationDrawer />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('navigation drawer with active element', () => {
    it('should show when "open drawer" is clicked', () => {
      const { container } = render(<NavigationDrawerWithActiveElement />);
      const button = screen.getByText('Open drawer');
      fireEvent.click(button);

      const drawer = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(drawer.hasAttribute('open')).toBe(true);
    });

    it('should close when close clicked', () => {
      const { container } = render(<NavigationDrawerWithActiveElement />);
      const closeButton = container.querySelector('[aria-label="Close"]')!;
      fireEvent.click(closeButton);

      const modal = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(modal.hasAttribute('open')).toBe(false);
    });
    it('should show account menu when account tab is clicked', () => {
      render(<NavigationDrawerWithActiveElement />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('navigation drawer with icons', () => {
    it('should show when "open drawer" is clicked', () => {
      const { container } = render(<NavigationDrawerWithIcons />);
      const button = screen.getByText('Open drawer');
      fireEvent.click(button);

      const drawer = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(drawer.hasAttribute('open')).toBe(true);
    });
    it('should close when close clicked', () => {
      const { container } = render(<NavigationDrawerWithIcons />);
      const closeButton = container.querySelector('[aria-label="Close"]')!;
      fireEvent.click(closeButton);

      const modal = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(modal.hasAttribute('open')).toBe(false);
    });
    it('should show account menu when account tab is clicked', () => {
      render(<NavigationDrawerWithIcons />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('navigation drawer with nested elements', () => {
    it('should show when "open drawer" is clicked', () => {
      const { container } = render(<NavigationDrawerWithNestedElements />);
      const button = screen.getByText('Open drawer');
      fireEvent.click(button);
      const drawer = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(drawer.hasAttribute('open')).toBe(true);
    });
    it('should close when close clicked', () => {
      const { container } = render(<NavigationDrawerWithNestedElements />);
      const closeButton = container.querySelector('[aria-label="Close"]')!;
      fireEvent.click(closeButton);
      const modal = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(modal.hasAttribute('open')).toBe(false);
    });
    it('should show account menu when account tab is clicked', () => {
      render(<NavigationDrawerWithNestedElements />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });
    it('should expand L1 label 2 when clicked', () => {
      render(<NavigationDrawerWithNestedElements />);
      const l1L2Button = screen.getByText('L1 label 2');
      expect(l1L2Button).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(l1L2Button);
      expect(l1L2Button).toHaveAttribute('aria-expanded', 'true');
    });
    it('should expand double nested menus when clicked', () => {
      const { container } = render(<NavigationDrawerWithNestedElements />);
      const l1L4Button = screen.getByText('L1 label 4');
      expect(l1L4Button).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(l1L4Button);
      expect(l1L4Button).toHaveAttribute('aria-expanded', 'true');

      const nestedTabsElement = container.querySelector('#navigation-drawer-with-nested-elements-l1-label4-sub-menu');
      const nestedTabsHTMLElement = nestedTabsElement as HTMLElement;

      expect(nestedTabsHTMLElement).toBeInTheDocument();

      const { getByText } = within(nestedTabsHTMLElement);
      const l2L1Button = getByText('L2 label 1');
      expect(l2L1Button).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(l2L1Button);
      expect(l2L1Button).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('navigation drawer with section titles', () => {
    it('should show when "open drawer" is clicked', () => {
      const { container } = render(<NavigationDrawerWithSectionTitles />);
      const button = screen.getByText('Open drawer');
      fireEvent.click(button);

      const drawer = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(drawer.hasAttribute('open')).toBe(true);
    });
    it('should close when close clicked', () => {
      const { container } = render(<NavigationDrawerWithSectionTitles />);
      const closeButton = container.querySelector('[aria-label="Close"]')!;
      fireEvent.click(closeButton);

      const modal = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(modal.hasAttribute('open')).toBe(false);
    });
    it('should show account menu when account tab is clicked', () => {
      render(<NavigationDrawerWithSectionTitles />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('navigation drawer with nested elements and section titles', () => {
    it('should show when "open drawer" is clicked', () => {
      const { container } = render(<NavigationDrawerWithNestedElementsAndSectionTitles />);
      const button = screen.getByText('Open drawer');
      fireEvent.click(button);
      const drawer = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(drawer.hasAttribute('open')).toBe(true);
    });
    it('should close when close clicked', () => {
      const { container } = render(<NavigationDrawerWithNestedElementsAndSectionTitles />);
      const closeButton = container.querySelector('[aria-label="Close"]')!;
      fireEvent.click(closeButton);
      const modal = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(modal.hasAttribute('open')).toBe(false);
    });
    it('should show account menu when account tab is clicked', () => {
      render(<NavigationDrawerWithNestedElementsAndSectionTitles />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });
    it('should expand L1 label 2 when clicked', () => {
      render(<NavigationDrawerWithNestedElementsAndSectionTitles />);
      const l1L2Button = screen.getByText('L1 label 2');
      expect(l1L2Button).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(l1L2Button);
      expect(l1L2Button).toHaveAttribute('aria-expanded', 'true');
    });
    it('should expand double nested menus when clicked', () => {
      const { container } = render(<NavigationDrawerWithNestedElementsAndSectionTitles />);
      const l1L2Button = screen.getByText('L1 label 2');
      expect(l1L2Button).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(l1L2Button);
      expect(l1L2Button).toHaveAttribute('aria-expanded', 'true');

      const nestedTabsElement = container.querySelector(
        '#navigation-drawer-with-nested-elements-and-section-titles-l1-label2-sub-menu'
      );
      const nestedTabsHTMLElement = nestedTabsElement as HTMLElement;

      expect(nestedTabsHTMLElement).toBeInTheDocument();

      const { getByText } = within(nestedTabsHTMLElement);
      const l2L2Button = getByText('L2 label 2');
      expect(l2L2Button).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(l2L2Button);
      expect(l2L2Button).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('alternate navigation drawer', () => {
    it('should show when "open drawer" is clicked', () => {
      const { container } = render(<AlternateNavigationDrawer />);
      const button = screen.getByText('Open drawer');
      fireEvent.click(button);
      const drawer = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(drawer.hasAttribute('open')).toBe(true);
    });
    it('should close when close clicked', () => {
      const { container } = render(<AlternateNavigationDrawer />);
      const closeButton = container.querySelector('[aria-label="Close"]')!;
      fireEvent.click(closeButton);

      const modal = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(modal.hasAttribute('open')).toBe(false);
    });
    it('should show account menu when account tab is clicked', () => {
      render(<AlternateNavigationDrawer />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('alternate navigation drawer with active element', () => {
    it('should show when "open drawer" is clicked', () => {
      const { container } = render(<AlternateNavigationDrawerWithActiveElement />);
      const button = screen.getByText('Open drawer');
      fireEvent.click(button);
      const drawer = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(drawer.hasAttribute('open')).toBe(true);
    });
    it('should close when close clicked', () => {
      const { container } = render(<AlternateNavigationDrawerWithActiveElement />);
      const closeButton = container.querySelector('[aria-label="Close"]')!;
      fireEvent.click(closeButton);

      const modal = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(modal.hasAttribute('open')).toBe(false);
    });
    it('should show account menu when account tab is clicked', () => {
      render(<AlternateNavigationDrawerWithActiveElement />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('alternate navigation drawer with icons', () => {
    it('should show when "open drawer" is clicked', () => {
      const { container } = render(<AlternateNavigationDrawerWithIcons />);
      const button = screen.getByText('Open drawer');
      fireEvent.click(button);
      const drawer = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(drawer.hasAttribute('open')).toBe(true);
    });
    it('should close when close clicked', () => {
      const { container } = render(<AlternateNavigationDrawerWithIcons />);
      const closeButton = container.querySelector('[aria-label="Close"]')!;
      fireEvent.click(closeButton);

      const modal = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(modal.hasAttribute('open')).toBe(false);
    });
    it('should show account menu when account tab is clicked', () => {
      render(<AlternateNavigationDrawerWithIcons />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
