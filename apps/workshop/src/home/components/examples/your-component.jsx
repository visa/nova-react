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
import { VisaArtificialIntelligenceHigh, VisaChevronRightTiny } from '@visa/nova-icons-react';
import { Button, ContentCard, ContentCardBody, Divider, Typography, Utility, UtilityFragment } from '@visa/nova-react';

// Reusable component that has a name prop with a default name set to "Alex Miller",
// and developer can add more className to the top layer of the component.
const YourComponent = ({ className, name = 'Alex Miller' }) => {
  return (
    <ContentCard borderBlockEnd className={className}>
      {/* UtilityFragment component allows you to use all the props in Utility component without having to wrap the children in a div. */}
      <UtilityFragment vFlex vFlexCol vGap={16}>
        <ContentCardBody>
          <VisaArtificialIntelligenceHigh rtl />
          <div>
            <Typography variant="subtitle-1">{name}</Typography>
            <Utility vMarginVertical={4}>
              <Divider />
            </Utility>
            <Typography>Our favorite community member</Typography>
          </div>
          {/* Utility component allows you to use all the utility classes from nova-styles. */}
          <Utility vFlex vGap="inherit">
            <Button>
              Portfolio <VisaChevronRightTiny rtl />
            </Button>
            {/* Check all the available props on the component API page. */}
            <Button colorScheme="secondary">Contact Me</Button>
          </Utility>
        </ContentCardBody>
      </UtilityFragment>
    </ContentCard>
  );
};

export default YourComponent;
