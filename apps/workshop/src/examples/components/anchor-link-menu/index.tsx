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

const UniqueLinkNameNote = () => (
  <SectionMessage>
    <SectionMessageIcon />
    <UtilityFragment vFlex vFlexCol vGap={6}>
      <SectionMessageContent>
        <Typography tag="h2" variant="body-2-bold">
          Make sure all links have unique names and destinations.
        </Typography>
        <Typography>The links in the menus below use generic names and all point to the same destination.</Typography>
        <Typography>
          In real-world implementations, all links must have a unique name and destination combination.
        </Typography>
      </SectionMessageContent>
    </UtilityFragment>
  </SectionMessage>
);

const NestedAnchorLinkNote = () => (
  <SectionMessage>
    <SectionMessageIcon />
    <UtilityFragment vFlex vFlexCol vGap={6}>
      <SectionMessageContent>
        <Typography tag="h2" variant="body-2-bold">
          Link names should indicate their level.
        </Typography>
        <Typography>The examples below demonstrate nested menus with generic link names.</Typography>
        <Typography>
          In real-world implementations, be sure to use link names that obviously communicate their nested level.
        </Typography>
      </SectionMessageContent>
    </UtilityFragment>
  </SectionMessage>
);

export const Examples: ExampleIndex[] = [
  { id: 'default-anchor-link-menu-section', title: 'Default anchor link menus', type: 'section' },
  { component: <UniqueLinkNameNote />, id: 'unique-link-name-note', type: 'content' },
  { id: 'default-anchor-link-menu' },
  { id: 'no-title-anchor-link-menu' },
  { component: <NestedAnchorLinkNote />, id: 'nested-anchor-link-note', type: 'content' },
  {
    id: 'nested-anchor-link-menu',
  },
  {
    id: 'direction-rtl-anchor-link-menu',
  },
];

export default Examples;
