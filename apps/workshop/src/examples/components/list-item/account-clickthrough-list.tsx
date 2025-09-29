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
import { Typography, UtilityFragment, Surface, ContentCard, Button, Utility, VisaLogo } from '@visa/nova-react';
import { CSSProperties } from 'react';

const items = [
  { id: 'item-1', overline: '•••• 1111', href: './list-item', color: '#18385C' },
  { id: 'item-2', overline: '•••• 2222', href: './list-item', color: '#308342' },
  { id: 'item-3', overline: '•••• 3333', href: './list-item', color: '#A6304B' },
  { id: 'item-4', overline: '•••• 4444', href: './list-item', color: '#1569CF' },
];

export const AccountClickthroughList = () => {
  return (
    <section aria-label="List title" style={{ maxInlineSize: '343px' }}>
      <UtilityFragment vMarginBottom={6}>
        <Typography variant="label" tag="span">
          Accounts
        </Typography>
      </UtilityFragment>
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
                  vPaddingLeft={0}
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
                        <Utility vFlex vGap={3}>
                          <Utility
                            style={{
                              backgroundColor: `${item.color}`,
                              inlineSize: '5px',
                              blockSize: '56px',
                              borderRadius: '10px',
                            }}
                          />
                          <Utility vFlex vAlignItems="center" vGap={8}>
                            <Utility
                              vFlex
                              vAlignItems="center"
                              vJustifyContent="center"
                              style={{
                                backgroundColor: `${item.color}`,
                                borderRadius: '4px',
                                inlineSize: '40px',
                                blockSize: '25px',
                              }}
                            >
                              <VisaLogo aria-label="Visa" style={{ fill: 'white', height: '10px', width: '30px' }} />
                            </Utility>
                            <Utility vFlex vFlexCol style={{ color: 'var(--palette-default-text)' }}>
                              <Typography variant="overline">{item.overline}</Typography>
                              <Typography variant="label">Digital Bank card</Typography>
                            </Utility>
                          </Utility>
                        </Utility>
                        <Utility vFlex vAlignItems="center" vGap={8}>
                          <Typography variant="subtitle-3" tag="span">
                            $1,234.56
                          </Typography>
                          <VisaChevronRightTiny style={{ color: 'var(--palette-default-active)' }} />
                        </Utility>
                      </a>
                    }
                  />
                </UtilityFragment>
              </Surface>
            </UtilityFragment>
          ))}
        </ContentCard>
      </UtilityFragment>
    </section>
  );
};
