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

import { ColorInput } from './color-input';

const examples = [
    {
      Component: ColorInput,
      title: metaData['color-input'].title,
    },
  ];
  
describe('Input examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('color selector', ()=> {
    it('should display tooltip on button hover', () => {
      const { container } = render(<ColorInput />);
      const button = container.querySelector<HTMLButtonElement>('[aria-label="Color selector accessibility information"]')!;
      expect(screen.queryByText('For RGB, use values between 0-255. For HSL, use H values between 0-359, S and L values between 0-100%. For hex, use the format #RRGGBB and values between 0-9 or A-F.')).not.toBeInTheDocument();
      fireEvent.mouseEnter(button);
      expect(screen.queryByText('For RGB, use values between 0-255. For HSL, use H values between 0-359, S and L values between 0-100%. For hex, use the format #RRGGBB and values between 0-9 or A-F.')).toBeInTheDocument();
      fireEvent.mouseLeave(button);
      expect(screen.queryByText('For RGB, use values between 0-255. For HSL, use H values between 0-359, S and L values between 0-100%. For hex, use the format #RRGGBB and values between 0-9 or A-F.')).not.toBeInTheDocument();
    })
  });
});