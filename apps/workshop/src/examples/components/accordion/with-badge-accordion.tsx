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
import { VisaSuccessTiny } from '@visa/nova-icons-react';
import {
  Accordion,
  AccordionHeading,
  AccordionPanel,
  AccordionToggleIcon,
  Badge,
  Typography,
  UtilityFragment,
} from '@visa/nova-react';

export const WithBadgeAccordion = () => {
  return (
    <Accordion>
      <UtilityFragment vAlignItems="center">
        <AccordionHeading buttonSize="large" colorScheme="secondary">
          {/* TODO: Remove this style tag after nova-styles fix */}
          <AccordionToggleIcon style={{ alignSelf: 'center' }} />
          Accordion title
          <UtilityFragment vMarginLeft="auto">
            <Badge badgeType="stable">
              <VisaSuccessTiny />
              Label
            </Badge>
          </UtilityFragment>
        </AccordionHeading>
      </UtilityFragment>
      <AccordionPanel>
        <Typography>This is required text that describes the accordion section in more detail.</Typography>
      </AccordionPanel>
    </Accordion>
  );
};
