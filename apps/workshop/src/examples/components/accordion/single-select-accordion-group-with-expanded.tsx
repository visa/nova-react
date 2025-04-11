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
const id = 'single-select-accordion-group-with-expanded';

export const SingleSelectAccordionGroupWithExpanded = () => {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <Utility vFlex vFlexCol vGap={6}>
      {accordions.map((accordion, index) => (
        <Accordion key={`${id}-${index}`} open={openIndex === index}>
          <AccordionHeading
            buttonSize="large"
            colorScheme="secondary"
            onClick={event => {
              event.preventDefault();
              // If open, close accordion, else open accordion
              setOpenIndex(openIndex === index ? -1 : index);
            }}
          >
            <AccordionToggleIcon />
            {accordion.header}
          </AccordionHeading>
          <AccordionPanel>
            <Typography tag="span">{accordion.content}</Typography>
          </AccordionPanel>
        </Accordion>
      ))}
    </Utility>
  );
};
