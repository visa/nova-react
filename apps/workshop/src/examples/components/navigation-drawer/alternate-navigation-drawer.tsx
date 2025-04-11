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
const id = 'alternate-navigation-drawer';
const navElAriaLabel = 'Alternate drawer';

const tabsContent = [
  {
    tabLabel: 'L1 label 1',
    id: `${id}-tab-0`,
    href: './navigation-drawer',
  },
  {
    tabLabel: 'L1 label 2',
    id: `${id}-tab-1`,
    href: './navigation-drawer',
  },
  {
    tabLabel: 'L1 label 3',
    id: `${id}-tab-2`,
    href: './navigation-drawer',
  },
  {
    tabLabel: 'L1 label 4',
    id: `${id}-tab-3`,
    href: './navigation-drawer',
  },
  {
    tabLabel: 'L1 label 5',
    id: `${id}-tab-4`,
    href: './navigation-drawer',
  },
];

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

export const AlternateNavigationDrawer = () => {
  const [accountTabOpen, setAccountTabOpen] = useState(false);
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
            alternate
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
                {tabsContent.map(tabContent => (
                  <Tab key={tabContent.id}>
                    <UtilityFragment vMarginLeft={14}>
                      <Button colorScheme="tertiary" element={<a href={tabContent.href}>{tabContent.tabLabel}</a>} />
                    </UtilityFragment>
                  </Tab>
                ))}
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
