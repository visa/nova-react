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
import { GenericSecurityProtectionLow, VisaChevronRightTiny } from '@visa/nova-icons-react';
import { Typography, Utility, UtilityFragment, Surface, Button } from '@visa/nova-react';
import { CSSProperties } from 'react';

export const DisabledLeadingIconClickthroughListItem = () => {
  return (
    <ul style={{ maxInlineSize: '343px' }}>
      <UtilityFragment vPadding={0}>
        <Surface tag="li">
          <UtilityFragment
            vFlex
            vAlignItems="center"
            vJustifyContent="between"
            vPaddingLeft={8}
            vPaddingRight={4}
            vPaddingVertical={6}
            style={{ '--v-button-default-border-radius': '0px', minBlockSize: '64px' } as CSSProperties}
          >
            <Button
              colorScheme="tertiary"
              element={
                <a href="./list-item" tabIndex={-1} aria-disabled="true" role="link">
                  <Utility vFlex vAlignItems="center" vGap={8}>
                    <GenericSecurityProtectionLow
                      style={{ '--v-icon-height': '24px', '--v-icon-width': '24px' } as CSSProperties}
                    />
                    <Typography variant="label-large" tag="span">
                      Item label
                    </Typography>
                  </Utility>
                  <VisaChevronRightTiny />
                </a>
              }
            />
          </UtilityFragment>
        </Surface>
      </UtilityFragment>
    </ul>
  );
};
