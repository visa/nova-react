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

import { BrowserRouter } from 'react-router-dom';
import metaData from './meta.json';

import { CollapsedAccordion } from './collapsed-accordion';
import { CollapsedDisabledAccordion } from './collapsed-disabled-accordion';
import { DefaultMultiSelectAccordionGroup } from './default-multi-select-accordion-group';
import { DefaultSingleSelectAccordionGroup } from './default-single-select-accordion-group';
import { DefaultWithItemOpenAccordion } from './default-with-item-open-accordion';
import { DisabledSubtleAccordion } from './disabled-subtle-accordion';
import { DisclosureGroupAccordion } from './disclosure-group-accordion';
import { KeyNavGroupAccordion } from './key-nav-group-accordion';
import { MultiSelectAccordionGroupWithDisabled } from './multi-select-accordion-group-with-disabled';
import { MultiSelectAccordionGroupWithExpanded } from './multi-select-accordion-group-with-expanded';
import { SingleSelectAccordionGroupWithExpanded } from './single-select-accordion-group-with-expanded';
import { SubtleAccordion } from './subtle-accordion';
import { SubtleAccordionWithIcon } from './subtle-accordion-with-icon';
import { SubtleMultiSelectAccordionGroup } from './subtle-multi-select-accordion-group';
import { SubtleSingleSelectAccordionGroup } from './subtle-single-select-accordion-group';
import { WithBadgeAccordion } from './with-badge-accordion';
import { WithIconAccordion } from './with-icon-accordion';
import { NativeSingleSelectAccordionGroup } from './native-single-select-accordion-group';

const examples = [
  { Component: CollapsedAccordion, title: metaData['collapsed-accordion'].title },
  { Component: CollapsedDisabledAccordion, title: metaData['collapsed-disabled-accordion'].title },
  { Component: DefaultMultiSelectAccordionGroup, title: metaData['default-multi-select-accordion-group'].title },
  { Component: DefaultSingleSelectAccordionGroup, title: metaData['default-single-select-accordion-group'].title },
  { Component: DefaultWithItemOpenAccordion, title: metaData['default-with-item-open-accordion'].title },
  { Component: DisabledSubtleAccordion, title: metaData['disabled-subtle-accordion'].title },
  { Component: DisclosureGroupAccordion, title: metaData['disclosure-group-accordion'].title },
  { Component: KeyNavGroupAccordion, title: metaData['key-nav-group-accordion'].title },
  { Component: NativeSingleSelectAccordionGroup, title: metaData['native-single-select-accordion-group'].title },
  {
    Component: MultiSelectAccordionGroupWithDisabled,
    title: metaData['multi-select-accordion-group-with-disabled'].title,
  },
  {
    Component: MultiSelectAccordionGroupWithExpanded,
    title: metaData['multi-select-accordion-group-with-expanded'].title,
  },
  {
    Component: SingleSelectAccordionGroupWithExpanded,
    title: metaData['single-select-accordion-group-with-expanded'].title,
  },
  {
    Component: SubtleSingleSelectAccordionGroup,
    title: metaData['subtle-single-select-accordion-group'].title,
  },
  {
    Component: SubtleAccordionWithIcon,
    title: metaData['subtle-accordion-with-icon'].title,
  },
  {
    Component: SubtleMultiSelectAccordionGroup,
    title: metaData['subtle-multi-select-accordion-group'].title,
  },
  { Component: SubtleAccordion, title: metaData['subtle-accordion'].title },
  { Component: WithIconAccordion, title: metaData['with-icon-accordion'].title },
  { Component: WithBadgeAccordion, title: metaData['with-badge-accordion'].title },
];

