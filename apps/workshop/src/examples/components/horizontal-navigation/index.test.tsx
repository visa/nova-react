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
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';

import metaData from './meta.json';

import { DefaultHorizontalNav } from './default-horizontal-nav';
import { ActiveElementHorizontalNav } from './active-element-horizontal-nav';
import { AlternateHorizontalNav } from './alternate-horizontal-nav';
import { AlternateActiveElementHorizontalNav } from './alternate-active-element-horizontal-nav';
import { AlternateHorizontalNavWithIcons } from './alternate-horizontal-with-icons';
import { SearchPersistentHorizontalNav } from './search-persistent-horizontal-nav';
import { StackedHorizontalNav } from './stacked-horizontal-nav';
import { StackedSearchPersistentHorizontalNav } from './stacked-search-persistent-horizontal-nav';

const examples = [
  { Component: DefaultHorizontalNav, title: metaData['default-horizontal-nav'].title },
  { Component: ActiveElementHorizontalNav, title: metaData['active-element-horizontal-nav'].title },
  { Component: AlternateHorizontalNav, title: metaData['alternate-horizontal-nav'].title },
  { Component: AlternateActiveElementHorizontalNav, title: metaData['alternate-active-element-horizontal-nav'].title },
  { Component: AlternateHorizontalNavWithIcons, title: metaData['alternate-horizontal-with-icons'].title },
  { Component: StackedHorizontalNav, title: metaData['stacked-horizontal-nav'].title },
  { Component: SearchPersistentHorizontalNav, title: metaData['search-persistent-horizontal-nav'].title },
  {
    Component: StackedSearchPersistentHorizontalNav,
    title: metaData['stacked-search-persistent-horizontal-nav'].title,
  },
];

