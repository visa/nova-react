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
import Code from '../../../components/code';
import { ExampleIndex } from '../../../types';

const ExampleIntro = () => (
  <SectionMessage>
    <SectionMessageIcon />
    <SectionMessageContent>
      <Typography variant="subtitle-1">
        If you are using VDS <code>{`<Link />`}</code> in the same file with React Router <code>{`<Link />`}</code>,
        remember to import it with a different name. For example:
      </Typography>
      <Code
        className="v-my-8"
        exampleName="Custom link name import"
        code={`import NovaLink from '@visa/nova-react/link'; 
// ...
<NovaLink href="https://www.visa.com" />`}
        language="typescript"
      />
    </SectionMessageContent>
  </SectionMessage>
);

const Examples: ExampleIndex[] = [
  { component: <ExampleIntro />, id: 'link-intro', type: 'content' },
  { id: 'Standalone links', title: 'Standalone links', type: 'section' },
  { id: 'default-link' },
  { id: 'leading-icon-link' },
  { id: 'trailing-icon-link' },
  { id: 'alternate-link' },
  { id: 'new-tab-link' },
  { id: 'disabled-link' },
  { id: 'Inline links', title: 'Inline links', type: 'section' },
  { id: 'inline-link' },
  {
    id: 'without-underline-link',
  },
  { id: 'Links coded as buttons', title: 'Links coded as buttons', type: 'section' },
  { id: 'custom-tag-link' },
  { id: 'disabled-custom-tag-link' },
  { id: 'Custom examples', title: 'Custom examples', type: 'section' },
  {
    id: 'react-router-link',
  },
  {
    id: 'custom-typography-link',
  },
];

export default Examples;
