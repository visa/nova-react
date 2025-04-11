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
import { VisaChevronDownTiny, VisaErrorTiny } from '@visa/nova-icons-react';
import {
  Button,
  InputContainer,
  InputControl,
  InputMessage,
  Label,
  Select,
  Typography,
  Utility,
} from '@visa/nova-react';
import { ChangeEvent, FormEvent, useState } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'card-expiration-select';

const today = new Date();
const currentMonth = today.getMonth() + 1;
const currentMonthString = currentMonth.toString();
const currentYear = today.getFullYear();
const currentYearString = currentYear.toString();

const months = Array.from({ length: 12 }, (_, i) => i + 1);
const years = Array.from({ length: 11 }, (_, i) => currentYear + i);

export const CardExpirationSelect = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [invalid, setInvalid] = useState(false);

  const onMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
    setInvalid(false);
  };
  const onYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
    setInvalid(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const isValid = event.currentTarget.checkValidity();

    // If valid, alert with selections
    if (isValid) alert(`Selected Month: ${selectedMonth}\nSelected Year: ${selectedYear}`);
    // If invalid, focus on invalid element
    else (event.currentTarget.querySelector(':not(fieldset):invalid') as HTMLInputElement)?.focus();

    setInvalid(!isValid);
    event.preventDefault();
  };

  return (
    <Utility noValidate onSubmit={onSubmit} tag="form" vFlex vFlexCol vGap={6}>
      <Utility aria-labelledby={`${id}-message`} tag="fieldset" vFlex vFlexCol vGap={4}>
        <Label tag="legend">Expires (MM/YY)</Label>
        <Utility vFlex vFlexRow vAlignItems="center" vGap={6}>
          {/* Month select */}
          <InputContainer>
            <Select
              aria-describedby={`${id}-message`}
              aria-invalid={invalid && selectedMonth === ''}
              aria-label="Expiration month"
              aria-required={true}
              autoComplete="cc-exp-month"
              id={`${id}-month`}
              name={`${id}-month`}
              onChange={onMonthChange}
              required
              value={selectedMonth}
            >
              <option hidden value="" />
              {months.map(month => (
                <option
                  disabled={selectedYear !== '' && selectedYear === currentYearString && month < currentMonth}
                  key={`card-exp-month-${month}`}
                  value={month}
                >
                  {(month < 10 ? '0' : '') + month}
                </option>
              ))}
            </Select>
            <InputControl>
              <VisaChevronDownTiny />
            </InputControl>
          </InputContainer>

          <Typography aria-hidden={true} tag="span" variant="body-1">
            /
          </Typography>

          {/* Year select */}
          <InputContainer>
            <Select
              aria-describedby={`${id}-message`}
              aria-invalid={invalid && selectedYear === ''}
              aria-label="Expiration year"
              aria-required={true}
              autoComplete="cc-exp-year"
              id={`${id}-year`}
              name={`${id}-year`}
              onChange={onYearChange}
              required
              value={selectedYear}
            >
              <option hidden value="" />
              {years.map(year => (
                <option
                  disabled={selectedMonth !== '' && year === currentYear && selectedMonth < currentMonthString}
                  key={`card-exp-year-${year}`}
                  value={year}
                >
                  {year.toString().substring(2)}
                </option>
              ))}
            </Select>
            <InputControl>
              <VisaChevronDownTiny />
            </InputControl>
          </InputContainer>
        </Utility>
        {invalid && (
          <InputMessage aria-atomic="true" aria-live="assertive" id={`${id}-message`}>
            <VisaErrorTiny />
            This is required text that describes the error in more detail
          </InputMessage>
        )}
      </Utility>
      <div>
        <Button type="submit">Submit</Button>
      </div>
    </Utility>
  );
};
