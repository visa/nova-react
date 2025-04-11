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

import metaData from './meta.json';

export const Examples: ExampleIndex[] = [
  {
    id: 'default-panel-section',
    title: 'Default panels',
    type: 'section',
  },
  { ...metaData['modal-panel'] },
  { ...metaData['default-panel'] },
  {
    id: 'expandable-panel-section',
    title: 'Expandable panels',
    type: 'section',
  },
  { ...metaData['expandable-panel'] },
  {
    ...metaData['expandable-responsive-panel'],
  },
  { ...metaData['expandable-panel-secondary'] },
  { ...metaData['expandable-panel-skrim'] },
  {
    id: 'tabbed-panel-section',
    title: 'Tabbed panels',
    type: 'section',
  },
  { ...metaData['tabbed-expandable-panel'] },
  { ...metaData['tabbed-expandable-responsive-panel'] },
];

export default Examples;
