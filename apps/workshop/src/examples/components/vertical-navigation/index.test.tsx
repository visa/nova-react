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

import { DefaultVerticalNavigation } from './default-vertical-navigation';
import { VerticalNavigationWithActiveElement } from './vertical-navigation-with-active-element';
import { VerticalNavigationWithIcons } from './vertical-navigation-with-icons';
import { VerticalNavigationWithNestedElements } from './vertical-navigation-with-nested-elements';
import { VerticalNavigationWithSectionTitles } from './vertical-navigation-with-section-titles';
import { VerticalNavigationWithNestedElementsAndSectionTitles } from './vertical-navigation-with-nested-elements-and-section-titles';
import { AlternateVerticalNavigation } from './alternate-vertical-navigation';
import { AlternateVerticalNavigationWithActiveElement } from './alternate-vertical-navigation-with-active-element';
import { AlternateVerticalNavigationWithIcons } from './alternate-vertical-navigation-with-icons';
import { VerticalNavigationWithoutLogoOrApplicationName } from './vertical-navigation-without-logo-or-application-name';

const examples = [
  { Component: DefaultVerticalNavigation, title: metaData['default-vertical-navigation'].title },
  { Component: VerticalNavigationWithActiveElement, title: metaData['vertical-navigation-with-active-element'].title },
  { Component: VerticalNavigationWithIcons, title: metaData['vertical-navigation-with-icons'].title },
  {
    Component: VerticalNavigationWithNestedElements,
    title: metaData['vertical-navigation-with-nested-elements'].title,
  },
  {
    Component: VerticalNavigationWithSectionTitles,
    title: metaData['vertical-navigation-with-section-titles'].title,
  },
  {
    Component: VerticalNavigationWithNestedElementsAndSectionTitles,
    title: metaData['vertical-navigation-with-nested-elements-and-section-titles'].title,
  },
  {
    Component: AlternateVerticalNavigation,
    title: metaData['alternate-vertical-navigation'].title,
  },
  {
    Component: AlternateVerticalNavigationWithActiveElement,
    title: metaData['alternate-vertical-navigation-with-active-element'].title,
  },
  {
    Component: AlternateVerticalNavigationWithIcons,
    title: metaData['alternate-vertical-navigation-with-icons'].title,
  },
  {
    Component: VerticalNavigationWithoutLogoOrApplicationName,
    title: metaData['vertical-navigation-without-logo-or-application-name'].title,
  },
];

