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

export const ShrinkFlex = () => {
  return (
    <UtilityFragment vFlex vFlexRow vFlexWrap vGap={4}>
      <Surface style={{ '--v-surface-border-size': '2px' } as CSSProperties}>
        <Utility tag="span" vFlexShrink>
          first
        </Utility>
        <Utility tag="span" vFlexGrow>
          second
        </Utility>
        <Utility tag="span" vFlexGrow>
          third
        </Utility>
        <Utility tag="span" vFlexGrow>
          fourth
        </Utility>
      </Surface>
    </UtilityFragment>
  );
};
