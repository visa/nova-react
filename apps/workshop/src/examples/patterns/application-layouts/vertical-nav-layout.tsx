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
    VisaStatisticsTiny,
    VisaSettingsTiny,
    VisaSecurityTiny,
    VisaNotesTiny,
    VisaSupportTicketTiny,
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
  

  const id = 'vertical-no-main-navigation';
  
  const tabsContent = [
    {
      tabLabel: 'L1 label 1',
      id: `${id}-tab-0`,
      icon: <VisaStatisticsTiny />,
      href: './application-layouts',
    },
    {
      tabLabel: 'L1 label 2',
      id: `${id}-tab-1`,
      icon: <VisaSettingsTiny />,
      href: './application-layouts',
    },
    {
      tabLabel: 'L1 label 3',
      id: `${id}-tab-2`,
      icon: <VisaSecurityTiny />,
      href: './application-layouts',
    },
    {
      tabLabel: 'L1 label 4',
      id: `${id}-tab-3`,
      icon: <VisaNotesTiny />,
      href: './application-layouts',
    },
    {
      tabLabel: 'L1 label 5',
      id: `${id}-tab-4`,
      icon: <VisaSupportTicketTiny />,
      href: './application-layouts',
    },
  ];
  
  const accountSubItems = [
    {
      tabLabel: 'Account item 1',
      id: `${id}-account-sub-item-0`,
      href: './application-layouts',
    },
    {
      tabLabel: 'Account item 2',
      id: `${id}-account-sub-item-1`,
      href: './application-layouts',
    },
  ];
  
  export const VerticalNavigationLayout = () => {
    const [navExpanded, setNavExpanded] = useState(true);
    const [accountTabOpen, setAccountTabOpen] = useState(false);
  
    return (
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
                  <Typography variant="subtitle-1">Application name</Typography>
                </NavAppName>
              </Link>
            </UtilityFragment>
            <nav aria-label="global">
              <UtilityFragment vGap={8}>
                <Tabs orientation="vertical">
                  {tabsContent.map(tabContent => (
                    <Tab key={tabContent.id}>
                      <Button
                        colorScheme="tertiary"
                        element={<a href="./application-layouts">
                          {tabContent.icon}
                          {tabContent.tabLabel}
                        </a>}
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
    );
  };
  