describe('Accordion examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      );
      expect(container).toMatchSnapshot();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('collapsed-accordion', () => {
    it('should expand accordion when clicked', () => {
      render(<CollapsedAccordion />);

      const element = screen.getByText('Accordion title');

      fireEvent.click(element);

      expect(element.parentElement).toHaveAttribute('open');
    });
  });

  describe('collapsed-disabled-accordion', () => {
    it('should render the accordion with the title and panel', () => {
      render(<CollapsedDisabledAccordion />);

      const titleElement = screen.getByText('Accordion title');
      const panelElement = screen.getByText(
        'This is required text that describes the accordion section in more detail.'
      );

      expect(titleElement).toBeInTheDocument();
      expect(panelElement).toBeInTheDocument();
    });

    it('should have the title element disabled', () => {
      render(<CollapsedDisabledAccordion />);

      const titleElement = screen.getByText('Accordion title');
      const buttonElement = titleElement.closest('button');

      expect(buttonElement).toBeDisabled();
    });

    it('should not expand the accordion when the title is clicked', () => {
      const { container } = render(<CollapsedDisabledAccordion />);

      const titleElement = screen.getByText('Accordion title');
      const buttonElement = titleElement.closest('button')!;

      fireEvent.click(buttonElement);

      expect(buttonElement).toBeDisabled();

      const panelElement = container.querySelector('#collapsed-disabled-accordion-accordion-panel');
      expect(panelElement).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('with-icon-accordion', () => {
    it('should expand an accordion when clicked', () => {
      render(<WithIconAccordion />);

      const element = screen.getByText('Accordion title');

      fireEvent.click(element);

      expect(element.parentElement).toHaveAttribute('open');
    });
  });

  describe('with-badge-accordion', () => {
    it('should expand an accordion when clicked', () => {
      render(<WithBadgeAccordion />);

      const element = screen.getByText('Accordion title');

      fireEvent.click(element);

      expect(element.parentElement).toHaveAttribute('open');
    });
  });

  describe('subtle-accordion', () => {
    it('should expand accordion when clicked', () => {
      render(<SubtleAccordion />);

      const element = screen.getByText('Accordion title');

      fireEvent.click(element);

      expect(element.parentElement).toHaveAttribute('open');
    });
  });

  describe('collapsed-and-disabled-subtle-accordion', () => {
    it('should do nothing to the accordion when clicked', () => {
      render(<DisabledSubtleAccordion />);

      const textElement = screen.getByText('Accordion title');
      const buttonElement = textElement.closest('button')!;

      fireEvent.click(buttonElement);

      expect(buttonElement).toBeDisabled();

      // Check if the toggle icon has the correct class when the accordion is closed
      const toggleIcon = buttonElement.querySelector('.v-accordion-toggle-icon');
      expect(toggleIcon).toHaveClass(
        'v-icon v-icon-visa v-icon-tiny v-icon-chevron-right v-accordion-toggle-icon v-accordion-toggle-icon-closed'
      );
    });
  });

  describe('default-multi-select-accordion-group', () => {
    it('should expand an accordion when clicked', () => {
      render(<DefaultMultiSelectAccordionGroup />);

      const element1 = screen.getByText('Accordion title 1');
      const element2 = screen.getByText('Accordion title 2');

      fireEvent.click(element1);
      fireEvent.click(element2);

      expect(element1.parentElement).toHaveAttribute('open');
      expect(element2.parentElement).toHaveAttribute('open');
    });
  });
  describe('default-single-select-accordion-group', () => {
    it('should expand an accordion when clicked', () => {
      render(<DefaultSingleSelectAccordionGroup />);

      const element1 = screen.getByText('Accordion title 1');
      const element2 = screen.getByText('Accordion title 2');

      fireEvent.click(element1);
      expect(element1.parentElement).toHaveAttribute('open');

      fireEvent.click(element2);
      expect(element1.parentElement).not.toHaveAttribute('open');
      expect(element2.parentElement).toHaveAttribute('open');

      fireEvent.click(element1);
      fireEvent.click(element1);
      expect(element1.parentElement).not.toHaveAttribute('open');
      expect(element2.parentElement).not.toHaveAttribute('open');
    });
  });
  describe('subtle-single-select-accordion-group', () => {
    it('should expand an accordion when clicked', () => {
      render(<SubtleSingleSelectAccordionGroup />);

      const element1 = screen.getByText('Accordion title 1');
      const element2 = screen.getByText('Accordion title 2');

      fireEvent.click(element1);
      expect(element1.parentElement).toHaveAttribute('open');

      fireEvent.click(element2);
      expect(element1.parentElement).not.toHaveAttribute('open');
      expect(element2.parentElement).toHaveAttribute('open');

      fireEvent.click(element1);
      fireEvent.click(element1);
      expect(element1.parentElement).not.toHaveAttribute('open');
      expect(element2.parentElement).not.toHaveAttribute('open');
    });
  });

  describe('multi-section-group-with-disabled', () => {
    it('should expand non-disabled sections', () => {
      render(<MultiSelectAccordionGroupWithDisabled />);

      const element2 = screen.getByText('Accordion title 2');
      const element3 = screen.getByText('Accordion title 3');
      const buttonElement2 = element2.closest('button');
      const buttonElement3 = element3.closest('button');

      fireEvent.click(element2);
      fireEvent.click(element3);

      expect(buttonElement2).toHaveAttribute('aria-expanded', 'true');
      expect(buttonElement3).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('multi-section-open-group-accordion', () => {
    it('should expand an accordion when clicked and keep another section opened', () => {
      render(<MultiSelectAccordionGroupWithExpanded />);

      const element1 = screen.getByText('Accordion title 1');
      const element2 = screen.getByText('Accordion title 2');

      fireEvent.click(element1);
      fireEvent.click(element2);

      expect(element1.parentElement).not.toHaveAttribute('open');
      expect(element2.parentElement).toHaveAttribute('open');
    });
  });

  describe('single-select-accordion-group-with-expanded', () => {
    it('should expand an accordion when clicked and close the other accordion', () => {
      render(<SingleSelectAccordionGroupWithExpanded />);

      const element1 = screen.getByText('Accordion title 1');
      const element2 = screen.getByText('Accordion title 2');

      fireEvent.click(element1);
      fireEvent.click(element2);

      expect(element1.parentElement).not.toHaveAttribute('open');
      expect(element2.parentElement).toHaveAttribute('open');
    });
  });

  describe('custom-accordion-group-accordion', () => {
    it('should expand an accordion when clicked, and close the other accordion', () => {
      render(<DefaultWithItemOpenAccordion />);

      const element1 = screen.getByText('Accordion title 1');
      const element2 = screen.getByText('Accordion title 2');

      fireEvent.click(element2);

      expect(element1).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('custom-disclosure-group-accordion', () => {
    it('should expand an accordion when clicked, and keep the other accordion expanded', () => {
      render(<DisclosureGroupAccordion />);

      const element1 = screen.getByText('Accordion title 1');
      const element2 = screen.getByText('Accordion title 2');

      fireEvent.click(element2);

      expect(element1).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('custom-key-nav-group-accordion', () => {
    it('should expand an accordion when press Enter', async () => {
      render(<KeyNavGroupAccordion />);

      const user = userEvent.setup();
      const element1 = screen.getByText('Accordion title 1');
      const element2 = screen.getByText('Accordion title 2');

      await user.tab();
      await user.keyboard('{ArrowDown}');
      expect(element2).toHaveFocus();
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      expect(element1).toHaveFocus();

      fireEvent.click(element1);
      expect(element1).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
