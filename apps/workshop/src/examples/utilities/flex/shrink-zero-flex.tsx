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
import { CSSProperties } from 'react';

import { Surface, Utility, UtilityFragment } from '@visa/nova-react';

export const ShrinkZeroFlex = () => {
  return (
    <UtilityFragment vFlex vFlexRow vGap={4} vFlexWrap>
      <Surface style={{ '--v-surface-border-size': '2px' } as CSSProperties}>
        <Utility tag="span" vFlexShrink0>
          first
        </Utility>
        <Utility tag="span" vFlexShrink>
          second
        </Utility>
        <Utility tag="span" vFlexShrink>
          third
        </Utility>
        <Utility tag="span" vFlexShrink>
          fourth
        </Utility>
      </Surface>
    </UtilityFragment>
  );
};
