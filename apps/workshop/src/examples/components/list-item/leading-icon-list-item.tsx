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
import { GenericInformationLow } from '@visa/nova-icons-react';
import { CSSProperties } from 'react';
import { Typography, UtilityFragment, Surface } from '@visa/nova-react';

export const LeadingIconListItem = () => {
  return (
    <ul style={{ maxInlineSize: '343px' }}>
      <UtilityFragment
        vPaddingHorizontal={8}
        vPaddingVertical={6}
        vFlex
        vGap={8}
        vAlignItems="center"
        style={{ minBlockSize: '64px' }}
      >
        <Surface tag="li">
          <GenericInformationLow style={{ color: 'var(--palette-default-active-subtle)' } as CSSProperties} />
          <Typography variant="label-large" tag="span">
            Item label
          </Typography>
        </Surface>
      </UtilityFragment>
    </ul>
  );
};
