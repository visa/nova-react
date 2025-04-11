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

const CSS_PREFIX = 'v-tab';

export type TabProperties = {
  /** @ignore */
  className?: string;
  /** section title */
  sectionTitle?: boolean;
  /** Tag of Component */
  tag?: ElementType;
};

const Tab = <HTMLElementType,>(
  { className, sectionTitle, tag: Tag = 'li', ...remainingProps }: TabProperties,
  ref: ForwardedRef<HTMLElementType>
) => (
  <Tag
    className={cn(CSS_PREFIX, sectionTitle && `${CSS_PREFIX}-section-title`, className)}
    ref={ref}
    {...remainingProps}
  />
);

/**
 * Singular tab component to be used in a tab group.
 * @docs {@link https://design.visa.com/react/components/tabs | See Docs}
 */
export default forwardRef<TabProperties, HTMLLIElement>(Tab);

Tab.defaultProps = {
  tag: 'li',
};

Tab.displayName = 'Tab';
