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

export const Examples: ExampleIndex[] = [
  {
    component: (
      <SectionMessage messageType="warning">
        <SectionMessageIcon />
        <SectionMessageContent>
          <Typography className="v-mb-8">Badge number has moved to badge</Typography>
          <VLink element={<Link to={Paths.documentationPage('components', 'badge')} />}>See badge</VLink>
        </SectionMessageContent>
      </SectionMessage>
    ),
    id: 'badge-number-disclosure',
    type: 'content',
  },
];

export default Examples;
