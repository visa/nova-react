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
/// Types:
export type CardBrand = 'AMERICAN_EXPRESS' | 'DISCOVER' | 'ELO' | 'MASTER_CARD' | 'MAESTRO' | 'VISA';

export type CardValidator<Brand = CardBrand> = {
  /** Regex to test if the BIN is valid. The card could still be short digits or invalid, and still have a valid BIN. */
  binRegex: RegExp;
  /**
   * Regex testing the array should be treated as a logical OR (if any of these are true then it's a BIN match).
   * These are split for easier development, and each regex test for certain BIN ranges. These aren't currently used for validation, only development, so they are optional.
   */
  binRegexes?: RegExp[];
  /** Brand ID */
  brand: Brand;
  /** Allowed number lengths for the card number */
  lengths: number[];
  /** Maximum length of the card number */
  maxLength: number;
} & (
  | {
      /**
       * Spacing pattern used to add spaces in card number string.
       * For example, if a card number should have 4 digits, space, 7 digits, space, 4 digits, set this as [4, 7, 4].
       */
      spacingPattern: number[];
      spacingPatterns?: never;
    }
  | {
      spacingPattern?: never;
      /**
       * Spacing patterns map used to add spaces in card number string for particular card number lengths.
       * For example, if a 16 digit card number should have 10 digits, space, 6 digits, set this as { 16: [10, 6] }.
       */
      spacingPatterns: Record<number, number[]>;
    }
);

/// Constants:
// Default spacing pattern for most card numbers (i.e. XXXX XXXX XXXX XXXX)
export const defaultSpacingPattern = [4, 4, 4, 4];

/**
 * This is all based off the {@link https://design.visa.com/components/card-input#card-number | card number guidance}.
 * @devNote This validator array is not comprehensive and is subject to change. VPDS does not maintain acceptance marks for all brands for legal reasons.
 */
export const cardValidators: Record<CardBrand, CardValidator> = {
  AMERICAN_EXPRESS: {
    binRegex: RegExp('^3(4|7)\\d*$'),
    binRegexes: [
      // For 34, 37 IIN
      RegExp('^3(4|7)\\d*$'),
    ],
    brand: 'AMERICAN_EXPRESS',
    lengths: [15],
    maxLength: 15,
    spacingPattern: [4, 6, 5],
  },
  DISCOVER: {
    binRegex: RegExp('^6(5|011|4[4-9]|22((1[2-9][6-9])|[2-8][0-9]{2}|9([0-1][0-9]|2[0-5])))\\d*$'),
    binRegexes: [
      // For 6011 IIN
      RegExp('^6011\\d{2,}$'),
      // For 65 IIN
      RegExp('^65\\d$'),
      // For 644-649 IIN
      RegExp('^64[4-9]\\d{3,}$'),
      // For 622126‑622925 IIN
      RegExp('^622(1[2-9][6-9]|[2-8][0-9]{2}|9([0-1][0-9]|2[0-5]))\\d*$'),
    ],
    brand: 'DISCOVER',
    lengths: [16, 19],
    maxLength: 19,
    spacingPattern: defaultSpacingPattern,
  },
  ELO: {
    binRegex: RegExp('^(50(4175|6(699|7\\d{2})|9\\d{3})|636(297|368))\\d*$'),
    binRegexes: [
      // For 504175, 506699-506799
      RegExp('^50(4175|6(699|7\\d{2}))\\d*$'),
      // For 509000-509999
      RegExp('^509\\d{3,}$'),
      // For 6636297, 636368
      RegExp('^636(297|368)\\d*$'),
    ],
    brand: 'ELO',
    lengths: [16],
    maxLength: 16,
    spacingPattern: defaultSpacingPattern,
  },
  // 5018, 5020, 5038, 5893, 6304, 6759, 6761-6763, 676770, 676774
  MAESTRO: {
    binRegex: RegExp('^(5018|5020|5038|5893|6304|6759|676[1-3]|676770|676774)\\d*$'),
    binRegexes: [
      // For 5018, 5020, 5038, 5893, 6304, 6759, 676770, 676774,
      RegExp('^(5018|5020|5038|5893|6304|6759|676770|676774)\\d*$'),
      // For 6761-6763,
      RegExp('^676[1-3]\\d*$'),
    ],
    brand: 'MAESTRO',
    lengths: [12, 13, 14, 15, 16, 17, 18, 19],
    maxLength: 19,
    spacingPatterns: { 13: [4, 4, 5], 15: [4, 6, 5], 16: defaultSpacingPattern, 19: [4, 4, 4, 4, 3] },
  },
  MASTER_CARD: {
    binRegex: RegExp('^(5[1-5]|2(22[1-9]|2[3-9]\\d|[3-6]\\d{2}|7[0-1]\\d|720))\\d*$'),
    binRegexes: [
      // For 51-55
      RegExp('^5[1-5]\\d*$'),
      // For 2221–2720
      RegExp('^2(22[1-9]|2[3-9]\\d|[3-6]\\d{2}|7[0-1]\\d|720)\\d*$'),
    ],
    brand: 'MASTER_CARD',
    lengths: [16],
    maxLength: 16,
    spacingPattern: defaultSpacingPattern,
  },
  VISA: {
    binRegex: RegExp('^4\\d*$'),
    binRegexes: [
      // For 4 IIN
      RegExp('^4\\d*$'),
    ],
    brand: 'VISA',
    lengths: [13, 16, 19],
    maxLength: 19,
    spacingPattern: defaultSpacingPattern,
  },
};

