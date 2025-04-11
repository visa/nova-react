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

import { ContainerHideBreakpoints } from './container-hide-breakpoints';
import { HideBreakpoints } from './hide-breakpoints';
import { MediaHideBreakpoints } from './media-hide-breakpoints';

const examples = [
  { Component: HideBreakpoints, title: metaData['hide-breakpoints'].title },
  { Component: ContainerHideBreakpoints, title: metaData['container-hide-breakpoints'].title },
  { Component: MediaHideBreakpoints, title: metaData['media-hide-breakpoints'].title },
];

describe('Breakpoints examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });
  describe('hide', () => {
    it('should hide on hide click', () => {
      render(<HideBreakpoints />);
      const button = screen.getByText('Hide');
      fireEvent.click(button);
      expect(screen.queryByText('Show')).not.toBeNull();
    });
  });
});
