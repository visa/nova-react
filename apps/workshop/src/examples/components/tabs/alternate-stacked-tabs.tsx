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
import { Button, Surface, Tab, Tabs, Utility, useTabs } from '@visa/nova-react';
import { VisaStatisticsLow, VisaEmailLow, VisaReceiptLow, VisaHomeLow } from '@visa/nova-icons-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'nova-alternate-stacked-tabs-example';

const tabsContent = [
  {
    tabLabel: 'Label 1',
    text: `This is the content area for label 1`,
    id: `${id}-tab-0`,
    icon: <VisaHomeLow />,
  },
  {
    tabLabel: 'Label 2',
    text: `This is the content area for label 2`,
    id: `${id}-tab-1`,
    icon: <VisaReceiptLow />,
  },
  {
    tabLabel: 'Label 3',
    text: `This is the content area for label 3`,
    id: `${id}-tab-2`,
    icon: <VisaStatisticsLow />,
  },
  {
    tabLabel: 'Label 4',
    text: `This is the content area for label 4`,
    id: `${id}-tab-3`,
    icon: <VisaEmailLow />,
  },
];

export const AlternateStackedTabs = () => {
  const {
    getTabIndex,
    onIndexChange,
    onKeyNavigation,
    ref: tabsRef,
    selectedIndex,
  } = useTabs({ arrowKeyNavigation: 'horizontal', defaultSelected: 0 });

  return (
    <Surface surfaceType="alternate">
      <Utility>
        <Tabs onKeyDown={onKeyNavigation} role="tablist">
          {tabsContent.map((tabContent, index) => (
            <Tab key={`default-stacked-tab-${index}`} role="none">
              <Button
                aria-selected={index === selectedIndex}
                aria-controls={tabContent.id}
                colorScheme="tertiary"
                onClick={() => onIndexChange(index)}
                ref={el => {
                  tabsRef.current[index] = el;
                }}
                role="tab"
                stacked
                tabIndex={getTabIndex(index)}
              >
                {tabContent.icon}
                {tabContent.tabLabel}
              </Button>
            </Tab>
          ))}
        </Tabs>
        <Utility vMarginVertical={8} vFlex vFlexGrow vElevation="xxlarge">
          {/*
          We have a nested surface that has been styled in our app's stylesheet. 
          This has been done to leverage darker palette variables and bring contrast to this custom tabpanel.

          The CSS rule is something like this:

          .v-surface.v-alternate .v-surface {
            // The background color is set to surface-3 of the default palette.
            background: var(--palette-default-surface-3);
          }
        */}
          <Surface id={tabsContent[selectedIndex]?.id} role="tabpanel" style={{ minBlockSize: '200px' }}>
            <span>{tabsContent[selectedIndex]?.text}</span>
          </Surface>
        </Utility>
      </Utility>
    </Surface>
  );
};
