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
  Link,
  Typography,
  Utility,
} from '@visa/nova-react';
import { CSSProperties, ReactNode } from 'react';

type FAQProps = {
  children: ReactNode;
  lastUpdated: string;
  sourceLink?: string | string[];
  title: string;
};

const FAQ = ({ children, lastUpdated, sourceLink = '', title }: FAQProps) => {
  return (
    <Utility tag="article" vFlexCol vGap={24}>
      <Accordion>
        <AccordionHeading buttonSize="large" colorScheme="tertiary" className="v-flex v-align-items-center">
          <AccordionToggleIcon className="v-my-5" />
          <Typography tag="h3" variant="headline-3">
            {title}
          </Typography>
        </AccordionHeading>
        <AccordionPanel
          style={
            {
              '--v-button-default-background': 'transparent',
              '--v-accordion-foreground-initial': 'var(--palette-default-active)',
              '--v-accordion-panel-border-size': '0px',
              '--v-accordion-panel-padding-inline': 'var(--size-scalable-8)',
            } as CSSProperties
          }
        >
          <Utility className="hover-card" vFlex vGap={24}>
            {children}
            <Utility vFlexCol vGap={12}>
              {sourceLink.length !== 0 &&
                (Array.isArray(sourceLink) ? (
                  <>
                    <Typography tag="span" variant="label-small">
                      Resources:{' '}
                      <ul>
                        {sourceLink.map((link, index) => (
                          <li key={index}>
                            <Link aria-label="Resource link" href={link}>
                              <Typography tag="span" variant="label-small">
                                {link}
                              </Typography>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Typography>
                  </>
                ) : (
                  <Typography tag="span" variant="label-small">
                    Resource:{' '}
                    <Link aria-label="Resource link" href={sourceLink}>
                      <Typography tag="span" variant="label-small">
                        {sourceLink}
                      </Typography>
                    </Link>
                  </Typography>
                ))}
              <Typography tag="span" variant="label-small">
                Last Updated: {lastUpdated}
              </Typography>
            </Utility>
          </Utility>
        </AccordionPanel>
      </Accordion>
    </Utility>
  );
};

export default FAQ;
