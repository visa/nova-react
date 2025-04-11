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
import { Typography } from '@visa/nova-react';
import { ExampleIndex } from '../../../types';

export const DateTimeSelectorsHeadline = () => (
  <Typography tag="h2" variant="headline-2">
    Date and time selectors
  </Typography>
);

const Examples: ExampleIndex[] = [
  { id: 'Date selectors', title: 'Date selectors', type: 'section' },
  { id: 'default-date-selector' },
  { id: 'read-only-date-selector' },
  { id: 'disabled-date-selector' },
  { id: 'date-selector-with-error' },
  { id: 'min-max-date-input' },
  { id: 'Date Range Selectors', title: 'Date Range Selectors', type: 'section' },
  { id: 'default-date-range-selector' },
  { id: 'stacked-date-range-selector' },
  { id: 'Time selectors', title: 'Time selectors', type: 'section' },
  { id: 'default-time-selector' },
  { id: 'read-only-time-selector' },
  { id: 'disabled-time-selector' },
  { id: 'time-selector-with-error' },
];

export default Examples;
