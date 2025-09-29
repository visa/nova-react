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
import { SectionMessage, SectionMessageContent, Typography, UtilityFragment } from '@visa/nova-react';
import { MessageIcon } from '@visa/nova-icons-react';
import { ExampleIndex } from '../../../types';

const ResponsiveNote = () => (
  <SectionMessage>
    <MessageIcon />
    <UtilityFragment vPaddingLeft={2} vPaddingBottom={2}>
      <SectionMessageContent>
        <Typography tag="h4" variant="body-2-bold">
          Note: the compact wizard example is visible when the example container width is mobile width or smaller!
        </Typography>
        <Typography>At greater than mobile width, the default horizontal wizard will render.</Typography>
      </SectionMessageContent>
    </UtilityFragment>
  </SectionMessage>
);

const Examples: ExampleIndex[] = [
  { id: 'multi-page-wizards-headline', title: 'Multi-page wizards', type: 'section' },
  { id: 'horizontal-wizard' },
  { id: 'vertical-wizard' },
  { id: 'single-page-wizard-headline', title: 'Single-page wizards', type: 'section' },
  { id: 'single-page-wizard' },
  { id: 'custom-wizard-headline', title: 'Custom wizards', type: 'section' },
  { component: <ResponsiveNote />, id: 'Responsive Wizard Note', type: 'content' },
  { id: 'responsive-horizontal-wizard' },
  { id: 'shared-wizard-components', title: 'Shared Components', type: 'section' },
  { id: 'exit-dialog' },
  { id: 'save-flag' },
  { id: 'success-message' },
  { id: 'summary-page' },
];

export default Examples;
