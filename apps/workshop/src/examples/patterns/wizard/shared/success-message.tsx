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
import { Link, Surface, Typography, Utility, UtilityFragment } from '@visa/nova-react';
import { VisaSuccessHigh } from '@visa/nova-icons-react';
import { CSSProperties } from 'react';

interface SuccessMessageProps {
  onReset: () => void;
}

export const SuccessMessage = ({ onReset }: SuccessMessageProps) => {
  return (
    <Utility vFlex vJustifyContent="center" vGap={12}>
      <UtilityFragment
        vFlex
        vJustifyContent="center"
        vPaddingVertical={44}
        vPaddingHorizontal={32}
        vGap={32}
        style={{ maxWidth: '676px' }}
      >
        <Surface>
          <Utility
            vFlex
            vFlexCol
            vGap={24}
            vAlignItems="center"
            style={{ maxWidth: '394px', width: '394px' }}
            role="alert"
            aria-live="polite"
          >
            <Typography tag="h2" variant="headline-2">
              Success
            </Typography>
            <VisaSuccessHigh
              style={
                {
                  '--v-icon-primary': 'var(--palette-messaging-graphics-positive)',
                  '--v-icon-secondary': 'var(--palette-messaging-graphics-positive)',
                } as CSSProperties
              }
            />
            <Typography tag="p" variant="body-2">
              This is required text that describes the success message in more detail.
            </Typography>
            <Utility vAlignSelf="stretch" vFlex vJustifyContent="center" vGap={24}>
              <Link element={<button />} onClick={onReset}>
                Reset Wizard example
              </Link>
              <Link href="./wizard">Destination label</Link>
            </Utility>
          </Utility>
        </Surface>
      </UtilityFragment>
    </Utility>
  );
};
