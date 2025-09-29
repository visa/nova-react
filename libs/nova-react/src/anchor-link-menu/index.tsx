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

const CSS_PREFIX = 'v-anchor-link-menu';

export type AnchorLinkMenuProperties<ET extends ElementType = 'aside',> = {

  /** Tag of Component */
  tag?: ElementType;
} & ComponentPropsWithRef<ET>;

/**
 * Menu of links that navigate to sections within the current page.
 * @docs {@link https://design.visa.com/react/components/anchor-link-menu | See Docs}
 * @related anchor-link-menu-header
 * @vgar TODO
 * @wcag TODO
 */
const AnchorLinkMenu = <ET extends ElementType = 'aside',>(
  { className, tag: Tag = 'aside', ...remainingProps }: AnchorLinkMenuProperties<ET>,
) => <Tag className={cn(CSS_PREFIX, className)} {...remainingProps} />;

export default AnchorLinkMenu;

AnchorLinkMenu.defaultProps = {
  tag: 'aside',
};

AnchorLinkMenu.displayName = 'AnchorLinkMenu';
