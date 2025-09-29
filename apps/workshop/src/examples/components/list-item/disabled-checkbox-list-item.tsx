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
import { Typography, UtilityFragment, Surface, Label, Checkbox } from '@visa/nova-react';
import { CSSProperties } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'disabled-checkbox-list-item';

export const DisabledCheckboxListItem = () => {
  return (
    <ul style={{ maxInlineSize: '343px' }}>
      <UtilityFragment vPadding={0}>
        <Surface tag="li">
          <UtilityFragment
            vPaddingHorizontal={8}
            vPaddingVertical={6}
            vFlex
            vAlignItems={'center'}
            vGap={8}
            className="v-action v-action-secondary"
          >
            <Label style={{ border: 'unset', minBlockSize: '64px', inlineSize: '100%' }} htmlFor={id}>
              <Checkbox disabled id={id} name={id} style={{ '--v-checkbox-glow-offset': '0' } as CSSProperties} />
              <Typography variant="label-large" tag="span">
                Item label
              </Typography>
            </Label>
          </UtilityFragment>
        </Surface>
      </UtilityFragment>
    </ul>
  );
};
