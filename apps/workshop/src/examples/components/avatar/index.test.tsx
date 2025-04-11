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
import { fireEvent, render, act } from '@testing-library/react';
import { axe } from 'jest-axe';

import metaData from './meta.json';

import { SmallImageAvatar } from './small-image-avatar';
import { SmallInitialsAvatar } from './small-initials-avatar';
import { SmallHorizontalIconAvatar } from './small-horizontal-icon-avatar';
import { SmallVerticalIconAvatar } from './small-vertical-icon-avatar';
import { LargeImageAvatar } from './large-image-avatar';
import { LargeInitialsAvatar } from './large-initials-avatar';
import { LargeIconAvatar } from './large-icon-avatar';
import { FictitiousBrandAvatar } from './fictitious-brand-avatar';
import { AvatarAsButton } from './avatar-as-button';


const examples = [
  { Component: SmallImageAvatar, title: metaData['small-image-avatar'].title },
  { Component: SmallInitialsAvatar, title: metaData['small-initials-avatar'].title },
  { Component: SmallHorizontalIconAvatar, title: metaData['small-horizontal-icon-avatar'].title },
  { Component: SmallVerticalIconAvatar, title: metaData['small-vertical-icon-avatar'].title },
  { Component: LargeImageAvatar, title: metaData['large-image-avatar'].title },
  { Component: LargeInitialsAvatar, title: metaData['large-initials-avatar'].title },
  { Component: LargeIconAvatar, title: metaData['large-icon-avatar'].title },
  { Component: FictitiousBrandAvatar, title: metaData['fictitious-brand-avatar'].title },
  { Component: AvatarAsButton, title: metaData['avatar-as-button'].title },
];

describe('Avatar examples', () => {
  examples.forEach(({ Component, title }) => {
    it(`${title} should render correctly`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });
  });

  describe('small horizontal avatar icon', () => {
    it('should open when clicked', () => {
      const { container } = render(<SmallHorizontalIconAvatar />);
      const avatarButton = container.getElementsByTagName('button')[0]!;
      act(() => {

      fireEvent.click(avatarButton);
      })
      expect(avatarButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('small vertical avatar icon', () => {
    it('should open when clicked', () => {
      const { container } = render(<SmallVerticalIconAvatar />);
      const avatarButton = container.getElementsByTagName('button')[0]!;
      fireEvent.click(avatarButton);
      expect(avatarButton).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
