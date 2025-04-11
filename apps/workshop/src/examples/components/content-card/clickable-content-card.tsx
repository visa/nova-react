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
import {
  ContentCard,
  ContentCardBody,
  ContentCardSubtitle,
  ContentCardTitle,
  Typography,
  Utility,
} from '@visa/nova-react';

export const ClickableContentCard = () => {
  return (
    <ContentCard clickable tag="button">
      <Utility element={<ContentCardBody tag="span" />} vAlignItems="start" vFlex vFlexCol vGap={4}>
        <ContentCardTitle variant="headline-4" tag="span">
          Headline
          <VisaChevronRightTiny rtl className="v-icon-move" />
        </ContentCardTitle>
        <ContentCardSubtitle variant="subtitle-3" tag="span">
          Subtitle
        </ContentCardSubtitle>
        <Utility element={<Typography tag="span" />} vPaddingTop={4}>
          This is optional text that describes the headline in more detail.
        </Utility>
      </Utility>
    </ContentCard>
  );
};
