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
import { Fragment } from 'react';
import {
  Accordion,
  AccordionHeading,
  AccordionPanel,
  AccordionToggleIcon,
  Typography,
  useAccordion,
} from '@visa/nova-react';

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

export const DefaultWithItemOpenAccordion = () => {
  const { isIndexExpanded, toggleIndexExpanded } = useAccordion({ defaultExpanded: 0 });

  return (
    <Accordion id="accordion-default-open-group" tag="div">
      {accordions.map((accordion, index) => (
        <Fragment key={`accordion-default-open-group-${index}`}>
          <AccordionHeading
            aria-controls={`accordion-default-open-panel-${index}`}
            aria-expanded={isIndexExpanded(index)}
            buttonSize="large"
            colorScheme="secondary"
            id={`accordion-default-open-header-${index}`}
            onClick={() => toggleIndexExpanded(index)}
            tag="button"
          >
            <AccordionToggleIcon accordionOpen={isIndexExpanded(index)} />
            {accordion.header}
          </AccordionHeading>
          <AccordionPanel aria-hidden={!isIndexExpanded(index)} id={`accordion-default-open-panel-${index}`}>
            <Typography>{accordion.content}</Typography>
          </AccordionPanel>
        </Fragment>
      ))}
    </Accordion>
  );
};
