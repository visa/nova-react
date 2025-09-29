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
  VisaMediaFastForwardTiny,
  VisaMediaRewindTiny,
  VisaNotesTiny,
  VisaSecurityTiny,
  VisaSettingsTiny,
  VisaStatisticsTiny,
  VisaSupportTicketTiny
} from '@visa/nova-icons-react';
import {
  Button,
  Divider,
  Nav,
  Tab,
  Tabs,
  Utility,
  UtilityFragment
} from '@visa/nova-react';
import { useState } from 'react';

/** 
 * This is like vertical nav but without the user account, and skip to content, which are in the horizontal nav.
**/
  
  const id = 'vertical-mixed-navigation';
  
  const tabsContent = [
    {
      tabLabel: 'L2 label 1',
      id: `${id}-tab-0`,
      icon: <VisaStatisticsTiny />,
      href: './application-layouts',
    },
    {
      tabLabel: 'L2 label 2',
      id: `${id}-tab-1`,
      icon: <VisaSettingsTiny />,
      href: './application-layouts',
    },
    {
      tabLabel: 'L2 label 3',
      id: `${id}-tab-2`,
      icon: <VisaSecurityTiny />,
      href: './application-layouts',
    },
    {
      tabLabel: 'L2 label 4',
      id: `${id}-tab-3`,
      icon: <VisaNotesTiny />,
      href: './application-layouts',
    },
    {
      tabLabel: 'L2 label 5',
      id: `${id}-tab-4`,
      icon: <VisaSupportTicketTiny />,
      href: './application-layouts',
    },
  ];
  
  export const VerticalMixedNavLayout = () => {
    const [navExpanded, setNavExpanded] = useState(true);
  
    return (
      <Nav id={id} orientation="vertical" className="layout-vertical-mixed" aria-label="primary">
        {navExpanded && (
          <>
            <Utility className="mixed-vertical-tabs" vAlignSelf="stretch">
              <UtilityFragment vGap={8}>
                <Tabs orientation="vertical">
                  {tabsContent.map(tabContent => (
                    <Tab key={tabContent.id}>
                      <Button
                        colorScheme="tertiary"
                        element={<a href="./application-layouts">
                          {tabContent.icon}
                          {tabContent.tabLabel}</a>}
                      />
                    </Tab>
                  ))}
                </Tabs>
              </UtilityFragment>
            </Utility>
          </>
        )}
        <Utility vFlex vFlexCol vAlignSelf="stretch" vGap={4} vMarginTop="auto">
          <UtilityFragment vMarginBottom={4}>
            <Divider dividerType="decorative" />
          </UtilityFragment>
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
  