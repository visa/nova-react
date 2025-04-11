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
import {
  cardNumberLengthCheck,
  cardValidators,
  findCardValidatorFromBinRegex,
  formatCardNumber,
  formatCardNumberFromValidator,
  moduloCheck,
  removeCharactersAfterMaxLength,
  removeNonDigits,
} from '.';

// Valid BINs
const validAmexBins = ['340000', '370000', '34', '37', '340', '370', '349', '379'];
const validDiscoverBins = [
  '601112',
  '6011123',
  '622126',
  '622126',
  '622575',
  '622925',
  '6229259',
  '65021234',
  '65921234',
  '64400000',
  '644000',
  '6441123',
  '644112',
  '6488888',
  '648888123',
  '6499999',
  '6499990',
];
const validEloBins = [
  '504175',
  '506699',
  '506700',
  '506700',
  '506704',
  '506714',
  '506716',
  '506718',
  '506721',
  '506722',
  '506724',
  '506725',
  '506726',
  '506727',
  '506728',
  '506729',
  '506730',
  '506731',
  '506732',
  '506733',
  '506735',
  '506741',
  '506742',
  '506744',
  '506748',
  '506753',
  '506754',
  '506755',
  '506758',
  '506760',
  '506761',
  '506762',
  '506764',
  '506766',
  '506767',
  '506770',
  '506771',
  '506774',
  '506775',
  '506776',
  '506778',
  '509000',
  '509002',
  '509003',
  '509008',
  '509014',
  '509015',
  '509017',
  '509018',
  '509032',
  '509034',
  '509041',
  '509042',
  '509045',
  '509048',
  '509051',
  '509055',
  '509059',
  '509061',
  '509063',
  '509065',
  '509067',
  '509068',
  '509069',
  '509073',
  '509091',
  '509093',
  '509291',
  '509728',
  '509882',
  '636297',
  '636368',
  '504175',
  '506699',
  '506700',
  '506799',
  '509000',
  '50955555',
  '509999',
  '636297',
  '636368',
];

const validMaestroBins = ['6759', '676770', '676774', '5018', '5020', '5038', '5893', '6304', '6761', '6762', '6763'];
const validMasterCardBins = [
  '51000000',
  '5599999999',
  '22210000',
  '22300000',
  '22900000',
  '25000000',
  '27000000',
  '27209999',
  '51',
  '52',
  '53',
  '54',
  '55',
  '222100',
  '222101',
  '272098',
  '272099',
  '2221',
  '2229',
  '2230',
  '2239',
  '2399',
  '2699',
  '2709',
  '2716',
  '2720',
];
const validVisaBins = ['400000', '412312', '412312', '412312', '4999999', '4', '44', '40', '49'];

const invalidCreditCardNumbers = [
  '000000000000000',
  '00000000000000000',
  '000000000',
  '0000000000000000000',
  '000000000000000000000',
  '00000000000000000000000',
  '000000000000000000000000',
];

const validMod10Numbers = [
  '01230002',
  '01230010',
  '01230028',
  '01230036',
  '01230044',
  '01230051',
  '01230069',
  '01230077',
  '01230085',
  '01230093',
  '01230101',
  '01230119',
  '01230127',
  '01230135',
  '01230143',
  '01230150',
  '01230168',
  '01230176',
  '01230184',
  '01230192',
  '01230200',
  '01230218',
  '01230226',
  '01230234',
  '01230242',
  '01230259',
  '01230267',
  '01230275',
  '01230283',
  '01230291',
  '01230309',
  '01230317',
  '01230325',
  '01230333',
  '01230341',
  '01230358',
  '01230366',
  '01230374',
  '01230382',
  '01230390',
  '01230408',
  '01230416',
  '01230424',
  '01230432',
  '01230440',
  '01230457',
  '01230465',
  '01230473',
  '01230481',
  '01230499',
  '01230507',
  '01230515',
  '01230523',
  '01230531',
  '01230549',
  '01230556',
  '01230564',
  '01230572',
  '01230580',
  '01230598',
  '01230606',
  '01230614',
  '01230622',
];
const invalidMod10Numbers = [
  '01230003',
  '01230011',
  '01230029',
  '01230037',
  '01230045',
  '01230052',
  '01230060',
  '01230078',
  '01230086',
  '01230094',
  '01230102',
  '01230110',
  '01230128',
  '01230136',
  '01230144',
  '01230151',
  '01230169',
  '01230178',
  '01230186',
  '01230195',
  '01230202',
  '01230214',
  '01230223',
  '01230245',
  '01230256',
  '01230264',
  '01230277',
  '01230282',
  '01230296',
  '01230307',
  '01230315',
  '01230323',
  '01230336',
  '01230343',
  '01230355',
  '01230367',
  '01230375',
  '01230383',
  '01230392',
  '01230404',
  '01230417',
  '01230422',
];

