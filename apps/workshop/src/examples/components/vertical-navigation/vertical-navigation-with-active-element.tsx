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
  VisaAccountTiny,
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaMediaFastForwardTiny,
  VisaMediaRewindTiny,
} from '@visa/nova-icons-react';
import {
  Button,
  Divider,
  Link,
  Nav,
  NavAppName,
  Tab,
  TabSuffix,
  Tabs,
  Typography,
  Utility,
  UtilityFragment,
  VisaLogo,
} from '@visa/nova-react';
import { useState } from 'react';
import Styles from './styles.module.scss';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'vertical-navigation-with-active-element';
const navRegionAriaLabel = 'Vertical navigation with active element';

const tabsContent = [
  {
    tabLabel: 'L1 label 1',
    id: `${id}-tab-0`,
    active: true,
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

const accountSubItems = [
  {
    tabLabel: 'L2 label 1',
    id: `${id}-account-sub-item-0`,
    href: './vertical-navigation',
  },
  {
    tabLabel: 'L2 label 2',
    id: `${id}-account-sub-item-1`,
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

export const VerticalNavigationWithActiveElement = () => {
  const [navExpanded, setNavExpanded] = useState(true);
  const [accountTabOpen, setAccountTabOpen] = useState(false);

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
              <UtilityFragment
                vFlex
                vFlexCol
                vGap={12}
                vMarginTop={16}
                vMarginRight={16}
                vMarginBottom={30}
                vMarginLeft={20}
              >
                <Link
                  aria-label="Visa Application Name Home"
                  href="https://www.visa.com"
                  id={`${id}-home-link`}
                  noUnderline
                  style={{ backgroundColor: 'transparent' }}
                >
                  <VisaLogo />
                  <NavAppName>
                    <Typography variant="subtitle-1">Application Name</Typography>
                  </NavAppName>
                </Link>
              </UtilityFragment>
              <nav aria-label={navRegionAriaLabel}>
                <UtilityFragment vGap={8}>
                  <Tabs orientation="vertical">
                    {tabsContent.map(tabContent => (
                      <Tab key={tabContent.id}>
                        <Button
                          colorScheme="tertiary"
                          aria-current={tabContent.active ? 'page' : false}
                          element={<a href={tabContent.href}>{tabContent.tabLabel}</a>}
                        />
                      </Tab>
                    ))}
                  </Tabs>
                </UtilityFragment>
              </nav>
            </>
          )}
          <Utility vFlex vFlexCol vAlignSelf="stretch" vGap={4} vMarginTop="auto">
            {navExpanded && (
              <>
                <Divider dividerType="decorative" />
                <Tab tag="div">
                  <Button
                    aria-expanded={accountTabOpen}
                    aria-controls={`${id}-account-sub-menu`}
                    aria-label="Alex Miller"
                    buttonSize="large"
                    colorScheme="tertiary"
                    onClick={() => setAccountTabOpen(!accountTabOpen)}
                  >
                    <VisaAccountTiny />
                    Alex Miller
                    <TabSuffix element={accountTabOpen ? <VisaChevronUpTiny /> : <VisaChevronDownTiny />} />
                  </Button>
                  <UtilityFragment vHide={!accountTabOpen}>
                    <Tabs orientation="vertical" id={`${id}-account-sub-menu`} aria-hidden={!accountTabOpen}>
                      {accountSubItems.map(accountSubItem => (
                        <Tab key={accountSubItem.id} id={accountSubItem.id}>
                          <Button
                            colorScheme="tertiary"
                            element={<a href={accountSubItem.href}>{accountSubItem.tabLabel}</a>}
                          />
                        </Tab>
                      ))}
                    </Tabs>
                  </UtilityFragment>
                </Tab>
              </>
            )}
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
