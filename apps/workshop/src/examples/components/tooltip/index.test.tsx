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
import { axe } from 'jest-axe';

import metaData from './meta.json';

import { BottomTooltip } from './bottom-tooltip';
import { LeftTooltip } from './left-tooltip';
import { RightTooltip } from './right-tooltip';
import { TopTooltip } from './top-tooltip';

const examples = [
  { Component: BottomTooltip, title: metaData['bottom-tooltip'].title },
  { Component: LeftTooltip, title: metaData['left-tooltip'].title },
  { Component: RightTooltip, title: metaData['right-tooltip'].title },
  { Component: TopTooltip, title: metaData['top-tooltip'].title },
];

describe('Tooltip examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('bottom tooltip', () => {
    it('should show on hover', async () => {
      render(<BottomTooltip />);
      const button = screen.getByText<HTMLButtonElement>('Primary action');
      button.focus();
      fireEvent.mouseOver(button);
      expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
    });
  });

  describe('left tooltip', () => {
    it('should show on hover', async () => {
      render(<LeftTooltip />);
      const button = screen.getByText<HTMLButtonElement>('Primary action');
      button.focus();
      fireEvent.mouseOver(button);
      expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
    });
  });

  describe('right tooltip', () => {
    it('should show on hover', async () => {
      render(<RightTooltip />);
      const button = screen.getByText<HTMLButtonElement>('Primary action');
      button.focus();
      fireEvent.mouseOver(button);
      expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
    });
  });

  describe('top tooltip', () => {
    it('should show on hover', async () => {
      render(<TopTooltip />);
      const button = screen.getByText<HTMLButtonElement>('Primary action');
      button.focus();
      fireEvent.mouseOver(button);
      expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();
    });
  });
});
