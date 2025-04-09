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
import { VisaLinkTiny } from '@visa/nova-icons-react';
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
  Link as VLink,
} from '@visa/nova-react';
import { Link } from 'react-router-dom';
import Code from '../../../components/code';
import { Paths } from '../../../routes';
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
                <kbd>Arrow Down</kbd>
              </code>
            </Td>
            <Td>Focus the next element, looping to the top of the list</Td>
          </Tr>
          <Tr>
            <Td>
              <code>
                <kbd>Arrow Up</kbd>
              </code>
            </Td>
            <Td>Focus the previous element, looping to the bottom of the list</Td>
          </Tr>
          <Tr>
            <Td>
              <code>
                <kbd>End</kbd>
              </code>
            </Td>
            <Td>Focus the last element</Td>
          </Tr>
          <Tr>
            <Td>
              <code>
                <kbd>Home</kbd>
              </code>
            </Td>
            <Td>Focus the first element</Td>
          </Tr>
          <Tr>
            <Td>
              <code>
                <kbd>Shift + Tab</kbd>
              </code>
            </Td>
            <Td>Focus the previous element</Td>
          </Tr>
          <Tr>
            <Td>
              <code>
                <kbd>Tab</kbd>
              </code>
            </Td>
            <Td>Focus the next element</Td>
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

const DefaultOpenNote = () => (
  <Utility vFlex vFlexCol vPaddingVertical={12} vGap={12}>
    <Typography>
      This hook allows us to set the <code>defaultSelected</code> value to indicate the item should be expanded by
      default.
    </Typography>
    <Code code="const { isIndexExpanded, toggleIndexExpanded } = useAccordion({ defaultExpanded: 1 }); // this will expand the 2nd item by default."></Code>
  </Utility>
);

const UseDisclosureExample = () => (
  <Utility vFlex vFlexCol vPaddingVertical={12} vGap={12}>
    <Typography>
      This hook allows us to set the <code>defaultSelected</code> value as an array to indicate more than one accordion
      item can be expanded at a time.
    </Typography>
    <Code code="const { isIndexExpanded, toggleIndexExpanded } = useAccordion({ defaultExpanded: [] });"></Code>
    <Typography>
      If you put values inside the array, it will expand the selected accordion items at the same time, by default.
    </Typography>
    <Code code="const { isIndexExpanded, toggleIndexExpanded } = useAccordion({ defaultExpanded: [1, 2] }); // this will expand the 2nd and 3rd items by default."></Code>
    <UtilityFragment vPaddingTop={8}>
      <Typography>
        See an example of this in the Accordion example page:{' '}
        <VLink
          element={<Link to={Paths.documentationPage('components', 'accordion#disclosure-group-accordion')} />}
          noUnderline
        >
          <VisaLinkTiny />
          custom disclosure
        </VLink>
        .
      </Typography>
    </UtilityFragment>
  </Utility>
);

const Examples: ExampleIndex[] = [
  {
    id: 'use-accordion-example',
  },
  {
    id: 'default-expanded-item-section',
    title: 'Default expanded item',
    type: 'section',
  },
  {
    component: <DefaultOpenNote />,
    id: 'Default expanded item note',
    type: 'content',
  },
  {
    id: 'alternate-usage-section',
    title: 'Alternate usage',
    type: 'section',
  },
  {
    component: <UseDisclosureExample />,
    id: 'Alternative usage note',
    type: 'content',
  },
  {
    id: 'keyboard-navigation-section',
    title: 'Keyboard navigation',
    type: 'section',
  },
  {
    component: <OnKeyNavigationTable />,
    id: 'Keyboard navigation note',
    type: 'content',
  },
];
export default Examples;
