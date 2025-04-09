/**
 *              Copyright (c) 2025 Visa, Inc.
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
import { Button, Typography, Utility, useDebounce } from '@visa/nova-react';
import { VisaInformationTiny, VisaSuccessTiny } from "@visa/nova-icons-react";
import { useState, CSSProperties } from 'react';

export const UseButtonDebounceExample = () => {
  const [success, setSuccess] = useState(false);

  const onDebouncedClick = useDebounce(() => {
    setSuccess(true);
  }, 1000);

  return (
    <Utility vFlex vFlexCol vGap={12}>
      <Typography tag="span" variant="body-2-bold">
        Rapidly click the button in sequence, then wait for one second:
      </Typography>

      <Utility vFlex vFlexRow vGap={12}>
        <Button onClick={onDebouncedClick}>Submit debounced</Button>
        <Button colorScheme="secondary" onClick={() => setSuccess(false)}>
          Reset
        </Button>
      </Utility>

      <Typography aria-atomic="true" aria-live="assertive" style={{lineHeight: '16px'}}>
        {success ? <VisaSuccessTiny style={{ '--v-icon-primary': 'green', '--v-icon-secondary': 'var(--v-message-text-success)', marginInlineEnd: '3px', verticalAlign: 'bottom' } as CSSProperties} /> : 
        <VisaInformationTiny style={{ '--v-icon-primary': 'var(--palette-default-text-subtle)', '--v-icon-secondary': 'var(--palette-default-text-subtle)', marginInlineEnd: '3px', verticalAlign: 'bottom' } as CSSProperties} />}
        {success ? 'Button click successful, many thanks' : 'Waiting for button click'}
      </Typography>
    </Utility>
  );
};
