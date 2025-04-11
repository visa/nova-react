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

export const SingleLineInputsHeadline = () => (
  <Typography tag="h2" variant="headline-2">
    Single-line inputs
  </Typography>
);

export const MultiLineInputsHeadline = () => (
  <Typography tag="h2" variant="headline-2">
    Multi-line inputs
  </Typography>
);

export const CustomInputsHeadline = () => (
  <Typography tag="h2" variant="headline-2">
    Custom inputs
  </Typography>
);

const Examples: ExampleIndex[] = [
  { id: 'Single-line inputs', title: 'Single-line inputs', type: 'section' },
  { id: 'default-input' },
  { id: 'initial-value-input' },
  { id: 'inline-message-input' },
  { id: 'clear-button-input' },
  { id: 'read-only-input' },
  { id: 'disabled-input' },
  { id: 'error-input' },
  { id: 'prefix-input' },
  { id: 'suffix-input' },
  { id: 'action-button-input' },
  { id: 'mask-button-input' },
  { id: 'leading-icon-input' },
  { id: 'one-time-passcode-input' },
  { id: 'Multi-line inputs', title: 'Multi-line inputs', type: 'section' },
  { id: 'native-resize-textarea' },
  { id: 'native-no-resize-textarea' },
  { id: 'fixed-height-textarea' },
  { id: 'resize-textarea' },
  { id: 'text-count-textarea' },
  { id: 'native-row-textarea' },
  { id: 'Custom inputs', title: 'Custom inputs', type: 'section' },
  { id: 'custom-inline-label-input' },
  { id: 'custom-form-input' },
  { id: 'cvv-input' },
];

export default Examples;
