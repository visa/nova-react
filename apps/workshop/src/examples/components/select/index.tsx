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
    id: 'default-select-section',
    title: 'Default selects',
    type: 'section',
  },
  { id: 'default-select' },
  { id: 'inline-select' },
  { id: 'select-with-inline-message' },
  { id: 'error-select' },
  { id: 'read-only-select' },
  { id: 'disabled-select' },
  {
    id: 'custom-select-section',
    title: 'Custom selects',
    type: 'section',
  },
  { id: 'card-expiration' },
];

export default Examples;
