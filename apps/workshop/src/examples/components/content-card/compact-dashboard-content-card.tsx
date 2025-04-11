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
import { VisaArrowUpTiny } from '@visa/nova-icons-react';
import { ContentCard, ContentCardBody, ContentCardTitle, Typography, Utility } from '@visa/nova-react';
import { CSSProperties } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'compact-dashboard-content-card';

export const CompactDashboardContentCard = () => {
  return (
    <ContentCard>
      <Utility element={<ContentCardBody />} vFlex vFlexCol vGap={4}>
        <Utility vAlignItems="center" vFlex vFlexRow vJustifyContent="between">
          <ContentCardTitle variant="headline-4">Headline</ContentCardTitle>
        </Utility>
        <Typography className="v-pt-4">
          This is optional text that describes the headline and subtitle in more detail.
        </Typography>
        <Utility vAlignItems="center" vFlex vFlexWrap vGap={16} vPaddingTop={12}>
          <Typography style={{ color: 'var(--palette-messaging-text-positive)' } as CSSProperties} variant="display-2">
            0,000
          </Typography>
          <Utility vAlignContent="end" vAlignItems="center" vFlex vFlexCol vGap={4} vMarginTop={8}>
            <VisaArrowUpTiny
              aria-hidden="false"
              title="Increasing value"
              titleId={`${id}-trend-title`}
              aria-labelledby={`${id}-trend-title ${id}-trend-label`}
            />
            <Typography id={`${id}-trend-label`} aria-hidden="true">
              Label
            </Typography>
          </Utility>
        </Utility>
      </Utility>
    </ContentCard>
  );
};
