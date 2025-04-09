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
import { Surface, Utility } from '@visa/nova-react';
import { CSSProperties } from 'react';

export const GapNormalSpacing = () => {
  const itemCardStyles = { boxShadow: 'var(--elevation-medium)', inlineSize: 'auto' } as CSSProperties;
  return (
    <Utility vFlex>
      <Utility vFlex vGap="normal" style={{ background: 'var(--palette-default-surface-highlight)' } as CSSProperties}>
        <Utility vFlexGrow vPadding={16} style={itemCardStyles} element={<Surface />}>
          Item 1
        </Utility>
        <Utility vFlexGrow vPadding={16} style={itemCardStyles} element={<Surface />}>
          Item 2
        </Utility>
      </Utility>
    </Utility>
  );
};
