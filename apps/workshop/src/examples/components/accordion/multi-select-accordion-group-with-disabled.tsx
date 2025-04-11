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
} from '@visa/nova-react';
import { useState } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'multi-select-accordion-group-with-disabled';

const accordions = [
  {
    id: `${id}-panel-1`,
    content: 'This is required text that describes the accordion section in more detail.',
    header: 'Accordion title 1',
    disabled: true,
  },
  {
    id: `${id}-panel-2`,
    content: 'This is required text that describes the accordion section in more detail.',
    header: 'Accordion title 2',
  },
  {
    id: `${id}-panel-3`,
    content: 'This is required text that describes the accordion section in more detail.',
    header: 'Accordion title 3',
  },
];

export const MultiSelectAccordionGroupWithDisabled = () => {
  const [expandedPanels, setExpandedPanels] = useState<{
    [key: string]: boolean;
  }>({
    panel1: false,
    panel2: false,
    panel3: false,
  });

  const handleToggle = (panel: string) => {
    setExpandedPanels(prevState => ({
      ...prevState,
      [panel]: !prevState[panel],
    }));
  };

  return (
    <Utility vFlex vFlexCol vGap={6}>
      {accordions.map((accordion, index) => {
        const panelKey = `panel${index + 1}`;

        return (
          <Accordion id={accordion.id} tag="div" key={accordion.id}>
            <AccordionHeading
              aria-controls={`${accordion.id}-accordion-panel`}
              aria-expanded={expandedPanels[panelKey]}
              disabled={accordion.disabled}
              buttonSize="large"
              colorScheme="secondary"
              id={`${accordion.id}-accordion-header`}
              onClick={() => handleToggle(panelKey)}
              tag="button"
            >
              <AccordionToggleIcon accordionOpen={expandedPanels[panelKey]} />
              {accordion.header}
            </AccordionHeading>
            <AccordionPanel aria-hidden={!expandedPanels[panelKey]} id={`${accordion.id}-accordion-panel`}>
              <Typography>{accordion.content}</Typography>
            </AccordionPanel>
          </Accordion>
        );
      })}
    </Utility>
  );
};
