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
import { ExampleIndex } from '../../../types';

const Examples: ExampleIndex[] = [
  {
    id: 'default-pagination-section',
    title: 'Default paginations',
    type: 'section',
  },
  {
    id: 'one-digit-pagination',
  },
  {
    id: 'two-digit-pagination',
  },
  {
    id: 'last-page-selected',
  },
  {
    id: 'slim-pagination-section',
    title: 'Slim paginations',
    type: 'section',
  },
  { id: 'slim-pagination' },
  {
    id: 'custom-pagination-section',
    title: 'Custom paginations',
    type: 'section',
  },
  { id: 'table-pagination' },
  { id: 'min-max-pagination' },
];

export default Examples;
