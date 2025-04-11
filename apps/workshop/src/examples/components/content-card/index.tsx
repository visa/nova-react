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
import {
  SectionMessage,
  SectionMessageContent,
  SectionMessageIcon,
  Typography,
  UtilityFragment,
} from '@visa/nova-react';

const NoteAboutHeadings = () => (
  <SectionMessage>
    <SectionMessageIcon />
    <UtilityFragment vFlex vFlexCol vGap={6}>
      <SectionMessageContent>
        <Typography tag="h2" variant="body-2-bold">
          Set the component headings as needed for your use case.
        </Typography>
        <Typography>The examples below use heading tags where titles are present.</Typography>
        <Typography>
          In our demo examples, we use headings that follow{' '}
          <Typography variant="body-2-bold" tag="span">
            our
          </Typography>{' '}
          application's hierarchical structure.
        </Typography>
        <Typography>
          It is essential that you adjust these heading levels to match the structural needs of your application for
          optimal semantic accuracy and accessibility.
        </Typography>
      </SectionMessageContent>
    </UtilityFragment>
  </SectionMessage>
);

const Examples: ExampleIndex[] = [
  {
    id: 'default-content-card-section',
    title: 'Default content cards',
    type: 'section',
  },
  { component: <NoteAboutHeadings />, id: 'unique-link-name-note', type: 'content' },
  { id: 'default-content-card' },
  {
    id: 'with-buttons-content-card',
  },
  {
    id: 'clickable-content-card',
  },
  {
    id: 'clickable-disabled-content-card',
  },
  { id: 'compact-content-card' },
  { id: 'category-content-card' },
  { id: 'icon-content-card' },
  {
    id: 'image-header-content-card',
  },
  {
    id: 'dashboard-content-card-section',
    title: 'Dashboard content cards',
    type: 'section',
  },
  {
    id: 'compact-dashboard-content-card',
  },
];

export default Examples;
