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
import { SectionMessage, SectionMessageContent, SectionMessageIcon, Typography } from '@visa/nova-react';
import { ExampleIndex } from '../../../types';

const ContainerNotes = () => (
  <SectionMessage messageType="warning">
    <SectionMessageIcon />
    <SectionMessageContent>
      <Typography variant="body-2-bold">Using container queries for direct children of React elements</Typography>
      <Typography>
        React elements (non-native HTML elements such as <code>&#60;app-root&#62;</code>) render display: inline by
        default. For the container query directives to apply, the display must be changed to another value.
      </Typography>
    </SectionMessageContent>
  </SectionMessage>
);

const Examples: ExampleIndex[] = [
  { id: 'Breakpoints-headline', title: 'Breakpoints', type: 'section' },
  { id: 'hide-breakpoints' },
  { component: <ContainerNotes />, id: 'Issues with container query in react', type: 'content' },
  {
    id: 'container-hide-breakpoints',
  },
  {
    id: 'media-hide-breakpoints',
  },
];

export default Examples;