describe('Nav examples', () => {
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

  describe('default vertical navigation', () => {
    it('should collapse when collapse button clicked', () => {
      const { container } = render(<DefaultVerticalNavigation />);
      const collapseButton = container.querySelector('[aria-label="Side bar"]')!;
      fireEvent.click(collapseButton);
      expect(collapseButton).toHaveAttribute('aria-expanded', 'false');
    });
    it('should show account when account is clicked', () => {
      render(<DefaultVerticalNavigation />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('vertical navigation with active element', () => {
    it('should collapse when collapse button clicked', () => {
      const { container } = render(<VerticalNavigationWithActiveElement />);
      const collapseButton = container.querySelector('[aria-label="Side bar"]')!;
      fireEvent.click(collapseButton);
      expect(collapseButton).toHaveAttribute('aria-expanded', 'false');
    });
    it('should show account when account is clicked', () => {
      render(<VerticalNavigationWithActiveElement />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('vertical navigation with icons', () => {
    it('should collapse when collapse button clicked', () => {
      const { container } = render(<VerticalNavigationWithIcons />);
      const collapseButton = container.querySelector('[aria-label="Side bar"]')!;
      fireEvent.click(collapseButton);
      expect(collapseButton).toHaveAttribute('aria-expanded', 'false');
    });
    it('should show account when account is clicked', () => {
      render(<VerticalNavigationWithIcons />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('vertical-navigation-with-nested-elements', () => {
    it('should collapse when collapse button clicked', () => {
      const { container } = render(<VerticalNavigationWithNestedElements />);
      const collapseButton = container.querySelector('[aria-label="Side bar"]')!;
      fireEvent.click(collapseButton);
      expect(collapseButton).toHaveAttribute('aria-expanded', 'false');
    });
    it('should show account when account is clicked', () => {
      render(<VerticalNavigationWithNestedElements />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should toggle first level tab when tab clicked', () => {
      render(<VerticalNavigationWithNestedElements />);

      const toggleLabel = screen.getByText('L1 label 2');
      const ariaControls = toggleLabel.closest('button')?.getAttribute('aria-controls');
      if (!ariaControls) {
        throw new Error('aria-controls attribute for L1 label 2 not found');
      }
      const nestedUlElement = document.getElementById(ariaControls);
      if (!nestedUlElement) {
        throw new Error('Nested ul element for L1 label 2 not found');
      }

      // Initially, the nested ul containing L1 label 2 should have the class "v-hide"
      expect(nestedUlElement).toHaveClass('v-hide');

      // After expanding the parent tab, the nested ul should NOT have the class "v-hide"
      fireEvent.click(toggleLabel);
      expect(nestedUlElement).not.toHaveClass('v-hide');

      // After clicking toggling the parent tab once more, the ul should have the class "v-hide" again
      fireEvent.click(toggleLabel);
      expect(nestedUlElement).toHaveClass('v-hide');
    });
    it('should expand double nested menus when clicked', () => {
      const { container } = render(<VerticalNavigationWithNestedElements />);
      const l1L4Button = screen.getByText('L1 label 4');
      expect(l1L4Button).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(l1L4Button);
      expect(l1L4Button).toHaveAttribute('aria-expanded', 'true');

      const nestedTabsElement = container.querySelector('#vertical-navigation-with-nested-elements-l1-label4-sub-menu');
      const nestedTabsHTMLElement = nestedTabsElement as HTMLElement;
      expect(nestedTabsHTMLElement).toBeInTheDocument();

      const { getByText } = within(nestedTabsHTMLElement);
      const l2L1Button = getByText('L2 label 1');
      expect(l2L1Button).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(l2L1Button);
      expect(l2L1Button).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('vertical-navigation-with-section-titles', () => {
    it('should collapse when collapse button clicked', () => {
      const { container } = render(<VerticalNavigationWithSectionTitles />);
      const collapseButton = container.querySelector('[aria-label="Side bar"]')!;
      fireEvent.click(collapseButton);
      expect(collapseButton).toHaveAttribute('aria-expanded', 'false');
    });
    it('should show account when account is clicked', () => {
      render(<VerticalNavigationWithSectionTitles />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('vertical-navigation-with-nested-elements-and-section-titles', () => {
    it('should collapse when collapse button clicked', () => {
      const { container } = render(<VerticalNavigationWithNestedElementsAndSectionTitles />);
      const collapseButton = container.querySelector('[aria-label="Side bar"]')!;
      fireEvent.click(collapseButton);
      expect(collapseButton).toHaveAttribute('aria-expanded', 'false');
    });
    it('should show account when account is clicked', () => {
      render(<VerticalNavigationWithNestedElementsAndSectionTitles />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should toggle first level tab when tab clicked', () => {
      render(<VerticalNavigationWithNestedElementsAndSectionTitles />);
      const toggleLabel = screen.getByText('L1 label 2');
      const ariaControls = toggleLabel.closest('button')?.getAttribute('aria-controls');
      if (!ariaControls) {
        throw new Error('aria-controls attribute for L1 label 2 not found');
      }
      const nestedUlElement = document.getElementById(ariaControls);
      if (!nestedUlElement) {
        throw new Error('Nested ul element for L1 label 2 not found');
      }

      // Initially, the nested ul containing L1 label 2 should have the class "v-hide"
      expect(nestedUlElement).toHaveClass('v-hide');

      // After expanding the parent tab, the nested ul should NOT have the class "v-hide"
      fireEvent.click(toggleLabel);
      expect(nestedUlElement).not.toHaveClass('v-hide');

      // After clicking toggling the parent tab once more, the ul should have the class "v-hide" again
      fireEvent.click(toggleLabel);
      expect(nestedUlElement).toHaveClass('v-hide');
    });

    it('should expand double nested menus when clicked', () => {
      const { container } = render(<VerticalNavigationWithNestedElementsAndSectionTitles />);
      const l1L2Button = screen.getByText('L1 label 2');
      expect(l1L2Button).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(l1L2Button);
      expect(l1L2Button).toHaveAttribute('aria-expanded', 'true');

      const nestedTabsElement = container.querySelector(
        '#vertical-navigation-with-nested-elements-and-section-titles-l1-label2-sub-menu'
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

  describe('alternate vertical navigation', () => {
    it('should collapse when collapse button clicked', () => {
      const { container } = render(<AlternateVerticalNavigation />);
      const collapseButton = container.querySelector('[aria-label="Side bar"]')!;
      fireEvent.click(collapseButton);
      expect(collapseButton).toHaveAttribute('aria-expanded', 'false');
    });
    it('should show account when account is clicked', () => {
      render(<AlternateVerticalNavigation />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('alternate vertical navigation with active element', () => {
    it('should collapse when collapse button clicked', () => {
      const { container } = render(<AlternateVerticalNavigationWithActiveElement />);
      const collapseButton = container.querySelector('[aria-label="Side bar"]')!;
      fireEvent.click(collapseButton);
      expect(collapseButton).toHaveAttribute('aria-expanded', 'false');
    });
    it('should show account when account is clicked', () => {
      render(<AlternateVerticalNavigationWithActiveElement />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('alternate vertical navigation with icons', () => {
    it('should collapse when collapse button clicked', () => {
      const { container } = render(<AlternateVerticalNavigationWithIcons />);
      const collapseButton = container.querySelector('[aria-label="Side bar"]')!;
      fireEvent.click(collapseButton);
      expect(collapseButton).toHaveAttribute('aria-expanded', 'false');
    });
    it('should show account when account is clicked', () => {
      render(<AlternateVerticalNavigationWithIcons />);
      const accountButton = screen.getByText('Alex Miller');
      fireEvent.click(accountButton);
      expect(accountButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('vertical navigation without logo or application name', () => {
    it('should collapse when collapse button clicked', () => {
      const { container } = render(<VerticalNavigationWithoutLogoOrApplicationName />);
      const collapseButton = container.querySelector('[aria-label="Side bar"]')!;
      fireEvent.click(collapseButton);
      expect(collapseButton).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
