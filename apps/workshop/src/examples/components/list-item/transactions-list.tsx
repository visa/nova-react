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
import { Typography, UtilityFragment, Utility, Link, Surface, ContentCard, Avatar } from '@visa/nova-react';
import { CSSProperties } from 'react';

const items = [
  { id: 'item-1', merchantName: 'Merchant name' },
  { id: 'item-2', merchantName: 'Merchant name' },
  { id: 'item-3', merchantName: 'Merchant name' },
  { id: 'item-4', merchantName: 'Merchant name' },
];

export const TransactionsList = () => {
  return (
    <section aria-label="Transactions" style={{ maxInlineSize: '343px' }}>
      <Utility vFlex vMarginBottom={6} vAlignItems="center" vJustifyContent="between">
        <Typography variant="label" tag="span">
          Transactions
        </Typography>
        <Link href="./list-item" noUnderline>
          <Typography variant="label" tag="span">
            See more
          </Typography>
          <VisaChevronRightTiny />
        </Link>
      </Utility>
      <UtilityFragment vPadding={4}>
        <ContentCard
          style={
            {
              '--v-content-card-border': '0px',
              '--v-content-card-border-radius': '8px',
            } as CSSProperties
          }
          tag="ul"
        >
          {items.map(item => (
            <UtilityFragment
              key={item.id}
              vPaddingHorizontal={8}
              vPaddingVertical={6}
              vFlex
              vAlignItems="center"
              vJustifyContent="between"
              style={{ minBlockSize: '64px' }}
            >
              <Surface tag="li">
                <Utility vFlex vGap={8} vAlignItems="center">
                  <Avatar role="img" aria-label="Merchant Name">
                    MN
                  </Avatar>
                  <Typography variant="body-3" tag="span">
                    {item.merchantName}
                  </Typography>
                </Utility>
                <Utility vFlex vFlexCol style={{ textAlign: 'end' }}>
                  <Typography variant="subtitle-2" tag="span">
                    - $14.57
                  </Typography>
                  <Typography variant="label" tag="span" colorScheme="subtle">
                    $1,234.56
                  </Typography>
                </Utility>
              </Surface>
            </UtilityFragment>
          ))}
        </ContentCard>
      </UtilityFragment>
    </section>
  );
};
