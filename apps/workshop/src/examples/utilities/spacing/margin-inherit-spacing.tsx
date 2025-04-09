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

export const MarginInheritSpacing = () => {
  return (
    <Utility vFlex>
      <Utility style={{ background: 'var(--palette-default-surface-highlight)' } as CSSProperties}>
        <Utility
          vMarginTop={20}
          style={
            {
              textAlign: 'center',
              border: '1px dashed var(--palette-default-active-subtle)',
              background: 'var(--palette-messaging-highlight-positive)',
            } as CSSProperties
          }
        >
          <p>Parent with top margin</p>
          <Utility
            element={<Surface />}
            vMarginTop="inherit"
            vPadding={16}
            style={
              {
                border: '1px dashed var(--palette-default-active-subtle)',
                borderInline: 0,
                borderBlockEnd: 0,
              } as CSSProperties
            }
          >
            Child inherits top margin from parent
          </Utility>
        </Utility>
      </Utility>
    </Utility>
  );
};
