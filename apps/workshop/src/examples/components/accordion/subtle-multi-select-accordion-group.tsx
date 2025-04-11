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
import {
  Accordion,
  AccordionHeading,
  AccordionPanel,
  AccordionToggleIcon,
  Typography,
  Utility,
  UtilityFragment,
} from '@visa/nova-react';
import { CSSProperties } from 'react';

const accordions = [
  {
    content: 'This is required text that describes the accordion section in more detail.',
    header: 'Accordion title 1',
  },
  {
    content: 'This is required text that describes the accordion section in more detail.',
    header: 'Accordion title 2',
  },
  {
    content: 'This is required text that describes the accordion section in more detail.',
    header: 'Accordion title 3',
  },
];

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'subtle-multi-select-accordion-group';

export const SubtleMultiSelectAccordionGroup = () => {
  return (
    <Utility vFlex vFlexCol vGap={6}>
      {accordions.map((accordion, index) => (
        <Accordion key={`${id}-${index}`}>
          <UtilityFragment vGap={2}>
            <AccordionHeading
              className="v-typography-body-2-medium"
              colorScheme="tertiary"
              style={
                {
                  '--v-accordion-foreground-initial': 'var(--palette-default-active)',
                  '--v-button-default-background': 'transparent',
                } as CSSProperties
              }
            >
              <AccordionToggleIcon />
              {accordion.header}
            </AccordionHeading>
          </UtilityFragment>
          <UtilityFragment vPaddingHorizontal={32}>
            <AccordionPanel
              style={
                {
                  '--v-accordion-panel-background-color': 'transparent',
                  '--v-accordion-panel-border-size': '0px',
                } as CSSProperties
              }
            >
              <Typography>{accordion.content}</Typography>
            </AccordionPanel>
          </UtilityFragment>
        </Accordion>
      ))}
    </Utility>
  );
};
