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
import { VisaAccountLow } from '@visa/nova-icons-react';
import { CSSProperties } from 'react';
import { Typography, UtilityFragment, Surface, Utility } from '@visa/nova-react';

export const TrailingIconWithBackgroundListItem = () => {
  return (
    <ul style={{ maxInlineSize: '343px' }}>
      <UtilityFragment
        vPaddingHorizontal={8}
        vPaddingVertical={6}
        vFlex
        vAlignItems="center"
        vJustifyContent="between"
        style={{ minBlockSize: '64px' }}
      >
        <Surface tag="li">
          <Typography variant="label-large" tag="span">
            Item label
          </Typography>
          <Utility
            vFlex
            vPadding={8}
            style={{ backgroundColor: 'var(--palette-default-surface-3)', borderRadius: '4px' }}
          >
            <VisaAccountLow
              style={
                {
                  color: 'var(--palette-default-text-subtle)',
                  '--v-icon-primary': 'currentColor',
                  '--v-icon-secondary': 'currentColor',
                } as CSSProperties
              }
            />
          </Utility>
        </Surface>
      </UtilityFragment>
    </ul>
  );
};
