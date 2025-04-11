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

export const Examples: ExampleIndex[] = [
  { id: 'Selection chip headline', title: 'Selection chips', type: 'section' },
  { id: 'default-selection-chip' },
  { id: 'selected-selection-chip' },
  { id: 'multi-line-selection-chip' },
  {
    id: 'disabled-selection-chip',
  },
  { id: 'checked-disabled-selection-chip' },
  { id: 'selection-group-chip' },
  { id: 'Removable chip headline', title: 'Removable chips', type: 'section' },
  { id: 'default-removable-chip' },

  { id: 'removable-icon-chip' },
  { id: 'removable-avatar-chip' },
  { id: 'disabled-removable-chip' },
  { id: 'compact-removable-chip' },
  { id: 'compact-removable-icon-chip' },
  {
    id: 'compact-removable-avatar-chip',
  },
  { id: 'removable-group-chip' },
  {
    id: 'compact-removable-group-chip',
  },
  { id: 'Custom chip headline', title: 'Custom chips', type: 'section' },
  { id: 'static-chip' },
];

export default Examples;
