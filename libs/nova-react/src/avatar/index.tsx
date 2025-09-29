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
import cn from 'clsx';
import { ComponentPropsWithRef, ElementType } from 'react';

const CSS_PREFIX = 'v-avatar';

export type AvatarProperties<ET extends ElementType = 'span',> = {

  /** Small Avatar */
  small?: boolean;
  /** Tag of Component */
  tag?: ElementType;
} & ComponentPropsWithRef<ET>;

/**
 * Icons and/or text representing users or entities.
 * @docs {@link https://design.visa.com/react/components/avatar | See Docs}
 * @related tab-suffix
 * @vgar TODO
 * @wcag TODO
 */
const Avatar = <ET extends ElementType = 'button',>(
  { className, small, tag: Tag = 'span', ...remainingProps }: AvatarProperties<ET>,
) => <Tag className={cn(CSS_PREFIX, small && `${CSS_PREFIX}-small`, className)} {...remainingProps} />;

export default Avatar;

Avatar.defaultProps = {
  tag: 'span',
};

Avatar.displayName = 'Avatar';
