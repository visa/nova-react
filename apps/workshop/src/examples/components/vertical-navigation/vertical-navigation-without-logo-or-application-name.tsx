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
import { VisaMediaFastForwardTiny, VisaMediaRewindTiny } from '@visa/nova-icons-react';
import { Button, Link, Nav, Tab, Tabs, Typography, Utility, UtilityFragment } from '@visa/nova-react';
import { useState } from 'react';
import Styles from './styles.module.scss';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'vertical-navigation-without-logo-or-application-name';
const navRegionAriaLabel = 'Vertical navigation without logo or application name';

const tabsContent = [
  {
    tabLabel: 'L1 label 1',
    id: `${id}-tab-0`,
    href: './vertical-navigation',
  },
  {
    tabLabel: 'L1 label 2',
    id: `${id}-tab-1`,
    href: './vertical-navigation',
  },
  {
    tabLabel: 'L1 label 3',
    id: `${id}-tab-2`,
    href: './vertical-navigation',
  },
  {
    tabLabel: 'L1 label 4',
    id: `${id}-tab-3`,
    href: './vertical-navigation',
  },
  {
    tabLabel: 'L1 label 5',
    id: `${id}-tab-4`,
    href: './vertical-navigation',
  },
];

/*
 * Styles for the application container and main content
 * -----------------------------------------------------
 * .appContainer {
 *   &:global(:has(.v-nav .v-tabs)) {
 *     // The open navigation should be 242px
 *     grid-template-columns: 242px 1fr;
 *   }
 * }
 *
 * .layoutContainer {
 *   min-block-size: 700px;
 *   display: grid;
 *   grid-template-columns: auto 1fr;
 * }
 *
 * .mainContent {
 *   background-color: whitesmoke;
 *   min-block-size: 300px;
 *   padding: 12px;
 * }
 */

export const VerticalNavigationWithoutLogoOrApplicationName = () => {
  const [navExpanded, setNavExpanded] = useState(true);

  return (
    <div className={Styles.appContainer}>
      <div id="layout" className={Styles.layoutContainer}>
        <Nav id={id} orientation="vertical" tag="header">
          {navExpanded && (
            <Link skipLink href="#content">
              Skip to content
            </Link>
          )}
          {navExpanded && (
            <>
              <nav aria-label={navRegionAriaLabel}>
                <UtilityFragment vGap={8}>
                  <Tabs orientation="vertical">
                    {tabsContent.map(tabContent => (
                      <Tab key={tabContent.id}>
                        <Button colorScheme="tertiary" element={<a href={tabContent.href}>{tabContent.tabLabel}</a>} />
                      </Tab>
                    ))}
                  </Tabs>
                </UtilityFragment>
              </nav>
            </>
          )}
          <Utility vFlex vFlexCol vAlignSelf="stretch" vGap={4} vMarginTop="auto">
            <UtilityFragment vMarginLeft={navExpanded ? 'auto' : 5} vMarginRight={navExpanded ? 8 : 5}>
              <Button
                aria-label="Side bar"
                aria-expanded={!!navExpanded}
                buttonSize="small"
                colorScheme="tertiary"
                iconButton
                onClick={() => setNavExpanded(!navExpanded)}
                subtle
              >
                {navExpanded ? <VisaMediaRewindTiny rtl /> : <VisaMediaFastForwardTiny rtl />}
              </Button>
            </UtilityFragment>
          </Utility>
        </Nav>
        <div className={Styles.mainContent}>
          <Typography>Main Content</Typography>
        </div>
      </div>
    </div>
  );
};
