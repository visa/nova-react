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
import { Button, Tab, Tabs, useTabs } from '@visa/nova-react';

const tabsList = ['Tab 1', 'Tab 2', 'Tab 3'];

export const UseTabsExample = () => {
  const { getTabIndex, onIndexChange, onKeyNavigation, ref: tabsRef, selectedIndex } = useTabs();

  return (
    <Tabs onKeyDown={onKeyNavigation} role="tablist">
      {tabsList.map((tab, index) => (
        <Tab key={`use-tabs-horizontal-tab-${index}`} role="none">
          <Button
            aria-selected={index === selectedIndex}
            buttonSize="large"
            colorScheme="tertiary"
            onClick={() => onIndexChange(index)}
            ref={el => {
              tabsRef.current[index] = el;
            }}
            role="tab"
            tabIndex={getTabIndex(index)}
          >
            {tab}
          </Button>
        </Tab>
      ))}
    </Tabs>
  );
};
