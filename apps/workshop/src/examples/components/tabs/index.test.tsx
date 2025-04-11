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
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { BrowserRouter } from 'react-router-dom';
import metaData from './meta.json';

import { AlternateHorizontalTabs } from './alternate-horizontal-tabs';
import { AlternateStackedTabs } from './alternate-stacked-tabs';
import { AlternateVerticalTabs } from './alternate-vertical-tabs';
import { AutoHorizontalTabs } from './auto-horizontal-tabs';
import { DefaultHorizontalTabs } from './default-horizontal-tabs';
import { DefaultStackedTabs } from './default-stacked-tabs';
import { DefaultVerticalTabs } from './default-vertical-tabs';
import { DisabledHorizontalTabs } from './disabled-horizontal-tabs';
import { DisabledStackedTabs } from './disabled-stacked-tabs';
import { DisabledVerticalTabs } from './disabled-vertical-tabs';
import { IconHorizontalTabs } from './icon-horizontal-tabs';
import { IconVerticalTabs } from './icon-vertical-tabs';
import { VerticalTabWithMenu } from './vertical-tab-with-menu';
import { HorizontalTabWithMenu } from './horizontal-tab-with-menu';
import { StackedTabsWithNotifications } from './stacked-tabs-with-notifications';

const examples = [
  { Component: AlternateHorizontalTabs, title: metaData['alternate-horizontal-tabs'].title },
  { Component: AlternateStackedTabs, title: metaData['alternate-stacked-tabs'].title },
  { Component: AlternateVerticalTabs, title: metaData['alternate-vertical-tabs'].title },
  { Component: AutoHorizontalTabs, title: metaData['auto-horizontal-tabs'].title },
  { Component: DefaultHorizontalTabs, title: metaData['default-horizontal-tabs'].title },
  { Component: DefaultStackedTabs, title: metaData['default-stacked-tabs'].title },
  { Component: DefaultVerticalTabs, title: metaData['default-vertical-tabs'].title },
  { Component: DisabledHorizontalTabs, title: metaData['disabled-horizontal-tabs'].title },
  { Component: DisabledStackedTabs, title: metaData['disabled-stacked-tabs'].title },
  { Component: DisabledVerticalTabs, title: metaData['disabled-vertical-tabs'].title },
  { Component: IconHorizontalTabs, title: metaData['icon-horizontal-tabs'].title },
  { Component: IconVerticalTabs, title: metaData['icon-vertical-tabs'].title },
  { Component: VerticalTabWithMenu, title: metaData['vertical-tab-with-menu'].title },
  { Component: HorizontalTabWithMenu, title: metaData['horizontal-tab-with-menu'].title },
  { Component: StackedTabsWithNotifications, title: metaData['stacked-tabs-with-notifications'].title },
];