describe('useCardValidation utils', () => {
  describe('cardValidators', () => {
    describe('AMERICAN_EXPRESS validator', () => {
      const validator = cardValidators.AMERICAN_EXPRESS;
      const invalidBins = ['', '33', '35', '36', '38', '3300000', '350000', '36000000', '380000000'];
      const validBins = validAmexBins;
      it('should pass all binRegex edge cases and validations', () => {
        validBins.forEach(validBin => {
          expect(validator.binRegex.test(validBin)).toBe(true);
        });
        invalidBins.forEach(invalidBin => {
          expect(validator.binRegex.test(invalidBin)).toBe(false);
        });
      });
      it('should pass all valid lengths', () => {
        const validCardLengths = ['000000000000000'];
        validCardLengths.forEach(validLength => {
          expect(cardNumberLengthCheck(validLength, validator.lengths)).toBe(true);
        });
      });
      it('should pass all invalid lengths', () => {
        const invalidCardLengths = [
          '',
          '0',
          '00000000000000',
          '0000000000000000',
          '000000000000000000',
          '00000000000000000000',
        ];
        invalidCardLengths.forEach(invalidLength => {
          expect(cardNumberLengthCheck(invalidLength, validator.lengths)).toBe(false);
        });
      });
    });
    describe('DISCOVER validator', () => {
      const validator = cardValidators.DISCOVER;
      const validBins = validDiscoverBins;
      const invalidBins = ['', '6010', '6012', '622125', '622926', '643', '66'];

      it('should pass all binRegex edge cases and validations', () => {
        validBins.forEach(validBin => {
          expect(validator.binRegex.test(validBin)).toBe(true);
        });
        invalidBins.forEach(invalidBin => {
          // if (validator.binRegex.test(invalidBin)) console.log(invalidBin);
          expect(validator.binRegex.test(invalidBin)).toBe(false);
        });
      });

      it('should pass all valid lengths', () => {
        const validCardLengths = ['0000000000000000', '0000000000000000000'];
        validCardLengths.forEach(validLength => {
          expect(cardNumberLengthCheck(validLength, validator.lengths)).toBe(true);
        });
      });
      it('should pass all invalid lengths', () => {
        const invalidCardLengths = ['', '0', '000000000000000', '000000000000000000', '00000000000000000000'];
        invalidCardLengths.forEach(invalidLength => {
          expect(cardNumberLengthCheck(invalidLength, validator.lengths)).toBe(false);
        });
      });
    });

    describe('ELO validator', () => {
      const validator = cardValidators.ELO;
      const validBins = validEloBins;
      const invalidBins = [
        '',
        '504174',
        '504176',
        '506698',
        '506800',
        '508999',
        '510000',
        '636296',
        '636298',
        '636367',
        '636369',
      ];
      it('should pass all binRegex edge cases and validations', () => {
        validBins.forEach(validBin => {
          expect(validator.binRegex.test(validBin)).toBe(true);
        });
        invalidBins.forEach(invalidBin => {
          // if (validator.binRegex.test(invalidBin)) console.log(invalidBin);
          expect(validator.binRegex.test(invalidBin)).toBe(false);
        });
      });
      it('should pass all valid lengths', () => {
        const validCardLengths = ['0000000000000000'];
        validCardLengths.forEach(validLength => {
          expect(cardNumberLengthCheck(validLength, validator.lengths)).toBe(true);
        });
      });
      it('should pass all invalid lengths', () => {
        const invalidCardLengths = ['', '0', '00000000000000', '000000000000000000', '00000000000000000000'];
        invalidCardLengths.forEach(invalidLength => {
          expect(cardNumberLengthCheck(invalidLength, validator.lengths)).toBe(false);
        });
      });
    });
    describe('MAESTRO validator', () => {
      const validator = cardValidators.MAESTRO;
      const validBins = validMaestroBins;
      const invalidBins = ['', '499999', '5100000', '5300000', '5499999', '5900000', '5999999', '70000000'];

      it('should pass all binRegex edge cases and validations', () => {
        validBins.forEach(validBin => {
          expect(validator.binRegex.test(validBin)).toBe(true);
        });
        invalidBins.forEach(invalidBin => {
          // if (validator.binRegex.test(invalidBin)) console.log(invalidBin);
          expect(validator.binRegex.test(invalidBin)).toBe(false);
        });
      });
      it('should pass all valid lengths', () => {
        const validCardLengths = [
          '000000000000',
          '0000000000000',
          '00000000000000',
          '000000000000000',
          '0000000000000000',
          '00000000000000000',
          '000000000000000000',
          '0000000000000000000',
        ];
        validCardLengths.forEach(validLength => {
          expect(cardNumberLengthCheck(validLength, validator.lengths)).toBe(true);
        });
      });
      it('should pass all invalid lengths', () => {
        const invalidCardLengths = ['', '0', '00000000000', '00000000000000000000'];
        invalidCardLengths.forEach(invalidLength => {
          expect(cardNumberLengthCheck(invalidLength, validator.lengths)).toBe(false);
        });
      });
    });
    describe('MASTER_CARD validator', () => {
      const validator = cardValidators.MASTER_CARD;
      const validBins = validMasterCardBins;
      const invalidBins = ['', '49', '50', '56', '222099', '272100', '2210', '2219', '2220', '2721', '2730'];
      it('should pass all binRegex edge cases and validations', () => {
        validBins.forEach(validBin => {
          expect(validator.binRegex.test(validBin)).toBe(true);
        });
        invalidBins.forEach(invalidBin => {
          // if (validator.binRegex.test(invalidBin)) console.log(invalidBin);
          expect(validator.binRegex.test(invalidBin)).toBe(false);
        });
      });
      it('should pass all valid lengths', () => {
        const validCardLengths = ['0000000000000000'];
        validCardLengths.forEach(validLength => {
          expect(cardNumberLengthCheck(validLength, validator.lengths)).toBe(true);
        });
      });
      it('should pass all invalid lengths', () => {
        const invalidCardLengths = ['', '0', '00000000000000', '000000000000000000', '00000000000000000000'];
        invalidCardLengths.forEach(invalidLength => {
          expect(cardNumberLengthCheck(invalidLength, validator.lengths)).toBe(false);
        });
      });
    });
    describe('VISA validator', () => {
      const validator = cardValidators.VISA;
      const validBins = validVisaBins;
      const invalidBins = ['', '3', '5', '39', '50'];

      it('regex should pass all edge cases and validations', () => {});
      it('should pass all binRegex edge cases and validations', () => {
        validBins.forEach(validBin => {
          expect(validator.binRegex.test(validBin)).toBe(true);
        });
        invalidBins.forEach(invalidBin => {
          // if (validator.binRegex.test(invalidBin)) console.log(invalidBin);
          expect(validator.binRegex.test(invalidBin)).toBe(false);
        });
      });
      it('should pass all valid lengths', () => {
        const validCardLengths = ['0000000000000', '0000000000000000', '0000000000000000000'];
        validCardLengths.forEach(validLength => {
          expect(cardNumberLengthCheck(validLength, validator.lengths)).toBe(true);
        });
      });
      it('should pass all invalid lengths', () => {
        const invalidCardLengths = [
          '',
          '0',
          '000000000000',
          '000000000000000',
          '000000000000000000',
          '00000000000000000000',
        ];
        invalidCardLengths.forEach(invalidLength => {
          expect(cardNumberLengthCheck(invalidLength, validator.lengths)).toBe(false);
        });
      });
    });
  });

  describe('utilities', () => {
    describe('cardNumberLengthCheck', () => {
      const lengths = [0, 1, 2, 6];
      it('should return true for valid card number lengths', () => {
        const result = cardNumberLengthCheck('123456', lengths);
        expect(result).toBe(true);
      });

      it('should return true for valid 0 card number length', () => {
        const result = cardNumberLengthCheck('', lengths);
        expect(result).toBe(true);
      });
      it('should return false for invalid card number length', () => {
        const result = cardNumberLengthCheck('123', lengths);
        expect(result).toBe(false);
      });
      it('should return false for undefined card number length', () => {
        const result = cardNumberLengthCheck('123');
        expect(result).toBe(false);
      });
      it('should return false for empty card number length', () => {
        const result = cardNumberLengthCheck('123', []);
        expect(result).toBe(false);
      });
    });
    describe('removeNonDigits', () => {
      it('should remove all non-numeric characters', () => {
        const result = removeNonDigits('01234^()#!/56%789.');
        expect(result).toBe('0123456789');
      });
      it('should remove all spaces', () => {
        const result = removeNonDigits('0000 0000 0000 0000');
        expect(result).toBe('0000000000000000');
      });
    });

    describe('removeCharactersAfterMaxLength', () => {
      it('should remove all characters after 4', () => {
        const result = removeCharactersAfterMaxLength('1234567890', 4);
        expect(result).toBe('1234');
      });
      it('should remove no characters', () => {
        const result = removeCharactersAfterMaxLength('123', 4);
        expect(result).toBe('123');
      });
      it('should be fine with no input', () => {
        const result = removeCharactersAfterMaxLength('', 16);
        expect(result).toBe('');
      });
      it('should output no characters', () => {
        const result = removeCharactersAfterMaxLength('1234567890', 0);
        expect(result).toBe('');
      });
    });
    describe('findCardValidatorFromBinRegex', () => {
      it('should return undefined for invalid card numbers', () => {
        invalidCreditCardNumbers.forEach(cardNumber => {
          const result = findCardValidatorFromBinRegex(cardNumber);
          expect(result).toBeUndefined();
        });
      });
      it('should return the correct validator for valid amex card numbers', () => {
        validAmexBins.forEach(cardNumber => {
          const result = findCardValidatorFromBinRegex(cardNumber);
          expect(result).toBe(cardValidators.AMERICAN_EXPRESS);
        });
      });
      it('should return the correct validator for valid discover card numbers', () => {
        validDiscoverBins.forEach(cardNumber => {
          const result = findCardValidatorFromBinRegex(cardNumber);
          expect(result).toBe(cardValidators.DISCOVER);
        });
      });
      it('should return the correct validator for valid elo card numbers', () => {
        validEloBins.forEach(cardNumber => {
          const result = findCardValidatorFromBinRegex(cardNumber);
          expect(result).toBe(cardValidators.ELO);
        });
      });
      it('should return the correct validator for valid maestro card numbers', () => {
        validMaestroBins.forEach(cardNumber => {
          const result = findCardValidatorFromBinRegex(cardNumber);
          // if (result?.brand !== 'MAESTRO') console.log(cardNumber);
          expect(result).toBe(cardValidators.MAESTRO);
        });
      });
      it('should return the correct validator for valid master-card card numbers', () => {
        validMasterCardBins.forEach(cardNumber => {
          const result = findCardValidatorFromBinRegex(cardNumber);
          expect(result).toBe(cardValidators.MASTER_CARD);
        });
      });
      it('should return the correct validator for valid visa card numbers', () => {
        validVisaBins.forEach(cardNumber => {
          const result = findCardValidatorFromBinRegex(cardNumber);
          expect(result).toBe(cardValidators.VISA);
        });
      });
    });
    describe('formatCardNumber', () => {
      it('should format card numbers correctly without CardValidator parameter', () => {
        const testCases = [
          { cardNumber: '', expected: '' },
          { cardNumber: '0000000000000000', expected: '0000 0000 0000 0000' },
          { cardNumber: '00000000000000', expected: '0000 0000 0000 00' },
          { cardNumber: '0123456', expected: '0123 456' },
          { cardNumber: '00000000000000000000000', expected: '0000 0000 0000 0000 0000000' },
        ];
        testCases.forEach(testCase => {
          const result = formatCardNumber(testCase.cardNumber);
          expect(result).toBe(testCase.expected);
        });
      });
    });
    describe('formatCardNumberFromValidator', () => {
      it('should format the card numbers for amex spacingPattern', () => {
        const cardValidator = cardValidators.AMERICAN_EXPRESS;
        const testCases = [
          { cardNumber: '', expected: '' },
          { cardNumber: '0000000000000000000', expected: '0000 000000 00000 0000' },
          { cardNumber: '000000000', expected: '0000 00000' },
        ];
        testCases.forEach(testCase => {
          const result = formatCardNumberFromValidator(testCase.cardNumber, cardValidator);
          expect(result).toBe(testCase.expected);
        });
      });
      it('should format the card numbers for discover spacingPattern', () => {
        const cardValidator = cardValidators.DISCOVER;
        const testCases = [
          { cardNumber: '', expected: '' },
          { cardNumber: '000000000000000000000', expected: '0000 0000 0000 0000 00000' },
          { cardNumber: '0123456', expected: '0123 456' },
        ];
        testCases.forEach(testCase => {
          const result = formatCardNumberFromValidator(testCase.cardNumber, cardValidator);
          expect(result).toBe(testCase.expected);
        });
      });
      it('should format the card numbers for elo spacingPattern', () => {
        const cardValidator = cardValidators.ELO;
        const testCases = [
          { cardNumber: '', expected: '' },
          { cardNumber: '000000000000000000000', expected: '0000 0000 0000 0000 00000' },
          { cardNumber: '0123456', expected: '0123 456' },
        ];
        testCases.forEach(testCase => {
          const result = formatCardNumberFromValidator(testCase.cardNumber, cardValidator);
          expect(result).toBe(testCase.expected);
        });
      });
      it('should format the card numbers for maestro spacingPattern', () => {
        const cardValidator = cardValidators.MAESTRO;
        const testCases = [
          { cardNumber: '', expected: '' },
          { cardNumber: '0000000000000', expected: '0000 0000 00000' },
          { cardNumber: '00000000000000', expected: '0000 0000 0000 00' },
          { cardNumber: '000000000000000', expected: '0000 000000 00000' },
          { cardNumber: '0000000000000000', expected: '0000 0000 0000 0000' },
          { cardNumber: '00000000000000000', expected: '0000 0000 0000 0000 0' },
          { cardNumber: '000000000000000000', expected: '0000 0000 0000 0000 00' },
          { cardNumber: '0000000000000000000', expected: '0000 0000 0000 0000 000' },
          { cardNumber: '00000000000000000000', expected: '0000 0000 0000 0000 0000' },
          { cardNumber: '0123456', expected: '0123 456' },
          { cardNumber: '000000000000', expected: '0000 0000 0000' },
        ];
        testCases.forEach(testCase => {
          const result = formatCardNumberFromValidator(testCase.cardNumber, cardValidator);
          expect(result).toBe(testCase.expected);
        });
      });
      it('should format the card numbers for master card spacingPattern', () => {
        const cardValidator = cardValidators.MASTER_CARD;
        const testCases = [
          { cardNumber: '', expected: '' },
          { cardNumber: '000000000000000000000', expected: '0000 0000 0000 0000 00000' },
          { cardNumber: '0123456', expected: '0123 456' },
        ];
        testCases.forEach(testCase => {
          const result = formatCardNumberFromValidator(testCase.cardNumber, cardValidator);
          expect(result).toBe(testCase.expected);
        });
      });
      it('should format the card numbers for visa spacingPattern', () => {
        const cardValidator = cardValidators.VISA;
        const testCases = [
          { cardNumber: '', expected: '' },
          { cardNumber: '000000000000000000000', expected: '0000 0000 0000 0000 00000' },
        ];
        testCases.forEach(testCase => {
          const result = formatCardNumberFromValidator(testCase.cardNumber, cardValidator);
          expect(result).toBe(testCase.expected);
        });
      });
    });
  });
  describe('moduloCheck', () => {
    it('should mod 10 check valid numbers correctly', () => {
      validMod10Numbers.forEach(cardNumber => {
        const result = moduloCheck(cardNumber);
        expect(result).toBe(true);
      });
    });
    it('should mod 10 check invalid numbers correctly', () => {
      invalidMod10Numbers.forEach(cardNumber => {
        const result = moduloCheck(cardNumber);
        // if (result) console.log(cardNumber);
        expect(result).toBe(false);
      });
    });
  });
});
