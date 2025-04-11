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
import { SectionMessage, SectionMessageContent, SectionMessageIcon, Typography, Link as VLink } from '@visa/nova-react';
import { Link } from 'react-router-dom';
import { Paths } from '../../../routes';
import { ExampleIndex } from '../../../types';

const FocusTrapHookNote = () => (
  <SectionMessage>
    <SectionMessageIcon />
    <SectionMessageContent>
      <Typography variant="subtitle-1" tag="h2">
        We are using a custom-made <code>useFocusTrap()</code> hook!
      </Typography>
      <Typography>
        We use <code>useFocusTrap()</code> trap focus inside the dialog component. This is a re-usable hook that will
        use HTML ref object to trap the focus on the elements focusable children. Checkout the useFocusTrap hook's{' '}
        <VLink element={<Link to={Paths.documentationPage('hooks', 'use-focus-trap')} />}>full documentation</VLink>.
      </Typography>
    </SectionMessageContent>
  </SectionMessage>
);

const Examples: ExampleIndex[] = [
  { component: <FocusTrapHookNote />, id: 'Focus trap hook note', type: 'content' },
  { id: 'dialogs-headline', title: 'Default Dialogs', type: 'section' },
  {
    id: 'default-dialog',
    headerTag: 'h2',
  },
  { id: 'error-dialog', headerTag: 'h2' },
  { id: 'success-dialog', headerTag: 'h2' },
  { id: 'warning-dialog', headerTag: 'h2' },
  {
    id: 'close-button-dialog',
    headerTag: 'h2',
  },
  {
    id: 'touring-tips-dialog',
    headerTag: 'h2',
  },
];

export default Examples;
