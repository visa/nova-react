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
import { Typography } from '@visa/nova-react';
import { ExampleIndex } from '../../../types';

export const DefaultColorSelector = () => (
  <Typography tag="h2" variant="headline-2">
    Default Color Selector
  </Typography>
);

const Examples: ExampleIndex[] = [
  { id: 'Default color selectors', title: 'Default color selectors', type: 'section' },
  { id: 'color-input' },
];

export default Examples;
