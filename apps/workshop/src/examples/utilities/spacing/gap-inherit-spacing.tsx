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
import { Avatar, Utility } from '@visa/nova-react';
import { CSSProperties } from 'react';

const userCardStyles = {
  background: 'var(--palette-default-surface-1)',
  padding: 'var(--size-scalable-6) var(--size-scalable-80) var(--size-scalable-6) var(--size-scalable-20)',
} as CSSProperties;

const users = [
  {
    name: 'Alex Miller',
    initials: 'AM',
  },
  {
    name: 'Rosetta Jones',
    initials: 'RJ',
  },
  {
    name: 'Stacey Taylor',
    initials: 'ST',
  },
];

export const GapInheritSpacing = () => {
  return (
    <Utility vFlex>
      <Utility
        element={<ul />}
        vFlex
        vFlexCol
        vGap={8}
        style={
          {
            background: 'var(--palette-default-surface-highlight)',
          } as CSSProperties
        }
      >
        {users.map(u => (
          <Utility key={u.name} element={<li />} vFlex vAlignItems="center" vGap="inherit" style={userCardStyles}>
            <Avatar small aria-label={u.name}>
              {u.initials}
            </Avatar>
            {u.name}
          </Utility>
        ))}
      </Utility>
    </Utility>
  );
};