describe('Horizontal navigation examples', () => {
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

  describe('default horizontal nav', () => {
    it('should show account menu when clicked', async () => {
      const { container } = render(<DefaultHorizontalNav />);
      const accountMenuButton = container.querySelector('[aria-label="Alex Miller"]')!;
      await act(async () => {
        fireEvent.click(accountMenuButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#default-horizontal-nav-account-menu')).toBeInTheDocument();
      });
    });
    it('should show mobile menu when clicked', async () => {
      const { container } = render(<DefaultHorizontalNav />);
      const mobileMenuButton = container.querySelector('#default-horizontal-nav-mobile-menu-button')!;
      await act(async () => {
        fireEvent.click(mobileMenuButton);
      });
      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('should open the mobile account menu when clicked', async () => {
      render(<DefaultHorizontalNav />);
      const mobileAccountMenuButton = screen.getByText('Alex Miller')!;
      expect(mobileAccountMenuButton).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(mobileAccountMenuButton);
      });
      await waitFor(() => {
        expect(mobileAccountMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('should show search when clicked', async () => {
      const { container } = render(<DefaultHorizontalNav />);
      const searchButton = container.querySelector('[aria-label="search site"]')!;
      await act(async () => {
        fireEvent.click(searchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#default-horizontal-nav-search-field')).toBeInTheDocument();
      });
    });
    it('should close search when clicked', async () => {
      const { container } = render(<DefaultHorizontalNav />);
      const searchButton = container.querySelector('[aria-label="search site"]')!;
      await act(async () => {
        fireEvent.click(searchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#default-horizontal-nav-search-field')).toBeInTheDocument();
      });
      const closeSearchButton = container.querySelector('[aria-label="close search"]')!;
      await act(async () => {
        fireEvent.click(closeSearchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#default-horizontal-nav-search-field')).not.toBeInTheDocument();
      });
    });
    it('show open L1 label 3 menu when clicked', async () => {
      const { container } = render(<DefaultHorizontalNav />);

      const l1Label3Element = container.querySelector('#default-horizontal-nav-label-dropdown-button');
      const l1Label3HTMLElement = l1Label3Element as HTMLElement;

      expect(l1Label3HTMLElement).toBeInTheDocument();
      expect(l1Label3HTMLElement).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(l1Label3HTMLElement);
      });
      await waitFor(() => {
        expect(l1Label3HTMLElement).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('expand the mobile label 3 menu when clicked', async () => {
      const { container } = render(<DefaultHorizontalNav />);

      const mobileL1Label3Element = container.querySelector('#default-horizontal-nav-mobile-menu-label-dropdown-button');
      const mobileL1Label3HTMLElement = mobileL1Label3Element as HTMLElement;

      expect(mobileL1Label3HTMLElement).toBeInTheDocument();
      expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(mobileL1Label3HTMLElement);
      });
      await waitFor(() => {
        expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-expanded', 'true');
        expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-controls', 'default-horizontal-nav-account-sub-menu');
      });
    });
  });

  describe('active element horizontal nav', () => {
    it('should show account menu when clicked', async () => {
      const { container } = render(<ActiveElementHorizontalNav />);
      const accountMenuButton = container.querySelector('[aria-label="Alex Miller"]')!;
      await act(async () => {
        fireEvent.click(accountMenuButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#active-element-horizontal-nav-account-menu')).toBeInTheDocument();
      });
    });
    it('should show mobile menu when clicked', async () => {
      const { container } = render(<ActiveElementHorizontalNav />);
      const mobileMenuButton = container.querySelector('#active-element-horizontal-nav-mobile-menu-button')!;
      await act(async () => {
        fireEvent.click(mobileMenuButton);
      });
      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('should open the mobile account menu when clicked', async () => {
      render(<ActiveElementHorizontalNav />);
      const mobileAccountMenuButton = screen.getByText('Alex Miller')!;
      expect(mobileAccountMenuButton).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(mobileAccountMenuButton);
      });
      await waitFor(() => {
        expect(mobileAccountMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('should show search when clicked', async () => {
      const { container } = render(<ActiveElementHorizontalNav />);
      const searchButton = container.querySelector('[aria-label="search site"]')!;
      await act(async () => {
        fireEvent.click(searchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#active-element-horizontal-nav-search-field')).toBeInTheDocument();
      });
    });

    it('should open the mobile account menu when clicked', async () => {
      render(<ActiveElementHorizontalNav />);
      const mobileAccountMenuButton = screen.getByText('Alex Miller')!;
      expect(mobileAccountMenuButton).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(mobileAccountMenuButton);
      });
      await waitFor(() => {
        expect(mobileAccountMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('should close search when clicked', async () => {
      const { container } = render(<ActiveElementHorizontalNav />);
      const searchButton = container.querySelector('[aria-label="search site"]')!;
      await act(async () => {
        fireEvent.click(searchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#active-element-horizontal-nav-search-field')).toBeInTheDocument();
      });
      const closeSearchButton = container.querySelector('[aria-label="close search"]')!;
      await act(async () => {
        fireEvent.click(closeSearchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#active-element-horizontal-nav-search-field')).not.toBeInTheDocument();
      });
    });
    it('show open L1 label 3 menu when clicked', async () => {
      const { container } = render(<ActiveElementHorizontalNav />);

      const l1Label3Element = container.querySelector('#active-element-horizontal-nav-label-dropdown-button');
      const l1Label3HTMLElement = l1Label3Element as HTMLElement;

      expect(l1Label3HTMLElement).toBeInTheDocument();
      expect(l1Label3HTMLElement).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(l1Label3HTMLElement);
      });
      await waitFor(() => {
        expect(l1Label3HTMLElement).toHaveAttribute('aria-expanded', 'true');
      });
    });
    
    it('expand the mobile label 3 menu when clicked', async () => {
      const { container } = render(<ActiveElementHorizontalNav />);

      const mobileL1Label3Element = container.querySelector('#active-element-horizontal-nav-mobile-menu-label-dropdown-button');
      const mobileL1Label3HTMLElement = mobileL1Label3Element as HTMLElement;

      expect(mobileL1Label3HTMLElement).toBeInTheDocument();
      expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(mobileL1Label3HTMLElement);
      });
      await waitFor(() => {
        expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-expanded', 'true');
        expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-controls', 'active-element-horizontal-nav-account-sub-menu');
      });
    });
  });

  describe('alternate horizontal nav', () => {
    it('should show account menu when clicked', async () => {
      const { container } = render(<AlternateHorizontalNav />);
      const accountMenuButton = container.querySelector('[aria-label="Alex Miller"]')!;
      await act(async () => {
        fireEvent.click(accountMenuButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#alternate-horizontal-nav-account-menu')).toBeInTheDocument();
      });
    });
    it('should show mobile menu when clicked', async () => {
      const { container } = render(<AlternateHorizontalNav />);
      const mobileMenuButton = container.querySelector('#alternate-horizontal-nav-mobile-menu-button')!;
      await act(async () => {
        fireEvent.click(mobileMenuButton);
      });
      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('should open the mobile account menu when clicked', async () => {
      render(<AlternateHorizontalNav />);
      const mobileAccountMenuButton = screen.getByText('Alex Miller')!;
      expect(mobileAccountMenuButton).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(mobileAccountMenuButton);
      });
      await waitFor(() => {
        expect(mobileAccountMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('should show search when clicked', async () => {
      const { container } = render(<AlternateHorizontalNav />);
      const searchButton = container.querySelector('[aria-label="search site"]')!;
      await act(async () => {
        fireEvent.click(searchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#alternate-horizontal-nav-search-field')).toBeInTheDocument();
      });
    });
    it('should close search when clicked', async () => {
      const { container } = render(<AlternateHorizontalNav />);
      const searchButton = container.querySelector('[aria-label="search site"]')!;
      await act(async () => {
        fireEvent.click(searchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#alternate-horizontal-nav-search-field')).toBeInTheDocument();
      });
      const closeSearchButton = container.querySelector('[aria-label="close search"]')!;
      await act(async () => {
        fireEvent.click(closeSearchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#alternate-horizontal-nav-search-field')).not.toBeInTheDocument();
      });
    });
    it('show open L1 label 3 menu when clicked', async () => {
      const { container } = render(<AlternateHorizontalNav />);

      const l1Label3Element = container.querySelector('#alternate-horizontal-nav-label-dropdown-button');
      const l1Label3HTMLElement = l1Label3Element as HTMLElement;

      expect(l1Label3HTMLElement).toBeInTheDocument();
      expect(l1Label3HTMLElement).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(l1Label3HTMLElement);
      });
      await waitFor(() => {
        expect(l1Label3HTMLElement).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('expand the mobile label 3 menu when clicked', async () => {
      const { container } = render(<AlternateHorizontalNav />);

      const mobileL1Label3Element = container.querySelector('#alternate-horizontal-nav-mobile-menu-label-dropdown-button');
      const mobileL1Label3HTMLElement = mobileL1Label3Element as HTMLElement;

      expect(mobileL1Label3HTMLElement).toBeInTheDocument();
      expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(mobileL1Label3HTMLElement);
      });
      await waitFor(() => {
        expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-expanded', 'true');
        expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-controls', 'alternate-horizontal-nav-account-sub-menu');
      });
    });
  });

  describe('alternate active element horizontal nav', () => {
    it('should show account menu when clicked', async () => {
      const { container } = render(<AlternateActiveElementHorizontalNav />);
      const accountMenuButton = container.querySelector('[aria-label="Alex Miller"]')!;
      await act(async () => {
        fireEvent.click(accountMenuButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#alternate-active-element-horizontal-nav-account-menu')).toBeInTheDocument();
      });
    });
    it('should show mobile menu when clicked', async () => {
      const { container } = render(<AlternateActiveElementHorizontalNav />);
      const mobileMenuButton = container.querySelector('#alternate-active-element-horizontal-nav-mobile-menu-button')!;
      await act(async () => {
        fireEvent.click(mobileMenuButton);
      });
      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('should open the mobile account menu when clicked', async () => {
      render(<AlternateActiveElementHorizontalNav />);
      const mobileAccountMenuButton = screen.getByText('Alex Miller')!;
      expect(mobileAccountMenuButton).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(mobileAccountMenuButton);
      });
      await waitFor(() => {
        expect(mobileAccountMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('should show search when clicked', async () => {
      const { container } = render(<AlternateActiveElementHorizontalNav />);
      const searchButton = container.querySelector('[aria-label="search site"]')!;
      await act(async () => {
        fireEvent.click(searchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#alternate-active-element-horizontal-nav-search-field')).toBeInTheDocument();
      });
    });
    it('should close search when clicked', async () => {
      const { container } = render(<AlternateActiveElementHorizontalNav />);
      const searchButton = container.querySelector('[aria-label="search site"]')!;
      await act(async () => {
        fireEvent.click(searchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#alternate-active-element-horizontal-nav-search-field')).toBeInTheDocument();
      });
      const closeSearchButton = container.querySelector('[aria-label="close search"]')!;
      await act(async () => {
        fireEvent.click(closeSearchButton);
      });
      await waitFor(() => {
        expect(
          container.querySelector('#alternate-active-element-horizontal-nav-search-field')
        ).not.toBeInTheDocument();
      });
    });
    it('show open L1 label 3 menu when clicked', async () => {
      const { container } = render(<AlternateActiveElementHorizontalNav />);

      const l1Label3Element = container.querySelector('#alternate-active-element-horizontal-nav-label-dropdown-button');
      const l1Label3HTMLElement = l1Label3Element as HTMLElement;

      expect(l1Label3HTMLElement).toBeInTheDocument();
      expect(l1Label3HTMLElement).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(l1Label3HTMLElement);
      });
      await waitFor(() => {
        expect(l1Label3HTMLElement).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('expand the mobile label 3 menu when clicked', async () => {
      const { container } = render(<AlternateActiveElementHorizontalNav />);

      const mobileL1Label3Element = container.querySelector('#alternate-active-element-horizontal-nav-mobile-menu-label-dropdown-button');
      const mobileL1Label3HTMLElement = mobileL1Label3Element as HTMLElement;

      expect(mobileL1Label3HTMLElement).toBeInTheDocument();
      expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(mobileL1Label3HTMLElement);
      });
      await waitFor(() => {
        expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-expanded', 'true');
        expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-controls', 'alternate-active-element-horizontal-nav-account-sub-menu');
      });
    });
  });

  describe('alternate horizontal nav with icons', () => {
    it('should show account menu when clicked', async () => {
      const { container } = render(<AlternateHorizontalNavWithIcons />);
      const accountMenuButton = container.querySelector('[aria-label="Alex Miller"]')!;
      await act(async () => {
        fireEvent.click(accountMenuButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#alternate-horizontal-nav-with-icons-account-menu')).toBeInTheDocument();
      });
    });

    it('should show mobile menu when clicked', async () => {
      const { container } = render(<AlternateHorizontalNavWithIcons />);
      const mobileMenuButton = container.querySelector('#alternate-horizontal-nav-with-icons-mobile-menu-button')!;
      await act(async () => {
        fireEvent.click(mobileMenuButton);
      });
      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('should open the mobile account menu when clicked', async () => {
      render(<AlternateHorizontalNavWithIcons />);
      const mobileAccountMenuButton = screen.getByText('Alex Miller')!;
      expect(mobileAccountMenuButton).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(mobileAccountMenuButton);
      });
      await waitFor(() => {
        expect(mobileAccountMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('should show search when clicked', async () => {
      const { container } = render(<AlternateHorizontalNavWithIcons />);
      const searchButton = container.querySelector('[aria-label="search site"]')!;
      await act(async () => {
        fireEvent.click(searchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#alternate-horizontal-nav-with-icons-search-field')).toBeInTheDocument();
      });
    });
    it('should close search when clicked', async () => {
      const { container } = render(<AlternateHorizontalNavWithIcons />);
      const searchButton = container.querySelector('[aria-label="search site"]')!;
      await act(async () => {
        fireEvent.click(searchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#alternate-horizontal-nav-with-icons-search-field')).toBeInTheDocument();
      });
      const closeSearchButton = container.querySelector('[aria-label="close search"]')!;
      await act(async () => {
        fireEvent.click(closeSearchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#alternate-horizontal-nav-with-icons-search-field')).not.toBeInTheDocument();
      });
    });
    it('show open L1 label 3 menu when clicked', async () => {
      const { container } = render(<AlternateHorizontalNavWithIcons />);

      const l1Label3Element = container.querySelector('#alternate-horizontal-nav-with-icons-label-dropdown-button');
      const l1Label3HTMLElement = l1Label3Element as HTMLElement;

      expect(l1Label3HTMLElement).toBeInTheDocument();
      expect(l1Label3HTMLElement).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(l1Label3HTMLElement);
      });
      await waitFor(() => {
        expect(l1Label3HTMLElement).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('expand the mobile label 3 menu when clicked', async () => {
      const { container } = render(<AlternateHorizontalNavWithIcons />);

      const mobileL1Label3Element = container.querySelector('#alternate-horizontal-nav-with-icons-mobile-menu-label-dropdown-button');
      const mobileL1Label3HTMLElement = mobileL1Label3Element as HTMLElement;

      expect(mobileL1Label3HTMLElement).toBeInTheDocument();
      expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(mobileL1Label3HTMLElement);
      });
      await waitFor(() => {
        expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-expanded', 'true');
        expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-controls', 'alternate-horizontal-nav-with-icons-account-sub-menu');
      });
    });
  });

  describe('stacked horizontal nav', () => {
    it('should show account menu when clicked', async () => {
      const { container } = render(<StackedHorizontalNav />);
      const accountMenuButton = container.querySelector('[aria-label="Alex Miller"]')!;
      await act(async () => {
        fireEvent.click(accountMenuButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#stacked-horizontal-nav-account-menu')).toBeInTheDocument();
      });
    });
    it('should open the account menu when clicked', async () => {
      render(<StackedHorizontalNav />);
      const accountMenuButton = screen.getByText('Alex Miller')!;
      expect(accountMenuButton).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(accountMenuButton);
      });
      await waitFor(() => {
        expect(accountMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('should show search when clicked', async () => {
      const { container } = render(<StackedHorizontalNav />);
      const searchButton = container.querySelector('[aria-label="search site"]')!;
      await act(async () => {
        fireEvent.click(searchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#stacked-horizontal-nav-search-field')).toBeInTheDocument();
      });
    });
    it('should close search when clicked', async () => {
      const { container } = render(<StackedHorizontalNav />);
      const searchButton = container.querySelector('[aria-label="search site"]')!;
      await act(async () => {
        fireEvent.click(searchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#stacked-horizontal-nav-search-field')).toBeInTheDocument();
      });
      const closeSearchButton = container.querySelector('[aria-label="close search"]')!;
      await act(async () => {
        fireEvent.click(closeSearchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#stacked-horizontal-nav-search-field')).not.toBeInTheDocument();
      });
    });

    it('should show mobile menu when clicked', async () => {
      const { container } = render(<StackedHorizontalNav />);
      const mobileMenuButton = container.querySelector('#stacked-horizontal-nav-mobile-menu-button')!;
      await act(async () => {
        fireEvent.click(mobileMenuButton);
      });
      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });

  describe('search persistent horizontal nav', () => {
    it('should show account menu when clicked', async () => {
      const { container } = render(<SearchPersistentHorizontalNav />);
      const accountMenuButton = container.querySelector('[aria-label="Alex Miller"]')!;
      await act(async () => {
        fireEvent.click(accountMenuButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#search-persistent-horizontal-nav-account-menu')).toBeInTheDocument();
      });
    });
    it('should show mobile menu when clicked', async () => {
      const { container } = render(<SearchPersistentHorizontalNav />);
      const mobileMenuButton = container.querySelector('#search-persistent-horizontal-nav-mobile-menu-button')!;
      await act(async () => {
        fireEvent.click(mobileMenuButton);
      });
      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('should open the mobile account menu when clicked', async () => {
      render(<SearchPersistentHorizontalNav />);
      const mobileAccountMenuButton = screen.getByText('Alex Miller')!;
      expect(mobileAccountMenuButton).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(mobileAccountMenuButton);
      });
      await waitFor(() => {
        expect(mobileAccountMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('show open L1 label 3 menu when clicked', async () => {
      const { container } = render(<SearchPersistentHorizontalNav />);

      const l1Label3Element = container.querySelector('#search-persistent-horizontal-nav-label-dropdown-button');
      const l1Label3HTMLElement = l1Label3Element as HTMLElement;

      expect(l1Label3HTMLElement).toBeInTheDocument();
      expect(l1Label3HTMLElement).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(l1Label3HTMLElement);
      });
      await waitFor(() => {
        expect(l1Label3HTMLElement).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('expand the mobile label 3 menu when clicked', async () => {
      const { container } = render(<SearchPersistentHorizontalNav />);

      const mobileL1Label3Element = container.querySelector('#search-persistent-horizontal-nav-mobile-menu-label-dropdown-button');
      const mobileL1Label3HTMLElement = mobileL1Label3Element as HTMLElement;

      expect(mobileL1Label3HTMLElement).toBeInTheDocument();
      expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(mobileL1Label3HTMLElement);
      });
      await waitFor(() => {
        expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-expanded', 'true');
        expect(mobileL1Label3HTMLElement).toHaveAttribute('aria-controls', 'search-persistent-horizontal-nav-account-sub-menu');
      });
    });
  });

  describe('stacked search persistent horizontal nav', () => {
    it('should show account menu when clicked', async () => {
      const { container } = render(<StackedSearchPersistentHorizontalNav />);
      const accountMenuButton = container.querySelector('[aria-label="Alex Miller"]')!;
      await act(async () => {
        fireEvent.click(accountMenuButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#stacked-search-persistent-horizontal-nav-account-menu')).toBeInTheDocument();
      });
    });
    it('should show mobile menu when clicked', async () => {
      const { container } = render(<StackedSearchPersistentHorizontalNav />);
      const mobileMenuButton = container.querySelector('#stacked-search-persistent-horizontal-nav-mobile-menu-button')!;
      await act(async () => {
        fireEvent.click(mobileMenuButton);
      });
      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('should open the mobile account menu when clicked', async () => {
      render(<StackedSearchPersistentHorizontalNav />);
      const mobileAccountMenuButton = screen.getByText('Alex Miller')!;
      expect(mobileAccountMenuButton).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(mobileAccountMenuButton);
      });
      await waitFor(() => {
        expect(mobileAccountMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });
});
