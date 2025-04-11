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
import { ScreenReader, Table, Tbody, Td, Th, Thead, Tr } from '@visa/nova-react';
import { CSSProperties } from 'react';

export const LargePaddingBandedTable = () => {
  return (
    <Table
      alternate
      style={
        {
          '--v-table-data-padding-block-default': 'var(--v-table-data-padding-block-large)',
          '--v-table-data-block-default': 'var(--v-table-data-block-large)',
        } as CSSProperties
      }
    >
      <ScreenReader tag="caption">Table with large padding and banded rows.</ScreenReader>
      <Thead>
        <Tr>
          <Th scope="col">Column A</Th>
          <Th scope="col">Column B</Th>
          <Th scope="col">Column C</Th>
          <Th scope="col">Column D</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>A1</Td>
          <Td>B1</Td>
          <Td>C1</Td>
          <Td>D1</Td>
        </Tr>
        <Tr>
          <Td>A2</Td>
          <Td>B2</Td>
          <Td>C2</Td>
          <Td>D2</Td>
        </Tr>
        <Tr>
          <Td>A3</Td>
          <Td>B3</Td>
          <Td>C3</Td>
          <Td>D3</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};
