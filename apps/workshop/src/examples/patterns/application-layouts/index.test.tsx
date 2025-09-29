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

import { BrowserRouter } from 'react-router-dom';
import metaData from './meta.json';

import { HorizontalApplicationLayout } from './horizontal-application-layout';
import { MixedApplicationLayout } from './mixed-application-layout';
import { StackedHorizontalApplicationLayout } from './stacked-horizontal-application-layout';
import { VerticalApplicationLayout } from './vertical-application-layout';
import { HorizontalNavLayout } from './horizontal-nav-layout';
import { AlternateHorizontalNavLayout } from './alternate-horizontal-nav-layout';
import { StackedHorizontalNavLayout } from './stacked-horizontal-nav-layout';
import { VerticalNavigationLayout } from './vertical-nav-layout';
import { VerticalMixedNavLayout } from './vertical-mixed-nav-layout';

const examples = [
  { Component: HorizontalApplicationLayout, title: metaData['horizontal-application-layout'].title },
  { Component: VerticalApplicationLayout, title: metaData['vertical-application-layout'].title },
  { Component: MixedApplicationLayout, title: metaData['mixed-application-layout'].title },
  { Component: StackedHorizontalApplicationLayout, title: metaData['stacked-horizontal-application-layout'].title },
];

describe('Application layout examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('horizontal nav layout', () => {
    it('should show account menu when clicked', async () => {
      const { container } = render(<HorizontalNavLayout />);
      const accountMenuButton = container.querySelector('[aria-label="Alex Miller"]')!;
      await act(async () => {
        fireEvent.click(accountMenuButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#horizontal-nav-account-menu')).toBeInTheDocument();
      });
    });
    it('should show mobile menu when clicked', async () => {
      const { container } = render(<HorizontalNavLayout />);
      const mobileMenuButton = container.querySelector('#horizontal-nav-mobile-menu-button')!;
      await act(async () => {
        fireEvent.click(mobileMenuButton);
      });
      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('should open the mobile account menu when clicked', async () => {
      render(<HorizontalNavLayout />);
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
      const { container } = render(<HorizontalNavLayout />);
      const searchButton = container.querySelector('[aria-label="search site"]')!;
      await act(async () => {
        fireEvent.click(searchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#horizontal-nav-search-field')).toBeInTheDocument();
      });
    });
    it('should close search when clicked', async () => {
      const { container } = render(<HorizontalNavLayout />);
      const searchButton = container.querySelector('[aria-label="search site"]')!;
      await act(async () => {
        fireEvent.click(searchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#horizontal-nav-search-field')).toBeInTheDocument();
      });
      const closeSearchButton = container.querySelector('[aria-label="close search"]')!;
      await act(async () => {
        fireEvent.click(closeSearchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('horizontal-nav-search-field')).not.toBeInTheDocument();
      });
    });
    it('show open L1 label 4 menu when clicked', async () => {
      const { container } = render(<HorizontalNavLayout />);

      const l1Label4Element = container.querySelector('#horizontal-nav-label-dropdown-button');
      const l1Label4HTMLElement = l1Label4Element as HTMLElement;

      expect(l1Label4HTMLElement).toBeInTheDocument();
      expect(l1Label4HTMLElement).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(l1Label4HTMLElement);
      });
      await waitFor(() => {
        expect(l1Label4HTMLElement).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('expand the mobile label 4 menu when clicked', async () => {
      const { container } = render(<HorizontalNavLayout />);

      const mobileL1Label4Element = container.querySelector('#horizontal-nav-mobile-menu-label-dropdown-button');
      const mobileL1Label4HTMLElement = mobileL1Label4Element as HTMLElement;

      expect(mobileL1Label4HTMLElement).toBeInTheDocument();
      expect(mobileL1Label4HTMLElement).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(mobileL1Label4HTMLElement);
      });
      await waitFor(() => {
        expect(mobileL1Label4HTMLElement).toHaveAttribute('aria-expanded', 'true');
        expect(mobileL1Label4HTMLElement).toHaveAttribute('aria-controls', 'horizontal-nav-account-sub-menu');
      });
    });
  });

  describe('alternate horizontal nav', () => {
    it('should show account menu when clicked', async () => {
      const { container } = render(<AlternateHorizontalNavLayout />);
      const accountMenuButton = container.querySelector('[aria-label="Alex Miller"]')!;
      await act(async () => {
        fireEvent.click(accountMenuButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#alternate-horizontal-nav-account-menu')).toBeInTheDocument();
      });
    });
    it('should show mobile menu when clicked', async () => {
      const { container } = render(<AlternateHorizontalNavLayout />);
      const mobileMenuButton = container.querySelector('#alternate-horizontal-nav-mobile-menu-button')!;
      await act(async () => {
        fireEvent.click(mobileMenuButton);
      });
      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
    it('should open the mobile account menu when clicked', async () => {
      render(<AlternateHorizontalNavLayout />);
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
      const { container } = render(<AlternateHorizontalNavLayout />);
      const searchButton = container.querySelector('[aria-label="search site"]')!;
      await act(async () => {
        fireEvent.click(searchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#alternate-horizontal-nav-search-field')).toBeInTheDocument();
      });
    });
    it('should close search when clicked', async () => {
      const { container } = render(<AlternateHorizontalNavLayout />);
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
    it('show open L1 label 4 menu when clicked', async () => {
      const { container } = render(<AlternateHorizontalNavLayout />);

      const l1Label4Element = container.querySelector('#alternate-horizontal-nav-label-dropdown-button');
      const l1Label4HTMLElement = l1Label4Element as HTMLElement;

      expect(l1Label4HTMLElement).toBeInTheDocument();
      expect(l1Label4HTMLElement).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(l1Label4HTMLElement);
      });
      await waitFor(() => {
        expect(l1Label4HTMLElement).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('expand the mobile label 4 menu when clicked', async () => {
      const { container } = render(<AlternateHorizontalNavLayout />);

      const mobileL1Label4Element = container.querySelector('#alternate-horizontal-nav-mobile-menu-label-dropdown-button');
      const mobileL1Label4HTMLElement = mobileL1Label4Element as HTMLElement;

      expect(mobileL1Label4HTMLElement).toBeInTheDocument();
      expect(mobileL1Label4HTMLElement).toHaveAttribute('aria-expanded', 'false');
      await act(async () => {
        fireEvent.click(mobileL1Label4HTMLElement);
      });
      await waitFor(() => {
        expect(mobileL1Label4HTMLElement).toHaveAttribute('aria-expanded', 'true');
        expect(mobileL1Label4HTMLElement).toHaveAttribute('aria-controls', 'alternate-horizontal-nav-account-sub-menu');
      });
    });
  });

  describe('stacked horizontal nav', () => {
    it('should show account menu when clicked', async () => {
      const { container } = render(<StackedHorizontalNavLayout />);
      const accountMenuButton = container.querySelector('[aria-label="Alex Miller"]')!;
      await act(async () => {
        fireEvent.click(accountMenuButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#stacked-horizontal-nav-account-menu')).toBeInTheDocument();
      });
    });
    it('should open the account menu when clicked', async () => {
      render(<StackedHorizontalNavLayout />);
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
      const { container } = render(<StackedHorizontalNavLayout />);
      const searchButton = container.querySelector('[aria-label="search site"]')!;
      await act(async () => {
        fireEvent.click(searchButton);
      });
      await waitFor(() => {
        expect(container.querySelector('#stacked-horizontal-nav-search-field')).toBeInTheDocument();
      });
    });
    it('should close search when clicked', async () => {
      const { container } = render(<StackedHorizontalNavLayout />);
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
      const { container } = render(<StackedHorizontalNavLayout />);
      const mobileMenuButton = container.querySelector('#stacked-horizontal-nav-mobile-menu-button')!;
      await act(async () => {
        fireEvent.click(mobileMenuButton);
      });
      await waitFor(() => {
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });


 describe('vertical navigation', () => {
     it('should collapse when collapse button clicked', () => {
       const { container } = render(<VerticalNavigationLayout />);
       const collapseButton = container.querySelector('[aria-label="Side bar"]')!;
       fireEvent.click(collapseButton);
       expect(collapseButton).toHaveAttribute('aria-expanded', 'false');
     });
     it('should show account when account is clicked', () => {
       render(<VerticalNavigationLayout />);
       const accountButton = screen.getByText('Alex Miller');
       fireEvent.click(accountButton);
       expect(accountButton).toHaveAttribute('aria-expanded', 'true');
     });
   });
    
 describe('vertical mixed navigation', () => {
     it('should collapse when collapse button clicked', () => {
       const { container } = render(<VerticalMixedNavLayout />);
       const collapseButton = container.querySelector('[aria-label="Side bar"]')!;
       fireEvent.click(collapseButton);
       expect(collapseButton).toHaveAttribute('aria-expanded', 'false');
     });
   });
});
