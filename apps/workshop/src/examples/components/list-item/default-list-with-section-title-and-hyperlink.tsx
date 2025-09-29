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
import { Typography, UtilityFragment, Utility, Link, Surface, ContentCard } from '@visa/nova-react';
import { CSSProperties } from 'react';

const items = [
  { id: 'item-1', label1: 'Item A label 1', label2: 'Item A label 2' },
  { id: 'item-2', label1: 'Item B label 1', label2: 'Item B label 2' },
  { id: 'item-3', label1: 'Item C label 1', label2: 'Item C label 2' },
  { id: 'item-4', label1: 'Item D label 1', label2: 'Item D label 2' },
];

export const DefaultListWithSectionTitleAndHyperlink = () => {
  return (
    <section aria-label="Section title" style={{ maxInlineSize: '343px' }}>
      <Utility vFlex vMarginBottom={6} vAlignItems="center" vJustifyContent="between">
        <Typography variant="label" tag="span">
          Section title
        </Typography>
        <Link href="./list-item" noUnderline>
          <Typography variant="label" tag="span">
            Hyperlink
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
                <Typography variant="label-large" tag="span">
                  {item.label1}
                </Typography>
                <Typography variant="label-large" tag="span">
                  {item.label2}
                </Typography>
              </Surface>
            </UtilityFragment>
          ))}
        </ContentCard>
      </UtilityFragment>
    </section>
  );
};
