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
import { VisaAddTiny } from '@visa/nova-icons-react';
import { Button, Typography, Utility } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'disabled-icon-button';

export const DisabledIconButton = () => {
  return (
    <Utility vFlex vFlexRow>
      <Utility vAlignItems="center" vFlex vFlexCol vGap={2}>
        <Button aria-labelledby={`${id}-label`} disabled iconButton>
          <VisaAddTiny />
        </Button>
        <Typography
          id={`${id}-label`}
          style={{ color: 'var(--palette-default-disabled)' }}
          tag="span"
          variant="label-small"
        >
          Action
        </Typography>
      </Utility>
    </Utility>
  );
};
