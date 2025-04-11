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
import { SectionMessage, SectionMessageContent, SectionMessageIcon, Typography } from '@visa/nova-react';


const ExampleIntro = () => (
  <SectionMessage>
    <SectionMessageIcon />
    <SectionMessageContent>
      <Typography tag="h2" variant="body-2-bold">
      Set the message headings as needed for your use case.
      </Typography>
      <Typography>The examples below use heading tags where titles are present.</Typography>
      <Typography>In our demo examples, we use h4 headings following our application's hierarchical structure.</Typography>
      <Typography>It is essential that you adjust these heading levels to match the structural needs of your application for optimal semantic accuracy and accessibility.</Typography>
    </SectionMessageContent>
  </SectionMessage>
);

const Examples: ExampleIndex[] = [
  {
    id: 'Informational section messages headline',
    title: 'Informational section messages',
    type: 'section',
  },
  { component: <ExampleIntro />, id: 'section-message-intro', type: 'content' },
  {
    id: 'empty-information-section-message',
  },
  {
    id: 'default-information-section-message',
  },
  {
    id: 'title-information-section-message',
  },
  {
    id: 'link-information-section-message',
  },
  {
    id: 'button-information-section-message',
  },
  {
    id: 'persistent-information-section-message',
  },
  {
    id: 'Success section messages headline',
    title: 'Success section messages',
    type: 'section',
  },
  {
    id: 'empty-success-section-message',
  },
  {
    id: 'default-success-section-message',
  },
  {
    id: 'title-success-section-message',
  },
  {
    id: 'link-success-section-message',
  },
  {
    id: 'button-success-section-message',
  },
  {
    id: 'persistent-success-section-message',
  },
  {
    id: 'Warning section messages headline',
    title: 'Warning section messages',
    type: 'section',
  },
  {
    id: 'empty-warning-section-message',
  },
  {
    id: 'default-warning-section-message',
  },
  {
    id: 'title-warning-section-message',
  },
  {
    id: 'link-warning-section-message',
  },
  {
    id: 'button-warning-section-message',
  },
  {
    id: 'persistent-warning-section-message',
  },

  {
    id: 'Error section messages',
    title: 'Error section messages headline',
    type: 'section',
  },
  {
    id: 'empty-error-section-message',
  },
  {
    id: 'default-error-section-message',
  },
  {
    id: 'title-error-section-message',
  },
  {
    id: 'link-error-section-message',
  },
  {
    id: 'button-error-section-message',
  },
  {
    id: 'persistent-error-section-message',
  },
  {
    id: 'Subtle section messages',
    title: 'Subtle section messages headline',
    type: 'section',
  },
  {
    id: 'empty-subtle-section-message',
  },
  {
    id: 'default-subtle-section-message',
  },
  {
    id: 'title-subtle-section-message',
  },
  {
    id: 'link-subtle-section-message',
  },
  {
    id: 'button-subtle-section-message',
  },
  {
    id: 'persistent-subtle-section-message',
  },
];

export default Examples;
