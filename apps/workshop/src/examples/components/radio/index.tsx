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
  { id: 'Default radio buttons', title: 'Default radio buttons', type: 'section' },
  { id: 'with-label-radio' },
  { id: 'without-visible-label-radio' },
  {
    id: 'with-description-radio',
  },
  { id: 'selected-radio' },
  { id: 'error-radio' },

  { id: 'disabled-radio' },
  { id: 'disabled-selected-radio' },
  { id: 'Radio button groups', title: 'Radio button groups', type: 'section' },
  { id: 'group-radio' },
  { id: 'error-group-radio' },
  { id: 'horizontal-group-radio' },
  { id: 'Radio button panels', title: 'Radio button panels', type: 'section' },
  {
    id: 'with-description-panel-radio',
  },
  {
    id: 'without-description-panel-radio',
  },
  {
    id: 'disabled-panel-radio',
  },
  { id: 'Radio button panel groups', title: 'Radio button panel groups', type: 'section' },
  {
    id: 'group-panel-radio',
  },
  {
    id: 'error-group-panel-radio',
  },
];

export default Examples;
