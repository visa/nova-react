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

const ScreenReaderDocsPageMessage = () => (
  <span role="alert" className="v-sr">This page contains many examples with alerts which are included to show developers how to use them in their code. Sorry about the bad experience when the page initially loads!
</span>
);

const Examples: ExampleIndex[] = [
  { component: <ScreenReaderDocsPageMessage />, id: 'screen-reader-docs-message', type: 'content' },
  {
    id: 'Linear progress headline',
    title: 'Linear progress indicators',
    type: 'section',
  },
  {
    id: 'indeterminate-progress',
  },
  { id: 'indeterminate-no-label-progress' },
  {
    id: 'determinate-progress',
  },
  { id: 'determinate-no-label-progress' },
  { id: 'complete-progress' },
  { id: 'error-progress' },
  {
    id: 'Circular progress headline',
    title: 'Circular progress indicators',
    type: 'section',
  },
  {
    id: 'indeterminate-circular-small-progress',
  },
  {
    id: 'indeterminate-circular-progress',
  },
  {
    id: 'determinate-circular-small-progress',
  },
  {
    id: 'determinate-circular-progress',
  },
  {
    id: 'complete-circular-progress',
  },
  {
    id: 'error-circular-progress',
  },
  {
    id: 'Custom progress headline',
    title: 'Custom progress indicators',
    type: 'section',
  },
  {
    id: 'circular-custom-size-progress',
  },
];

export default Examples;
