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
import { Input, InputContainer, Label, Utility } from '@visa/nova-react';
import { FormEvent, useState } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'default-date-range-selector';

export const DefaultDateRangeSelector = () => {
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');

  const onDateChange = (event: FormEvent<HTMLInputElement>, isStartDate: boolean) => {
    const { value } = event.currentTarget;
    isStartDate ? setStartDate(value) : setEndDate(value);
  };

  return (
    <Utility vFlex vFlexWrap vGap="12">
      <Utility vFlex vGap="4" vFlexCol vFlexGrow>
        <Label htmlFor={`${id}-start-date`}>Start Date Label (required)</Label>
        <InputContainer>
          <Input
            id={`${id}-start-date`}
            max={endDate ? endDate : undefined}
            onChange={event => onDateChange(event, true)}
            required
            type="date"
          />
        </InputContainer>
      </Utility>
      <Utility vFlex vGap="4" vFlexCol vFlexGrow>
        <Label htmlFor={`${id}-end-date`}>End Date Label (required)</Label>
        <InputContainer>
          <Input
            id={`${id}-end-date`}
            min={startDate ? startDate : undefined}
            onChange={event => onDateChange(event, false)}
            required
            type="date"
          />
        </InputContainer>
      </Utility>
    </Utility>
  );
};
