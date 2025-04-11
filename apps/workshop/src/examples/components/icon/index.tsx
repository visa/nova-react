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
import { VisaMaximizeTiny as MaximizeTinyVisa } from '@visa/nova-icons-react';
import { Link, SectionMessage, SectionMessageIcon, Typography } from '@visa/nova-react';
import { ExampleIndex } from '../../../types';

const ExampleIntro = () => (
  <SectionMessage>
    <SectionMessageIcon />
    <Typography variant="body-2">
      For more icons, please visit{' '}
      <Link
        aria-label="icon library (Opens in a new tab)"
        href="https://design.visa.com/icons"
        rel="noopener noreferrer"
        target="_blank"
      >
        the full icons library
        <MaximizeTinyVisa />
      </Link>
      .
    </Typography>
  </SectionMessage>
);

const Examples: ExampleIndex[] = [
  { id: 'icon-intro', component: <ExampleIntro />, type: 'content' },
  { id: 'icon-styles-headline', title: 'Icon styles', type: 'section' },
  { id: 'default-icon' },
  { id: 'visa-icon' },
  { id: 'generic-icon' },
  { id: 'icon-sizes-headline', title: 'Icon sizes', type: 'section' },
  { id: 'tiny-resolution' },
  { id: 'low-resolution' },
  { id: 'high-resolution' },
  { id: 'icon-customization-headline', title: 'Icon customizations', type: 'section' },
  { id: 'rtl-icon' },
  { id: 'custom-color-icon' },
];

export default Examples;
