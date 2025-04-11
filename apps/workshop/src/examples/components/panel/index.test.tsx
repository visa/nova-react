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

import { DefaultPanel } from './default-panel';
import { ModalExpandablePanel } from './expandable-panel';
import { SecondaryModalExpandablePanel } from './expandable-panel-secondary';
import { ModalExpandablePanelWithSkrim } from './expandable-panel-skrim';
import { ExpandableResponsivePanel } from './expandable-responsive-panel';
import { ModalPanel } from './modal-panel';
import { TabbedModalExpandablePanel } from './tabbed-expandable-panel';
import { TabbedExpandableResponsivePanel } from './tabbed-expandable-responsive-panel';

const examples = [
  { Component: DefaultPanel, title: metaData['default-panel'].title },
  { Component: SecondaryModalExpandablePanel, title: metaData['expandable-panel-secondary'].title },
  { Component: ModalExpandablePanelWithSkrim, title: metaData['expandable-panel-skrim'].title },
  { Component: ModalExpandablePanel, title: metaData['expandable-panel'].title },
  { Component: ExpandableResponsivePanel, title: metaData['expandable-responsive-panel'].title },
  { Component: ModalPanel, title: metaData['modal-panel'].title },
  { Component: TabbedModalExpandablePanel, title: metaData['tabbed-expandable-panel'].title },
  { Component: TabbedExpandableResponsivePanel, title: metaData['tabbed-expandable-responsive-panel'].title },
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

describe('Panel examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('expandable panel', () => {
    it('should expand when clicked', () => {
      const { container } = render(<ModalExpandablePanel />);
      const button = container.querySelector('button')!;
      fireEvent.click(button);
      expect(button.getAttribute('aria-expanded')).toEqual('false');
    });
  });
  describe('expandable responsive panel', () => {
    it('should expand when clicked', () => {
      const { container } = render(<ExpandableResponsivePanel />);
      const button = container.querySelector('button')!;
      fireEvent.click(button);
      expect(button.getAttribute('aria-expanded')).toEqual('false');
    });
    it('should close when close clicked', () => {
      render(<ExpandableResponsivePanel />);
      const closeButton = screen.getByLabelText('Close panel')!;
      fireEvent.click(closeButton);
      expect(screen.queryByLabelText('Open panel')).toBeInTheDocument();
    });
    it('should open when open clicked', () => {
      render(<ExpandableResponsivePanel />);
      const closeButton = screen.getByLabelText('Close panel')!;
      fireEvent.click(closeButton);
      const openButton = screen.getByLabelText('Open panel')!;
      fireEvent.click(openButton);
      expect(screen.queryByLabelText('Close panel')).toBeInTheDocument();
    });
  });
  describe('expandable modal panel', () => {
    it('should expand when clicked', () => {
      render(<ModalExpandablePanel />);
      const button = screen.getByLabelText('Open panel')!;
      fireEvent.click(button);
      expect(screen.getByLabelText('Close panel').getAttribute('aria-expanded')).toEqual('true');
    });
    it('should close when close clicked', () => {
      render(<ModalExpandablePanel />);
      const button = screen.getByLabelText('Open panel');
      fireEvent.click(button);
      const closeButton = screen.getByLabelText('Close panel')!;
      fireEvent.click(closeButton);
      expect(screen.queryByLabelText('Open panel')).toBeInTheDocument();
    });
    it('should trap focus', async () => {
      render(<ModalExpandablePanel />);
      const button = screen.getByLabelText('Open panel');
      const user = userEvent.setup();
      fireEvent.click(button);
      await user.tab();
      await user.tab();
      await user.tab();
      const closeButton = screen.getByLabelText('Close panel')!;
      expect(closeButton).toHaveFocus();
    });
  });
  describe('modal panel', () => {
    it('should show when clicked', () => {
      const { container } = render(<ModalPanel />);
      const button = screen.getByText('Open modal panel');
      fireEvent.click(button);
      fireEvent.keyDown(container, { key: 'Tab', code: 'Tab' });
      const modal = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(modal.hasAttribute('open')).toBe(true);
    });
    it('should close when close clicked', () => {
      const { container } = render(<ModalPanel />);
      const button = screen.getByText('Open modal panel');
      fireEvent.click(button);
      const closeButton = screen.getByLabelText('Close panel');
      fireEvent.click(closeButton);
      const modal = container.querySelector<HTMLDialogElement>('dialog')!;
      expect(modal.hasAttribute('open')).toBe(false);
    });
    it('should trap focus', async () => {
      const { container } = render(<ModalPanel />);
      const button = screen.getByText('Open modal panel');
      const user = userEvent.setup();
      fireEvent.click(button);
      await user.tab();
      await user.tab();
      await user.tab();
      const closeButton = container.querySelector('[aria-label="Close panel"]')!;
      expect(closeButton).toHaveFocus();
    });
  });
  describe('expandable modal panel secondary', () => {
    it('should expand when clicked', () => {
      render(<SecondaryModalExpandablePanel />);
      const button = screen.getByLabelText('Open panel')!;
      fireEvent.click(button);
      expect(screen.getByLabelText('Close panel').getAttribute('aria-expanded')).toEqual('true');
    });
    it('should close when close clicked', () => {
      render(<SecondaryModalExpandablePanel />);
      const button = screen.getByLabelText('Open panel');
      fireEvent.click(button);
      const closeButton = screen.getByLabelText('Close panel')!;
      fireEvent.click(closeButton);
      expect(screen.queryByLabelText('Open panel')).toBeInTheDocument();
    });
    it('should trap focus', async () => {
      render(<SecondaryModalExpandablePanel />);
      const button = screen.getByLabelText('Open panel');
      const user = userEvent.setup();
      fireEvent.click(button);
      await user.tab();
      await user.tab();
      await user.tab();
      const closeButton = screen.getByLabelText('Close panel')!;
      expect(closeButton).toHaveFocus();
    });
  });
  describe('expandable modal panel skrim', () => {
    it('should expand when clicked', () => {
      render(<ModalExpandablePanelWithSkrim />);
      const button = screen.getByLabelText('Open panel')!;
      fireEvent.click(button);
      expect(screen.getByLabelText('Close panel').getAttribute('aria-expanded')).toEqual('true');
    });
    it('should close when close clicked', () => {
      render(<ModalExpandablePanelWithSkrim />);
      const button = screen.getByLabelText('Open panel');
      fireEvent.click(button);
      const closeButton = screen.getByLabelText('Close panel')!;
      fireEvent.click(closeButton);
      expect(screen.queryByLabelText('Open panel')).toBeInTheDocument();
    });
    it('should trap focus', async () => {
      render(<ModalExpandablePanelWithSkrim />);
      const button = screen.getByLabelText('Open panel');
      const user = userEvent.setup();
      fireEvent.click(button);
      await user.tab();
      await user.tab();
      await user.tab();
      const closeButton = screen.getByLabelText('Close panel')!;
      expect(closeButton).toHaveFocus();
    });
  });
  describe('tabbed expandable modal panel', () => {
    it('should expand when clicked', () => {
      render(<TabbedModalExpandablePanel />);
      const button = screen.getByLabelText('Open panel')!;
      fireEvent.click(button);
      expect(screen.getByLabelText('Close panel').getAttribute('aria-expanded')).toEqual('true');
    });
    it('should close when close clicked', () => {
      render(<TabbedModalExpandablePanel />);
      const button = screen.getByLabelText('Open panel');
      fireEvent.click(button);
      const closeButton = screen.getByLabelText('Close panel')!;
      fireEvent.click(closeButton);
      expect(screen.queryByLabelText('Open panel')).toBeInTheDocument();
    });
    it('should select tab in open panel', () => {
      render(<TabbedModalExpandablePanel />);
      const panelOpenButton = screen.getByLabelText('Open panel');
      fireEvent.click(panelOpenButton);
      const tab = screen.getByText('Chat');
      fireEvent.click(tab);
      expect(tab.getAttribute('aria-selected')).toEqual('true');
    });
    it('should trap focus', async () => {
      render(<TabbedModalExpandablePanel />);
      const button = screen.getByLabelText('Open panel');
      const user = userEvent.setup();
      fireEvent.click(button);
      await user.tab();
      await user.tab();
      await user.tab();
      await user.tab();
      await user.tab();
      await user.tab();
      const closeButton = screen.getByLabelText('Close panel')!;
      expect(closeButton).toHaveFocus();
    });
  });
  describe('tabbed expandable responsive panel', () => {
    it('should expand when clicked', () => {
      const { container } = render(<TabbedExpandableResponsivePanel />);
      const button = container.querySelector('button')!;
      fireEvent.click(button);
      expect(button.getAttribute('aria-expanded')).toEqual('false');
    });
    it('should select tab in open panel', () => {
      render(<TabbedExpandableResponsivePanel />);
      const tab = screen.getByText('Chat');
      fireEvent.click(tab);
      expect(tab.getAttribute('aria-selected')).toEqual('true');
    });
    it('should close when close clicked', () => {
      render(<TabbedExpandableResponsivePanel />);
      const closeButton = screen.getByLabelText('Close panel')!;
      fireEvent.click(closeButton);
      expect(screen.queryByLabelText('Open panel')).toBeInTheDocument();
    });
    it('should open when open clicked', () => {
      render(<TabbedExpandableResponsivePanel />);
      const closeButton = screen.getByLabelText('Close panel')!;
      fireEvent.click(closeButton);
      const openButton = screen.getByLabelText('Open panel')!;
      fireEvent.click(openButton);
      expect(screen.queryByLabelText('Close panel')).toBeInTheDocument();
    });
  });
});
