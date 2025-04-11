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
import { ScreenReader, Table, TableWrapper, Tbody, Td, Tr } from '@visa/nova-react';

export const KeyValueLinedTable = () => {
  return (
    <TableWrapper>
      <Table keyValue border>
        <ScreenReader tag="caption">Table with lined key-value pairs.</ScreenReader>
        <Tbody>
          <Tr>
            <th className="v-td" scope="row">
              Key 1
            </th>
            <Td>Value 1</Td>
          </Tr>
          <Tr>
            <th className="v-td" scope="row">
              Key 2
            </th>
            <Td>Value 2</Td>
          </Tr>
          <Tr>
            <th className="v-td" scope="row">
              Key 3
            </th>
            <Td>Value 3</Td>
          </Tr>
          <Tr>
            <th className="v-td" scope="row">
              Key 4
            </th>
            <Td>Value 4</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableWrapper>
  );
};
