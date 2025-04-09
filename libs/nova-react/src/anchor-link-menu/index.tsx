/**
 *              Copyright (c) 2025 Visa, Inc.
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
import { ElementType, ForwardedRef } from 'react';
import forwardRef from '../types';

const CSS_PREFIX = 'v-anchor-link-menu';

export type AnchorLinkMenuProperties = {
  /** @ignore */
  className?: string;
  /** Tag of Component */
  tag?: ElementType;
};

const AnchorLinkMenu = <HTMLElementType,>(
  { className, tag: Tag = 'aside', ...remainingProps }: AnchorLinkMenuProperties,
  ref: ForwardedRef<HTMLElementType>
) => <Tag className={cn(CSS_PREFIX, className)} ref={ref} {...remainingProps} />;

/**
 * Menu of links that navigate to sections within the current page.
 * @docs {@link https://design.visa.com/react/components/anchor-link-menu | See Docs}
 * @related anchor-link-menu-header
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<AnchorLinkMenuProperties, HTMLElement>(AnchorLinkMenu);

AnchorLinkMenu.defaultProps = {
  tag: 'aside',
};

AnchorLinkMenu.displayName = 'AnchorLinkMenu';
