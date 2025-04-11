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

import { UseCardValidationUsage } from './use-card-validation-example';

const examples = [{ Component: UseCardValidationUsage, title: metaData['use-card-validation-example'].title }];

describe('usePagination example', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('UseCardValidationUsage', () => {
    it('should allow for input change', () => {
      render(<UseCardValidationUsage />);
      const cardInput = screen.getByLabelText('Visa card number');
      fireEvent.change(cardInput, { target: { value: '4000000000006' } });
      expect(screen.getByText('valid: true')).toBeInTheDocument();
    });
    it('should show undefined for invalid card number', () => {
      render(<UseCardValidationUsage />);
      const cardInput = screen.getByLabelText('Visa card number');
      fireEvent.change(cardInput, { target: { value: '' } });
      expect(screen.getByText('cardNumberValidator.brand: undefined')).toBeInTheDocument();
    });
    it('should show more digits if trimToMaxLength is switched to true', () => {
      render(<UseCardValidationUsage />);
      const trimToMaxLengthSwitch = screen.getByLabelText('trimToMaxLength');
      fireEvent.click(trimToMaxLengthSwitch);
      expect(screen.getByText('formattedCardNumber: 4000 0000 0000 0000 000000')).toBeInTheDocument();
      expect(screen.getByText('lengthValid: false')).toBeInTheDocument();
    });
    it('should show more digits if trimToMaxLength is switched to true', () => {
      render(<UseCardValidationUsage />);
      const inputValueKey = screen.getByLabelText('Visa card number input value');
      fireEvent.change(inputValueKey, { target: { value: 'formattedCardNumber' } });
      const cardInput = screen.getByLabelText('Visa card number');
      expect(cardInput.getAttribute('value')).toBe('4000 0000 0000 0000 000');
    });
  });
});
