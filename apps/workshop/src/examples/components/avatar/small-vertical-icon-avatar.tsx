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
import { VisaAccountTiny, VisaChevronDownTiny } from '@visa/nova-icons-react';
import { Button, Nav, Tabs, Tab, TabSuffix } from '@visa/nova-react';
import { useState } from 'react';

export const SmallVerticalIconAvatar = () => {
  const [accountIsOpen, setAccountIsOpen] = useState(false);

  return (
    <Nav aria-label="Vertical nav with active page" orientation="vertical" tag="div">
      <Tabs orientation="vertical" tag="div">
        <Tab tag="div">
          <Button
            aria-expanded={accountIsOpen}
            aria-label="Alex Miller"
            buttonSize="large"
            colorScheme="tertiary"
            onClick={() => setAccountIsOpen(!accountIsOpen)}
          >
            <VisaAccountTiny />
            <TabSuffix element={<VisaChevronDownTiny />} />
          </Button>
        </Tab>
        {accountIsOpen && (
          <div>
            <Tab role="none">
              <Button
                aria-current="page"
                buttonSize="large"
                colorScheme="tertiary"
                element={<a href="./nav">L2 label 1</a>}
                role="tab"
              />
            </Tab>
            <Tab role="none">
              <Button
                aria-selected="false"
                buttonSize="large"
                colorScheme="tertiary"
                element={<a href="./nav">L2 label 2</a>}
                role="tab"
              />
            </Tab>
          </div>
        )}
      </Tabs>
    </Nav>
  );
};
