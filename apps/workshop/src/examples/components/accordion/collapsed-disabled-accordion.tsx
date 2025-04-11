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
import { Accordion, AccordionHeading, AccordionPanel, AccordionToggleIcon, Typography } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'collapsed-disabled-accordion';

export const CollapsedDisabledAccordion = () => {
  const expanded = false;

  return (
    <Accordion id={id} tag="div">
      <AccordionHeading
        aria-controls={`${id}-accordion-panel`}
        aria-expanded={expanded}
        disabled
        buttonSize="large"
        colorScheme="secondary"
        id={`${id}-accordion-header`}
        tag="button"
      >
        <AccordionToggleIcon accordionOpen={expanded} />
        Accordion title
      </AccordionHeading>
      <AccordionPanel aria-hidden={!expanded} id={`${id}-accordion-panel`}>
        <Typography>This is required text that describes the accordion section in more detail.</Typography>
      </AccordionPanel>
    </Accordion>
  );
};
