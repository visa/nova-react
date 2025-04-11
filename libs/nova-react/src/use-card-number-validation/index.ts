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
import { useState } from 'react';
import {
  CardBrand,
  cardNumberLengthCheck,
  CardValidator,
  cardValidators,
  findCardValidatorFromBinRegex,
  formatCardNumberFromValidator,
  moduloCheck,
  removeCharactersAfterMaxLength,
  removeNonDigits,
} from './utils';

export type UseCardNumberValidationProps<Brand extends string = CardBrand> = {
  /** Allowed brands array, if undefined all brands allowed. This is used for validation only and will not filter the validators. */
  allowedBrands?: Brand[];
  /** Default card number input state */
  defaultCardNumberInputValue?: string;
  /** Filtered brands array, if undefined no brands will be filtered. Only these brands will be checked for, the rest will be filtered out. */
  filteredForBrands?: Brand[];
  /** Remove all digits passed the matching card validator's max length */
  trimToMaxLength?: boolean;
  /** Custom validators if our validators don't fit your use cases */
  validators?: Record<Brand, CardValidator<Brand>>;
};

/**
 * @docs {@link https://design.visa.com/react/hooks/use-card-number-validation | See Docs}
 * @description This hook is used to to validate card numbers. This hook uses BIN regex's, length, Luhn checksum algorithm (modulo 10 check), and brands to check card number validity. This hook is designed to be flexible and allow for custom validators.
 * @devNote This hook's validation is not comprehensive and is subject to change. VPDS does not maintain acceptance marks for all brands for legal reasons. This hook is designed to let you bring your own validators, if custom validators are required for your use case.
 * @related input, select
 */
export const useCardNumberValidation = <Brand extends string = CardBrand>(
  useCardNumberValidationOptions?: UseCardNumberValidationProps<Brand>
) => {
  /// Options
  const { allowedBrands, defaultCardNumberInputValue, filteredForBrands, trimToMaxLength, validators } = {
    defaultCardNumberInputValue: '',
    trimToMaxLength: true,
    validators: cardValidators as Record<Brand, CardValidator<Brand>>,
    ...useCardNumberValidationOptions,
  };

  /// State
  const [cardNumberInputValue, setCardNumberInputValue] = useState(defaultCardNumberInputValue);

  /// Events
  const onCardNumberChange = (cardNumberInputValue: string) => setCardNumberInputValue(cardNumberInputValue);

  /// Derived state
  const allowedValidators: CardValidator<Brand>[] = filteredForBrands?.length
    ? filteredForBrands.map(brand => validators[brand])
    : Object.values(validators);
  const cardNumberWithDigitsOnly = removeNonDigits(cardNumberInputValue);
  const cardNumberValidator = findCardValidatorFromBinRegex<Brand>(cardNumberWithDigitsOnly, allowedValidators);
  const cleanedCardNumberWithMaxDigitsTrimmed = trimToMaxLength
    ? removeCharactersAfterMaxLength(cardNumberWithDigitsOnly, cardNumberValidator?.maxLength)
    : cardNumberWithDigitsOnly;
  const formattedCardNumber = formatCardNumberFromValidator<Brand>(
    cleanedCardNumberWithMaxDigitsTrimmed,
    cardNumberValidator
  );
  // Validation states
  const isBinValid = !!cardNumberValidator;
  const isBrandValid = allowedBrands?.length
    ? (allowedBrands as string[]).includes(cardNumberValidator?.brand || '')
    : !!cardNumberValidator?.brand;
  const isLastDigitValid = moduloCheck(cleanedCardNumberWithMaxDigitsTrimmed);
  const isLengthValid = cardNumberLengthCheck(cleanedCardNumberWithMaxDigitsTrimmed, cardNumberValidator?.lengths);
  const isValid = isBinValid && isBrandValid && isLastDigitValid && isLengthValid;

  return {
    /** BIN is valid */
    binValid: isBinValid,
    /** Brand if BIN is valid, undefined if BIN is not valid */
    brand: cardNumberValidator?.brand,
    /** The brand input is included in allowedBrands */
    brandValid: isBrandValid,
    /** Raw input value state sent from onCardNumberChange */
    cardNumberInputValue,
    /** Card validator from BIN if BIN is matched, undefined if BIN not recognized */
    cardNumberValidator,
    /** cardNumberInputValue with non digit values filtered out, and/or max characters removed */
    cleanCardNumber: cleanedCardNumberWithMaxDigitsTrimmed,
    /** cleanCardNumber with the proper spacing */
    formattedCardNumber,
    /** Valid last digit based off mod 10 check */
    lastDigitValid: isLastDigitValid,
    /** The card number length is valid, validated with cleanCardNumber  */
    lengthValid: isLengthValid,
    /** Setter for cardNumberInputValue state */
    onCardNumberChange,
    /** The card number is fully valid based on BIN regex's, allowed brands, length, and modulo 10 check */
    valid: isValid,
  };
};

export default useCardNumberValidation;

export * from './utils';

useCardNumberValidation.displayName = 'useCardNumberValidation';

useCardNumberValidation.defaultProps = {
  allowedBrands: undefined,
  defaultCardNumber: '',
  filteredForBrands: undefined,
  trimToMaxLength: true,
  validators: { ...cardValidators },
};
