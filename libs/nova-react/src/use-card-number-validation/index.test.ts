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
import { act, renderHook } from '@testing-library/react';

import useListbox from '.';

describe('useCardValidation', () => {
  it('should pass through default card value and check values', () => {
    const { result } = renderHook(() => useListbox({ defaultCardNumberInputValue: '4111-11111111abcd' }));
    expect(result.current.cardNumberInputValue).toBe('4111-11111111abcd');
    expect(result.current.formattedCardNumber).toBe('4111 1111 1111');
    expect(result.current.cleanCardNumber).toBe('411111111111');
    expect(result.current.brand).toBe('VISA');
    expect(result.current.brandValid).toBe(true);
    expect(result.current.cardNumberValidator?.brand).toBe('VISA');
    expect(result.current.binValid).toBe(true);
    expect(result.current.lastDigitValid).toBe(false);
    expect(result.current.valid).toBe(false);
  });
  it('should be invalid if last digit is invalid', () => {
    const { result } = renderHook(() => useListbox({ defaultCardNumberInputValue: '4111111111111112' }));
    expect(result.current.cardNumberValidator).toBeTruthy();
    expect(result.current.valid).toBe(false);
  });
  it('should be valid if passes all checks', () => {
    const { result } = renderHook(() => useListbox({ defaultCardNumberInputValue: '4111111111111111' }));
    expect(result.current.valid).toBe(true);
  });
  it('should filter out brands', () => {
    const { result } = renderHook(() =>
      useListbox({ defaultCardNumberInputValue: '370000000000000', filteredForBrands: ['VISA'] })
    );
    expect(result.current.binValid).toBe(false);
  });
  it('should not allow certain brands', () => {
    const { result } = renderHook(() =>
      useListbox({ defaultCardNumberInputValue: '370000000000000', allowedBrands: ['VISA'] })
    );
    expect(result.current.binValid).toBe(true);
    expect(result.current.brandValid).toBe(false);
  });
  it('should allow certain brands', () => {
    const { result } = renderHook(() =>
      useListbox({ defaultCardNumberInputValue: '370000000000000', allowedBrands: ['AMERICAN_EXPRESS'] })
    );
    expect(result.current.binValid).toBe(true);
    expect(result.current.brandValid).toBe(true);
  });
  it('should allow cardNumberInputValue change', () => {
    const { result } = renderHook(() => useListbox({ defaultCardNumberInputValue: '37' }));
    act(() => {
      result.current.onCardNumberChange('370?');
    });
    expect(result.current.cleanCardNumber).toBe('370');
    expect(result.current.cardNumberInputValue).toBe('370?');
  });
  it('should show brand invalid if no brand is found', () => {
    const { result } = renderHook(() => useListbox());
    expect(result.current.brandValid).toBe(false);
  });
  it('should show brand invalid if no brand is found and allowedBrands are set', () => {
    const { result } = renderHook(() => useListbox({ allowedBrands: ['VISA'] }));
    expect(result.current.brandValid).toBe(false);
  });
  it("shouldn't trim card number if trimToMaxLength is false", () => {
    const { result } = renderHook(() =>
      useListbox({ defaultCardNumberInputValue: '40000000000000000000', trimToMaxLength: false })
    );
    expect(result.current.cleanCardNumber).toBe('40000000000000000000');
  });
  it('should not length validity if card number is too long', () => {
    const { result } = renderHook(() => useListbox({ defaultCardNumberInputValue: '22222222222222222222' }));
    expect(result.current.lengthValid).toBe(true);
  });
});
