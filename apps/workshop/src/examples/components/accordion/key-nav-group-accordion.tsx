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
  useAccordion,
} from '@visa/nova-react';
import { Fragment } from 'react';

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

export const KeyNavGroupAccordion = () => {
  const { isIndexExpanded, onKeyNavigation, ref: accordionRef, toggleIndexExpanded } = useAccordion();

  return (
    <Accordion id="accordion-key-nav-group" onKeyDown={onKeyNavigation} tag="div">
      {accordions.map((accordion, i) => (
        <Fragment key={i}>
          <AccordionHeading
            aria-controls={`accordion-key-nav-group-panel-${i}`}
            aria-expanded={isIndexExpanded(i)}
            buttonSize="large"
            colorScheme="secondary"
            id={`accordion-key-nav-group-header-${i}`}
            onClick={() => toggleIndexExpanded(i)}
            ref={el => {
              accordionRef.current[i] = el;
            }}
            tag="button"
          >
            <AccordionToggleIcon accordionOpen={isIndexExpanded(i)} />
            {accordion.header}
          </AccordionHeading>
          <AccordionPanel aria-hidden={!isIndexExpanded(i)} id={`accordion-key-nav-group-panel-${i}`}>
            <Typography>{accordion.content}</Typography>
          </AccordionPanel>
        </Fragment>
      ))}
    </Accordion>
  );
};
