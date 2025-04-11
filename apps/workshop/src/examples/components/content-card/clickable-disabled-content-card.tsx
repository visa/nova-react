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
import { VisaSecurityLockTiny } from '@visa/nova-icons-react';
import {
  ContentCard,
  ContentCardBody,
  ContentCardSubtitle,
  ContentCardTitle,
  Typography,
  Utility,
} from '@visa/nova-react';

export const ClickableDisabledContentCard = () => {
  return (
    <ContentCard aria-disabled="true" clickable tag="button" disabled>
      <Utility element={<ContentCardBody />} vFlex vFlexCol vGap={4}>
        <Utility vAlignItems="center" vFlex vGap={12}>
          <ContentCardTitle variant="headline-4" tag="span">
            Headline
          </ContentCardTitle>
          <VisaSecurityLockTiny />
        </Utility>
        <ContentCardSubtitle variant="subtitle-3" tag="span">
          Subtitle
        </ContentCardSubtitle>
        <Typography className="v-pt-4" tag="span">
          This is optional text that describes the headline in more detail.
        </Typography>
      </Utility>
    </ContentCard>
  );
};
