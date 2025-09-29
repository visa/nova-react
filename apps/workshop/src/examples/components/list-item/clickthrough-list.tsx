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
import { VisaChevronRightTiny } from '@visa/nova-icons-react';
import { Typography, UtilityFragment, Surface, ContentCard, Button } from '@visa/nova-react';
import { CSSProperties } from 'react';

const items = [
  { id: 'item-1', text: 'Item A label', href: './list-item' },
  { id: 'item-2', text: 'Item B label', href: './list-item' },
  { id: 'item-3', text: 'Item C label', href: './list-item' },
  { id: 'item-4', text: 'Item D label', href: './list-item' },
];

export const ClickthroughList = () => {
  return (
    <UtilityFragment vPadding={4}>
      <ContentCard
        style={
          {
            maxInlineSize: '343px',
            '--v-content-card-border': '0px',
            '--v-content-card-border-radius': '8px',
          } as CSSProperties
        }
        tag="ul"
      >
        {items.map(item => (
          <UtilityFragment key={item.id} vPadding={0}>
            <Surface tag="li">
              <UtilityFragment
                vFlex
                vAlignItems="center"
                vJustifyContent="between"
                vPaddingLeft={8}
                vPaddingRight={4}
                vPaddingVertical={6}
                style={
                  {
                    color: 'var(--palette-default-text)',
                    '--v-button-default-border-radius': '0px',
                    minBlockSize: '64px',
                  } as CSSProperties
                }
              >
                <Button
                  colorScheme="tertiary"
                  element={
                    <a href={item.href}>
                      <Typography variant="label-large" tag="span">
                        {item.text}
                      </Typography>
                      <VisaChevronRightTiny style={{ color: 'var(--palette-default-active)' }} />
                    </a>
                  }
                />
              </UtilityFragment>
            </Surface>
          </UtilityFragment>
        ))}
      </ContentCard>
    </UtilityFragment>
  );
};
