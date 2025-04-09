/**
 *              Copyright (c) 2025 Visa, Inc.
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

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'use-accordion-usage';

const accordions = [
  {
    content: 'This is required text that describes the accordion section in more detail.',
    header: 'Section label 1',
  },
];

export const UseAccordionExample = () => {
  // useAccordion hook returns the following:
  // isIndexExpanded: function that returns a boolean value to determine if the accordion is expanded or not
  // onKeyNavigation: function that handles keyboard navigation, and toggles the accordion expanded state
  // ref: a ref object that is used to store the accordion elements
  // toggleIndexExpanded: function that toggles the accordion expanded state, based on the index provided
  const { isIndexExpanded, onKeyNavigation, ref, toggleIndexExpanded } = useAccordion();

  return (
    <Accordion id={id} onKeyDown={onKeyNavigation} tag="div">
      {accordions.map((accordion, i) => (
        <Fragment key={i}>
          <AccordionHeading
            aria-controls={`${id}-panel-${i}`}
            aria-expanded={isIndexExpanded(i)}
            buttonSize="large"
            colorScheme="secondary"
            id={`${id}-header-${i}`}
            onClick={() => toggleIndexExpanded(i)}
            ref={el => {
              ref.current[i] = el;
            }}
            tag="button"
          >
            <AccordionToggleIcon accordionOpen={isIndexExpanded(i)} />
            {accordion.header}
          </AccordionHeading>
          <AccordionPanel aria-hidden={!isIndexExpanded(i)} id={`${id}-panel-${i}`}>
            <Typography tag="span">{accordion.content}</Typography>
          </AccordionPanel>
        </Fragment>
      ))}
    </Accordion>
  );
};
