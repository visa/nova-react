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
import { VisaErrorTiny } from '@visa/nova-icons-react';
import { Utility, RadioPanel, Radio, Label, InputMessage, Button, Typography } from '@visa/nova-react';
import { ChangeEvent, useRef, useState } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'error-group-panel-radio';

const radios = ['Label 1', 'Label 2', 'Label 3'];

export const ErrorPanelGroupRadio = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [errorState, setErrorState] = useState(false);
  const [option, setOption] = useState('');

  const handleChangeState = (e: ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
  };
  const handleOnSubmit = () => {
    if (option !== '') {
      setErrorState(false);
    } else {
      setOption('');
      setErrorState(true);
    }
    ref?.current?.focus();
  };
  return (
    <>
      <fieldset aria-labelledby={`${id}-legend ${id}-message`}>
        <Typography id={`${id}-legend`} tag="legend" variant="label">
          Group label (required)
        </Typography>
        <Utility vFlex vFlexCol vGap={8}>
          {radios.map((radio, index) => (
            <RadioPanel className="v-align-items-start" htmlFor={`${id}-option-${index}`} key={`${id}-option-${index}`}>
              <Utility vFlex vGap={2} style={{ inlineSize: '100%' }}>
                <Radio
                  aria-describedby={`${id}-option-${index}-message`}
                  aria-invalid={errorState}
                  checked={option === `${index}`}
                  className="v-flex-shrink-0"
                  id={`${id}-option-${index}`}
                  name={`${id}-options`}
                  onChange={handleChangeState}
                  ref={index === 0 ? ref : undefined}
                  value={index}
                />
                <Utility vFlex vFlexCol vGap={2} vMarginVertical={8}>
                  <Label htmlFor={`${id}-option-${index}`}>{radio}</Label>
                  <InputMessage id={`${id}-option-${index}-message`}>
                    This is optional text that describes the label in more detail.
                  </InputMessage>
                </Utility>
              </Utility>
            </RadioPanel>
          ))}
        </Utility>
        {errorState && (
          <InputMessage
            aria-atomic="true"
            aria-live="assertive"
            className="v-typography-label v-flex v-align-items-center"
            id={`${id}-message`}
            role="alert"
          >
            <VisaErrorTiny />
            This is required text that describes the error in more detail.
          </InputMessage>
        )}
      </fieldset>
      <Utility vFlex vFlexRow vPaddingTop={12} vGap={12}>
        <Button onClick={handleOnSubmit}>Submit</Button>
        <Button colorScheme="secondary" onClick={() => setOption('')}>
          Reset
        </Button>
      </Utility>
    </>
  );
};
