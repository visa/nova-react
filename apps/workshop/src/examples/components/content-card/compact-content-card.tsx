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
import { ContentCard, ContentCardBody, ContentCardSubtitle, ContentCardTitle, Link, Utility } from '@visa/nova-react';

export const CompactContentCard = () => {
  return (
    <ContentCard borderBlockEnd>
      <Utility element={<ContentCardBody />} vFlex vFlexCol vGap={10}>
        <ContentCardTitle variant="headline-4">Headline</ContentCardTitle>
        <ContentCardSubtitle className="v-pt-4" variant="body-2">
          This is optional text that describes the headline and subtitle in more detail.
        </ContentCardSubtitle>
        <Utility vPaddingTop={12}>
          <Link href="./content-card" noUnderline>
            Destination label <VisaChevronRightTiny rtl />
          </Link>
        </Utility>
      </Utility>
    </ContentCard>
  );
};
