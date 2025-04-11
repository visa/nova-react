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
import { Surface, Utility } from '@visa/nova-react';
import { CSSProperties } from 'react';

export const PaddingHorizontalSpacing = () => {
  return (
    <Utility vFlex>
      <Utility
        vPaddingHorizontal={20}
        style={
          {
            background: 'var(--palette-default-surface-highlight)',
            border: '1px dashed var(--palette-default-active-subtle)',
          } as CSSProperties
        }
      >
        <Utility vPadding={16} element={<Surface />} vPaddingBottom={20}>
          Content Area
        </Utility>
      </Utility>
    </Utility>
  );
};
