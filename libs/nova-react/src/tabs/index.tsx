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

const CSS_PREFIX = 'v-tabs';

export type TabsProperties = {
  /** @ignore */
  className?: string;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Stacked */
  stacked?: boolean;
  /** Tag of Component */
  tag?: ElementType;
};

const Tabs = <HTMLElementType,>(
  { className, orientation = 'horizontal', stacked, tag: Tag = 'ul', ...remainingProps }: TabsProperties,
  ref: ForwardedRef<HTMLElementType>
) => (
  <Tag
    className={cn(
      CSS_PREFIX,
      orientation && `${CSS_PREFIX}-${orientation}`,
      stacked && `${CSS_PREFIX}-stacked`,
      className
    )}
    ref={ref}
    {...remainingProps}
  />
);

/**
 * Organizational element that separates content and allows users to switch between views.
 * @docs {@link https://design.visa.com/react/components/tabs | See Docs}
 * @related tab, tab-suffix, use-tabs
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<TabsProperties, HTMLUListElement>(Tabs);

Tabs.defaultProps = {
  orientation: 'horizontal',
  tag: 'ul',
};

Tabs.displayName = 'Tabs';
