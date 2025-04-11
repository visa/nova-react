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
import { VisaAccountTiny, VisaChevronDownTiny, VisaChevronUpTiny, VisaCloseTiny } from '@visa/nova-icons-react';
import {
  Button,
  Divider,
  Panel,
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
import { CSSProperties, useState, useRef } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'navigation-drawer-with-nested-elements';
const navElAriaLabel = 'Drawer with nested elements';

const accountSubItems = [
  {
    tabLabel: 'L2 label 1',
    id: `${id}-account-sub-item-0`,
    href: './navigation-drawer',
  },
  {
    tabLabel: 'L2 label 2',
    id: `${id}-account-sub-item-1`,
    href: './navigation-drawer',
  },
];

export const NavigationDrawerWithNestedElements = () => {
  const [accountTabOpen, setAccountTabOpen] = useState(false);
  const [l1Label2Expanded, setL1Label2Expanded] = useState(false);
  const [l1Label4Expanded, setL1Label4Expanded] = useState(false);
  const [l2Label1Expanded, setL2Label1Expanded] = useState(false);
  const navDrawerRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <UtilityFragment vMargin={10}>
        <Button onClick={() => navDrawerRef.current?.showModal()}>Open drawer</Button>
      </UtilityFragment>

      <UtilityFragment vMarginHorizontal={0}>
        <Panel
          aria-modal="true"
          ref={navDrawerRef}
          id={id}
          tag="dialog"
          style={
            {
              '--v-panel-inline-size': 'initial',
            } as CSSProperties
          }
        >
          <Nav
            drawer
            orientation="vertical"
            tag="div"
            style={
              {
                inlineSize: '242px',
              } as CSSProperties
            }
          >
            <UtilityFragment vMarginRight={4} vMarginLeft="auto">
              <Button
                aria-label="Close"
                buttonSize="small"
                colorScheme="tertiary"
                iconButton
                onClick={() => navDrawerRef.current?.close()}
                subtle
              >
                <VisaCloseTiny />
              </Button>
            </UtilityFragment>
            <UtilityFragment
              vFlex
              vFlexCol
              vGap={12}
              vMarginTop={4}
              vMarginRight={16}
              vMarginBottom={16}
              vMarginLeft={24}
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
            <nav aria-label={navElAriaLabel}>
              <Tabs orientation="vertical">
                <Tab>
                  <UtilityFragment vMarginLeft={14}>
                    <Button colorScheme="tertiary" element={<a href="./navigation-drawer">L1 label 1</a>} />
                  </UtilityFragment>
                </Tab>
                <Tab>
                  <UtilityFragment vMarginLeft={14}>
                    <Button
                      aria-expanded={l1Label2Expanded}
                      aria-controls={`${id}-l1-label2-sub-menu`}
                      colorScheme="tertiary"
                      onClick={() => setL1Label2Expanded(!l1Label2Expanded)}
                    >
                      L1 label 2
                      <TabSuffix element={l1Label2Expanded ? <VisaChevronUpTiny /> : <VisaChevronDownTiny />} />
                    </Button>
                  </UtilityFragment>
                  <UtilityFragment vHide={!l1Label2Expanded}>
                    <Tabs orientation="vertical" id={`${id}-l1-label2-sub-menu`} aria-hidden={!l1Label2Expanded}>
                      <Tab>
                        <UtilityFragment vMarginLeft={28}>
                          <Button colorScheme="tertiary" element={<a href="./navigation-drawer">L2 label 1</a>} />
                        </UtilityFragment>
                      </Tab>
                      <Tab>
                        <UtilityFragment vMarginLeft={28}>
                          <Button colorScheme="tertiary" element={<a href="./navigation-drawer">L2 label 2</a>} />
                        </UtilityFragment>
                      </Tab>
                    </Tabs>
                  </UtilityFragment>
                </Tab>
                <Tab>
                  <UtilityFragment vMarginLeft={14}>
                    <Button colorScheme="tertiary" element={<a href="./navigation-drawer">L1 label 3</a>} />
                  </UtilityFragment>
                </Tab>
                <Tab>
                  <UtilityFragment vMarginLeft={14}>
                    <Button
                      aria-expanded={l1Label4Expanded}
                      aria-controls={`${id}-l1-label4-sub-menu`}
                      colorScheme="tertiary"
                      onClick={() => setL1Label4Expanded(!l1Label4Expanded)}
                    >
                      L1 label 4
                      <TabSuffix element={l1Label4Expanded ? <VisaChevronUpTiny /> : <VisaChevronDownTiny />} />
                    </Button>
                  </UtilityFragment>
                  <UtilityFragment vHide={!l1Label4Expanded}>
                    <Tabs orientation="vertical" id={`${id}-l1-label4-sub-menu`} aria-hidden={!l1Label4Expanded}>
                      <Tab>
                        <UtilityFragment vMarginLeft={28}>
                          <Button
                            aria-expanded={l2Label1Expanded}
                            aria-controls={`${id}-l2-label1-sub-menu`}
                            colorScheme="tertiary"
                            onClick={() => setL2Label1Expanded(!l2Label1Expanded)}
                          >
                            L2 label 1
                            <TabSuffix element={l2Label1Expanded ? <VisaChevronUpTiny /> : <VisaChevronDownTiny />} />
                          </Button>
                        </UtilityFragment>
                        <UtilityFragment vHide={!l2Label1Expanded}>
                          <Tabs orientation="vertical" id={`${id}-l2-label1-sub-menu`} aria-hidden={!l2Label1Expanded}>
                            <Tab>
                              <UtilityFragment vMarginLeft={42}>
                                <Button colorScheme="tertiary" element={<a href="./navigation-drawer">L3 label 1</a>} />
                              </UtilityFragment>
                            </Tab>
                            <Tab>
                              <UtilityFragment vMarginLeft={42}>
                                <Button colorScheme="tertiary" element={<a href="./navigation-drawer">L3 label 2</a>} />
                              </UtilityFragment>
                            </Tab>
                            <Tab>
                              <UtilityFragment vMarginLeft={42}>
                                <Button colorScheme="tertiary" element={<a href="./navigation-drawer">L3 label 3</a>} />
                              </UtilityFragment>
                            </Tab>
                          </Tabs>
                        </UtilityFragment>
                      </Tab>
                    </Tabs>
                  </UtilityFragment>
                </Tab>
                <Tab>
                  <UtilityFragment vMarginLeft={14}>
                    <Button colorScheme="tertiary" element={<a href="./navigation-drawer">L1 label 5</a>} />
                  </UtilityFragment>
                </Tab>
              </Tabs>
            </nav>
            <Utility vFlex vFlexCol vAlignSelf="stretch" vGap={4} vMarginTop="auto">
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
            </Utility>
          </Nav>
        </Panel>
      </UtilityFragment>
    </>
  );
};