describe('Tabs examples', () => {
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

  describe('vertical tabs', () => {
    describe('default vertical tab', () => {
      it('should have active tab after click', () => {
        render(<DefaultVerticalTabs />);
        const tab = screen.getByText('Label 2');
        fireEvent.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
      it('should have active tab after keyboard navigation', async () => {
        render(<DefaultVerticalTabs />);
        const user = userEvent.setup();
        const tab = screen.getByText('Label 2');
        await user.tab();
        await user.keyboard('{ArrowDown}');
        await user.keyboard('{Enter}');
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
      it('should not have active tab after ArrowRight keyboard navigation for vertical tabs', async () => {
        render(<DefaultVerticalTabs />);
        const user = userEvent.setup();
        const tab = screen.getByText('Label 2');
        await user.tab();
        await user.keyboard('{ArrowRight}');
        await user.keyboard('{Enter}');
        expect(tab).toHaveAttribute('aria-selected', 'false');
      });
    });

    describe('vertical tab with icon', () => {
      it('should have active tab after click', () => {
        render(<IconVerticalTabs />);
        const tab = screen.getByText('Label 2');
        fireEvent.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
      it('should have active tab after keyboard navigation', async () => {
        render(<IconVerticalTabs />);
        const user = userEvent.setup();
        const tab = screen.getByText('Label 2');
        await user.tab();
        await user.keyboard('{ArrowDown}');
        await user.keyboard('{Enter}');
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('disabled vertical tab', () => {
      it('should have active tab after click', () => {
        render(<DisabledVerticalTabs />);
        const tab = screen.getByText('Label 2');
        fireEvent.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
      it('should have active tab after keyboard navigation', async () => {
        render(<DisabledVerticalTabs />);
        const user = userEvent.setup();
        const tab = screen.getByText('Label 4');
        await user.tab();
        await user.keyboard('{ArrowDown}');
        await user.keyboard('{ArrowDown}');
        await user.keyboard('{Enter}');
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('vertical tab with menu', () => {
      it('should expand on click', async () => {
        render(<VerticalTabWithMenu />);
        const button = screen.getByRole('button', { name: 'Label' });
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });

  describe('horizontal tabs', () => {
    describe('default horizontal tabs', () => {
      it('should have active tab after click', () => {
        render(<DefaultHorizontalTabs />);
        const tab = screen.getByText('Label 2');
        fireEvent.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
      it('should have active tab after keyboard navigation', async () => {
        render(<DefaultHorizontalTabs />);
        const user = userEvent.setup();
        const tab = screen.getByText('Label 2');
        await user.tab();
        await user.keyboard('{ArrowRight}');
        await user.keyboard('{Enter}');
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('horizontal tab with icon', () => {
      it('should have active tab after click', () => {
        render(<IconHorizontalTabs />);
        const tab = screen.getByText('Label 2');
        fireEvent.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
      it('should have active tab after keyboard navigation', async () => {
        render(<IconHorizontalTabs />);
        const user = userEvent.setup();
        const tab = screen.getByText('Label 2');
        await user.tab();
        await user.keyboard('{ArrowRight}');
        await user.keyboard('{Enter}');
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('disabled horizontal tab', () => {
      it('should have active tab after click', () => {
        render(<DisabledHorizontalTabs />);
        const tab = screen.getByText('Label 2');
        fireEvent.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
      it('should have active tab after keyboard navigation', async () => {
        render(<DisabledHorizontalTabs />);
        const user = userEvent.setup();
        const tab = screen.getByText('Label 4');
        await user.tab();
        await user.keyboard('{ArrowRight}');
        await user.keyboard('{ArrowRight}');
        await user.keyboard('{Enter}');
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('horizontal tab with menu', () => {
      it('should expand on click', async () => {
        render(<HorizontalTabWithMenu />);

        const button = screen.getByRole('button', { name: 'Label' });
        await waitFor(() => {
          fireEvent.click(button);
          expect(button).toHaveAttribute('aria-expanded', 'true');
        });
      });
    });
  });

  describe('Stacked tabs', () => {
    describe('default stacked tab', () => {
      it('should have active tab after click', () => {
        render(<DefaultStackedTabs />);
        const tab = screen.getByText('Label 2');
        fireEvent.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
      it('should have active tab after keyboard navigation', async () => {
        render(<DefaultStackedTabs />);
        const user = userEvent.setup();
        const tab = screen.getByText('Label 2');
        await user.tab();
        await user.keyboard('{ArrowRight}');
        await user.keyboard('{Enter}');
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('disabled stacked tab', () => {
      it('should have active tab after click', () => {
        render(<DisabledStackedTabs />);
        const tab = screen.getByText('Label 2');
        fireEvent.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
      it('should have active tab after keyboard navigation', async () => {
        render(<DisabledStackedTabs />);
        const user = userEvent.setup();
        const tab = screen.getByText('Label 4');
        await user.tab();
        await user.keyboard('{ArrowRight}');
        await user.keyboard('{ArrowRight}');
        await user.keyboard('{Enter}');
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('Stacked tab with notifications', () => {
      it('should have active tab after click', () => {
        render(<StackedTabsWithNotifications />);
        const tab = screen.getByText('Label 2');
        fireEvent.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
      it('should have active tab after keyboard navigation', async () => {
        render(<StackedTabsWithNotifications />);
        const user = userEvent.setup();
        const tab = screen.getByText('Label 2');
        await user.tab();
        await user.keyboard('{ArrowRight}');
        await user.keyboard('{Enter}');
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
    });
  });

  describe('Custom tab examples', () => {
    describe('alternate horizontal tab', () => {
      it('should have active tab after click', () => {
        render(<AlternateHorizontalTabs />);
        const tab = screen.getByText('Label 2');
        fireEvent.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
      it('should have active tab after keyboard navigation', async () => {
        render(<AlternateHorizontalTabs />);
        const user = userEvent.setup();
        const tab = screen.getByText('Label 2');
        await user.tab();
        await user.keyboard('{ArrowRight}');
        await user.keyboard('{Enter}');
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('alternate vertical tab', () => {
      it('should have active tab after click', () => {
        render(<AlternateVerticalTabs />);
        const tab = screen.getByText('Label 2');
        fireEvent.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
      it('should have active tab after keyboard navigation', async () => {
        render(<AlternateVerticalTabs />);
        const user = userEvent.setup();
        const tab = screen.getByText('Label 2');
        await user.tab();
        await user.keyboard('{ArrowDown}');
        await user.keyboard('{Enter}');
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('alternate stacked tab', () => {
      it('should have active tab after click', () => {
        render(<AlternateStackedTabs />);
        const tab = screen.getByText('Label 2');
        fireEvent.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
      it('should have active tab after keyboard navigation', async () => {
        render(<AlternateStackedTabs />);
        const user = userEvent.setup();
        const tab = screen.getByText('Label 2');
        await user.tab();
        await user.keyboard('{ArrowRight}');
        await user.keyboard('{Enter}');
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
      it('should not have active tab after ArrowDown keyboard navigation on horizontal tabs', async () => {
        render(<AlternateStackedTabs />);
        const user = userEvent.setup();
        const tab = screen.getByText('Label 2');
        await user.tab();
        await user.keyboard('{ArrowDown}');
        await user.keyboard('{Enter}');
        expect(tab).toHaveAttribute('aria-selected', 'false');
      });
    });

    describe('With automatic activation horizontal tabs', () => {
      it('should have active tab after click', () => {
        render(<AutoHorizontalTabs />);
        const tab = screen.getByText('Label 2');
        fireEvent.click(tab);
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
      it('should have active tab after keyboard navigation', async () => {
        render(<AutoHorizontalTabs />);
        const user = userEvent.setup();
        const tab = screen.getByText('Label 2');
        await user.tab();
        await user.keyboard('{ArrowRight}');
        expect(tab).toHaveAttribute('aria-selected', 'true');
      });
    });
  });
});
