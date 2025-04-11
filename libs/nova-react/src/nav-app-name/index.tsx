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
import { ElementType, ForwardedRef } from 'react';
import forwardRef from '../types';

const CSS_PREFIX = 'v-nav-app-name';

export type NavAppNameProperties = {
  /** @ignore */
  className?: string;
  /** Tag of Component */
  tag?: ElementType;
};

const NavAppName = <HTMLElementType,>(
  { className, tag: Tag = 'div', ...remainingProps }: NavAppNameProperties,
  ref: ForwardedRef<HTMLElementType>
) => <Tag className={cn(CSS_PREFIX, className)} ref={ref} {...remainingProps} />;

/**
 * Containing element for app name styles within a Nav.
 * @docs {@link https://design.visa.com/react/components/horizontal-navigation | See Docs}
 */
export default forwardRef<NavAppNameProperties, HTMLDivElement>(NavAppName);

NavAppName.defaultProps = {
  tag: 'div',
};

NavAppName.displayName = 'NavAppName';
