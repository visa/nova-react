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
import { VisaChevronDownTiny } from '@visa/nova-icons-react';
import {
  Divider,
  Input,
  InputContainer,
  InputControl,
  Label,
  Select,
  Switch,
  SwitchLabel,
  useCardNumberValidation,
  Typography,
  Utility,
} from '@visa/nova-react';
import { useState } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'use-card-validation-example';

export const UseCardValidationUsage = () => {
  /// These states are for demo purposes:
  const [cardNumberInputValueKey, setCardNumberInputValueKey] = useState('cardNumberInputValue');
  const [trimToMaxLength, setTrimToMaxLength] = useState(true);

  const {
    binValid,
    brand,
    brandValid,
    cardNumberInputValue,
    cardNumberValidator,
    cleanCardNumber,
    formattedCardNumber,
    lastDigitValid,
    lengthValid,
    onCardNumberChange,
    valid,
  } = useCardNumberValidation({
    allowedBrands: ['VISA'],
    defaultCardNumberInputValue: '40000000 hello world 00000000 000000',
    trimToMaxLength,
  });

  const valueMap: Record<string, string> = { cardNumberInputValue, cleanCardNumber, formattedCardNumber };
  const valueMapKeys = Object.keys(valueMap);

  return (
    <Utility vFlexCol vGap={16}>
      <Utility vFlex vFlexCol vGap={4}>
        <Label htmlFor={`${id}-card-number-input`}>Visa card number</Label>
        <InputContainer>
          <Input
            aria-required="true"
            autoComplete="cc-number"
            id={`${id}-card-number-input`}
            onChange={event => onCardNumberChange(event.currentTarget.value)}
            required
            type="text"
            value={valueMap[cardNumberInputValueKey]}
          />
        </InputContainer>
      </Utility>
      <code>binValid: {binValid.toString()}</code>
      <code>brand: {brand ?? 'undefined'}</code>
      <code>brandValid: {brandValid.toString()}</code>
      <code>cardNumberInputValue: {cardNumberInputValue}</code>
      <code>cardNumberValidator.brand: {cardNumberValidator?.brand ?? 'undefined'}</code>
      <code>cardNumberValidator.maxLength: {cardNumberValidator?.maxLength ?? 'undefined'}</code>
      <code>cleanCardNumber: {cleanCardNumber}</code>
      <code>formattedCardNumber: {formattedCardNumber}</code>
      <code>lastDigitValid: {lastDigitValid.toString()}</code>
      <code>lengthValid: {lengthValid.toString()}</code>
      <code>valid: {valid.toString()}</code>

      <Divider />

      <Typography tag="span" variant="body-2-bold">
        Demo options:
      </Typography>
      <Utility tag="fieldset" vFlex vFlexCol vGap={6}>
        <Label htmlFor={`${id}-input-value-key-select`}>Visa card number input value</Label>
        <InputContainer>
          <Select
            id={`${id}-input-value-key-select`}
            name="select-default-example"
            onChange={event => setCardNumberInputValueKey(event.currentTarget.value)}
            value={cardNumberInputValueKey}
          >
            {valueMapKeys.map(key => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </Select>
          <InputControl>
            <VisaChevronDownTiny />
          </InputControl>
        </InputContainer>
      </Utility>
      <Utility vFlex vFlexWrap vGap={10} vJustifyContent="between" vMargin={8}>
        <SwitchLabel htmlFor={`${id}-trim-value-switch`}>
          <code>trimToMaxLength</code>
        </SwitchLabel>
        <Switch
          checked={trimToMaxLength}
          id={`${id}-trim-value-switch`}
          name={`${id}-trim-value-switch`}
          onChange={event => setTrimToMaxLength(event.currentTarget.checked)}
        />
      </Utility>
    </Utility>
  );
};
