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
import { Button, Tab, Tabs, TabSuffix, Utility } from '@visa/nova-react';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaHomeTiny } from '@visa/nova-icons-react';
import { useState } from 'react';

const subItems = ['L1 label 1', 'L1 label 2'];

export const VerticalTabWithMenu = () => {
  const [isTabExpanded, setIsTabExpanded] = useState(false);

  return (
    <Utility vFlex vFlexWrap vGap={8}>
      <Tabs orientation="vertical" tag="div">
        <Tab tag="div">
          <Button aria-expanded={isTabExpanded} colorScheme="tertiary" onClick={() => setIsTabExpanded(!isTabExpanded)}>
            <VisaHomeTiny /> Label
            <TabSuffix element={isTabExpanded ? <VisaChevronUpTiny /> : <VisaChevronDownTiny />} />
          </Button>
          {isTabExpanded && (
            <Tabs orientation="vertical">
              {subItems.map((subItem, i) => (
                <Tab key={i}>
                  <Button colorScheme="tertiary">{subItem}</Button>
                </Tab>
              ))}
            </Tabs>
          )}
        </Tab>
      </Tabs>
    </Utility>
  );
};
