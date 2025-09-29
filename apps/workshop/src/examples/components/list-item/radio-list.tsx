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
import { Typography, Utility, UtilityFragment, Surface, Label, ContentCard, Radio } from '@visa/nova-react';
import { CSSProperties } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'radio-list';

const options = [
  { id: `${id}-1`, label1: 'Item A label 1', label2: 'Item A label 2' },
  { id: `${id}-2`, label1: 'Item B label 1', label2: 'Item B label 2' },
  { id: `${id}-3`, label1: 'Item C label 1', label2: 'Item C label 2' },
  { id: `${id}-4`, label1: 'Item D label 1', label2: 'Item D label 2' },
];

export const RadioList = () => {
  return (
    <fieldset aria-label="Section title" style={{ maxInlineSize: '343px' }}>
      <UtilityFragment vMarginBottom={6}>
        <Label id={`${id}-legend`} tag="legend">
          Section title
        </Label>
      </UtilityFragment>
      <UtilityFragment vPadding={4} vFlex vFlexCol vGap={4} vMargin={0}>
        <ContentCard
          style={
            {
              '--v-content-card-border': '0px',
              '--v-content-card-border-radius': '8px',
            } as CSSProperties
          }
          tag="ul"
        >
          {options.map(option => (
            <UtilityFragment key={option.id} vPadding={0}>
              <Surface tag="li">
                <UtilityFragment
                  vPaddingHorizontal={8}
                  vPaddingVertical={6}
                  vFlex
                  vAlignItems={'center'}
                  vJustifyContent="between"
                  vGap={8}
                  className="v-action v-action-secondary"
                >
                  <Label style={{ border: 'unset', minBlockSize: '64px', inlineSize: '100%' }} htmlFor={option.id}>
                    <Utility vFlex vAlignItems="center" vGap={8}>
                      <Radio id={option.id} name={id} style={{ '--v-radio-glow-offset': '0' } as CSSProperties} />
                      <Typography variant="label-large" tag="span">
                        {option.label1}
                      </Typography>
                    </Utility>
                    <Typography variant="label-large">{option.label2}</Typography>
                  </Label>
                </UtilityFragment>
              </Surface>
            </UtilityFragment>
          ))}
        </ContentCard>
      </UtilityFragment>
    </fieldset>
  );
};
