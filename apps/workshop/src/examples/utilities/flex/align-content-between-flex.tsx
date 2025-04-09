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
import { CSSProperties } from 'react';

import { Surface, UtilityFragment } from '@visa/nova-react';

export const AlignContentBetweenFlex = () => {
  return (
    <UtilityFragment vAlignContent="between" vFlex vFlexRow vGap={4}>
      <Surface style={{ blockSize: '80px', '--v-surface-border-size': '2px' } as CSSProperties}>
        <span>first</span>
        <span>second</span>
        <span>third</span>
        <span>fourth</span>
      </Surface>
    </UtilityFragment>
  );
};