export const cardValidatorsArray = Object.values(cardValidators);

/// Helper functions:

/**
 * Checks if the card number length is valid based on the card validator's lengths array.
 * @param {string} cleanCardNumber
 * @param {CardValidator['lengths']} lengths
 * @returns {boolean}
 */
export const cardNumberLengthCheck = (cleanCardNumber: string, lengths?: CardValidator['lengths']): boolean => {
  const cleanCardNumberLength = cleanCardNumber.length;
  return !!lengths?.some(length => cleanCardNumberLength === length);
};

/**
 * Finds the card validator for the given card number based on the BIN regex.
 * If it returns undefined then bin is invalid. It is assumed that the card number is already cleaned.
 * @param cardNumber
 * @param cardValidators
 * @returns {CardValidator | undefined}
 */
export const findCardValidatorFromBinRegex = <Brand = CardBrand>(
  cardNumber: string,
  cardValidators = cardValidatorsArray as CardValidator<Brand>[]
): CardValidator<Brand> | undefined => cardValidators.find(validator => validator.binRegex.test(cardNumber));

/**
 * Formats the card number with the given spacing pattern.
 * It is assumed that the card number is already cleaned.
 * @param cardNumber
 * @param spacingPattern
 * @returns {string}
 */
export const formatCardNumber = (cardNumber: string, spacingPattern: number[] = defaultSpacingPattern): string => {
  let from = 0;
  return (
    spacingPattern.reduce((prevValue, spacingLength) => {
      const currentFrom = from;
      from += spacingLength;
      return prevValue + cardNumber.slice(currentFrom, currentFrom + spacingLength) + ' ';
    }, '') + cardNumber.slice(from)
  ).trim();
};

/**
 * Formats the card number with the given card validator's spacing pattern.
 * It is assumed that the card number is already cleaned.
 * @param {string} cardNumber
 * @param {CardValidator<Brand>} cardValidator
 * @returns {string}
 */
export const formatCardNumberFromValidator = <Brand = CardBrand>(
  cardNumber: string,
  cardValidator?: CardValidator<Brand>
): string => {
  if (cardValidator?.spacingPatterns)
    return formatCardNumber(cardNumber, cardValidator.spacingPatterns[cardNumber.length]);
  return formatCardNumber(cardNumber, cardValidator?.spacingPattern);
};

/**
 * Based off {@link https://en.wikipedia.org/wiki/Luhn_algorithm | Luhn algorithm}.
 * This is typically used to verify the last digit of credit card numbers.
 * @param {string} numToCheck string as number to check
 * @param {number} mod check modulus, defaults to 10
 * @returns {boolean} whether the mod check is true or false
 */
export const moduloCheck = (numToCheck: string, mod: number = 10): boolean => {
  const length = numToCheck.length - 1;
  let total = 0;
  for (let i = 0; i <= length; i++) {
    const placement = length - i;
    const nextNum = +numToCheck[placement];
    // If at even iteration, add number to total
    if (!(i % 2)) total += nextNum;
    // At odd intervals, multiply the number by 2
    else {
      const doubleNextNum = nextNum * 2;
      // If the doubled number exceeds 10, subtract 9 to get it back to a single digit
      total += doubleNextNum > 9 ? doubleNextNum - 9 : doubleNextNum;
    }
  }
  return total % mod === 0;
};

/**
 * Removes all characters after the maxLength
 * @param {string} cardNumber raw card number input
 * @param {number | undefined} maxLength remove all characters after this length
 * @returns {string}
 */
export const removeCharactersAfterMaxLength = (cardNumber: string, maxLength?: number): string =>
  maxLength === undefined ? cardNumber : cardNumber.slice(0, maxLength);

/**
 * Removes all non-numeric characters
 * @param {string} cardNumber raw card number input
 * @returns {string}
 */
export const removeNonDigits = (cardNumber: string): string => cardNumber.replace(/\D/g, '');

export default {
  cardNumberLengthCheck,
  cardValidators,
  cardValidatorsArray,
  defaultSpacingPattern,
  findCardValidatorFromBinRegex,
  formatCardNumber,
  formatCardNumberFromValidator,
  moduloCheck,
  removeCharactersAfterMaxLength,
  removeNonDigits,
};
