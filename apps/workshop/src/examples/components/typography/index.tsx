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
import { SectionMessage, SectionMessageIcon, Typography, Link as VLink } from '@visa/nova-react';
import { Link } from 'react-router-dom';
import { ExampleIndex } from '../../../types';

const ExampleIntro = () => (
  <SectionMessage>
    <SectionMessageIcon />
    <Typography variant="body-2">
      The default <code>{`<Typography />`}</code> is a <code>{`<p />`}</code> element. To use a different tag, pass it
      as the <code>tag</code> prop. Checkout this example:{' '}
      <VLink element={<Link to={'#tag-override-typography'} />}>Typography component with a custom tag</VLink>.
    </Typography>
  </SectionMessage>
);

const Examples: ExampleIndex[] = [
  { component: <ExampleIntro />, id: 'Custom tag message', type: 'content' },
  {
    id: 'headline',
    title: 'Headline',
    type: 'section',
    description:
      'The default <Typography /> is a <p /> element. To use a different tag, pass it as the tag prop. Checkout this example: Typography component with a custom tag.',
  },
  { id: 'display-one-typography' },
  { id: 'display-two-typography' },
  { id: 'headline-one-typography' },
  { id: 'headline-two-typography' },
  {
    id: 'headline-three-typography',
  },
  {
    id: 'headline-four-typography',
  },
  { id: 'subtitle-one-typography' },
  { id: 'subtitle-two-typography' },
  {
    id: 'subtitle-three-typography',
  },
  { id: 'overline-typography' },

  {
    id: 'typography-headline-body',
    title: 'Body',
    type: 'section',
  },

  { id: 'body-one-typography' },
  { id: 'body-two-typography' },
  {
    id: 'body-two-bold-typography',
  },
  {
    id: 'body-two-medium-typography',
  },
  { id: 'body-three-typography' },
  {
    id: 'typography-headline-detail',
    title: 'Detail',
    type: 'section',
  },
  {
    id: 'button-medium-typography',
  },
  {
    id: 'button-large-typography',
  },
  {
    id: 'button-small-typography',
  },
  { id: 'label-large-typography' },
  {
    id: 'label-large-active-typography',
  },
  { id: 'label-typography' },
  {
    id: 'label-active-typography',
  },
  { id: 'label-small-typography' },
  { id: 'color-default-typography' },
  { id: 'color-subtle-typography' },
  { id: 'color-active-typography' },
  { id: 'color-on-active-typography' },
];

export default Examples;
