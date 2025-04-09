/**
 *              Copyright (c) 2025 Visa, Inc.
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
  ScreenReader,
  Table,
  TableWrapper,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Typography,
  Utility,
  UtilityFragment,
} from '@visa/nova-react';
import Code from '../../../components/code';
import { ExampleIndex } from '../../../types';

const OnKeyNavigationTable = () => (
  <Utility vPaddingVertical={12}>
    <TableWrapper>
      <Table alternate borderBlock border>
        <ScreenReader tag="caption">{`onKeyNavigation key control table. the key value is in column 1, and the behavior after the key input is in column 2.`}</ScreenReader>
        <Thead>
          <Tr>
            <Th scope="col">Key</Th>
            <Th scope="col">Behavior</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <code>
                <kbd>Arrow Down/Arrow Right</kbd>
              </code>
            </Td>
            <Td>Focus the next tab, looping to the top of the list</Td>
          </Tr>
          <Tr>
            <Td>
              <code>
                <kbd>Arrow Up/Arrow Left</kbd>
              </code>
            </Td>
            <Td>Focus the previous tab, looping to the bottom of the list</Td>
          </Tr>
          <Tr>
            <Td>
              <code>
                <kbd>End</kbd>
              </code>
            </Td>
            <Td>Focus the last tab</Td>
          </Tr>
          <Tr>
            <Td>
              <code>
                <kbd>Home</kbd>
              </code>
            </Td>
            <Td>Focus the first tab</Td>
          </Tr>
          <Tr>
            <Td>
              <code>
                <kbd>Shift + Tab</kbd>
              </code>
            </Td>
            <Td>Jumps out of the tabs, focus the previous focusable element</Td>
          </Tr>
          <Tr>
            <Td>
              <code>
                <kbd>Tab</kbd>
              </code>
            </Td>
            <Td>Jumps out of the tabs, focus the next focusable element</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableWrapper>
    <UtilityFragment vPaddingVertical={4}>
      <Typography>
        Note: this only applies when <code>onKeyNavigation</code> prop is in use.
      </Typography>
    </UtilityFragment>
  </Utility>
);

const DefaultSelectedNote = () => (
  <Utility vFlex vFlexCol vPaddingVertical={12} vGap={12}>
    <Typography>
      This hook allows us to set the <code>defaultSelected</code> which indicates that we are selecting that item by
      default
    </Typography>
    <Code code="const { onIndexChange, onKeyNavigation, ref, selectedIndex } = useTabs({ defaultSelected: 1 }); // this will select the 2nd item by default." />
  </Utility>
);

const Examples: ExampleIndex[] = [
  {
    id: 'use-tabs-example',
  },
  {
    id: 'default-selected-tab-section',
    title: 'Default selected tab',
    type: 'section',
  },
  {
    component: <DefaultSelectedNote />,
    id: 'default selected tab',
    type: 'content',
  },
  {
    component: (
      <div>
        To auto-select a tab while navigating with arrow keys, set <code>{`useTabs({ autoSelect: true })`}</code>
      </div>
    ),
    id: 'auto-select-tabs',
    type: 'content',
  },
  {
    id: 'keyboard-navigation-section',
    title: 'Keyboard navigation',
    type: 'section',
  },
  {
    component: <OnKeyNavigationTable />,
    id: 'Keyboard navigation',
    type: 'content',
  },
];

export default Examples;
