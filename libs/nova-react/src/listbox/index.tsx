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

const CSS_PREFIX = 'v-listbox';

export type ListboxProperties = {
  /** @ignore */
  className?: string;
  /** Multiselect */
  multiselect?: boolean;
  /** Scroll */
  scroll?: boolean;
  /** Tag of Component */
  tag?: ElementType;
};

const Listbox = <HTMLElementType,>(
  { className, multiselect, scroll, tag: Tag = 'ul', ...remainingProps }: ListboxProperties,
  ref: ForwardedRef<HTMLElementType>
) => (
  <Tag
    className={cn(CSS_PREFIX, multiselect && `${CSS_PREFIX}-multiselect`, scroll && `${CSS_PREFIX}-scroll`, className)}
    ref={ref}
    {...remainingProps}
  />
);

/**
 * Container that displays a list of items available for selection.
 * @docs {@link https://design.visa.com/react/components/listbox | See Docs}
 * @related listbox-container, listbox-item, use-listbox
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<ListboxProperties, HTMLElement>(Listbox);

Listbox.defaultProps = {
  tag: 'ul',
};

Listbox.displayName = 'Listbox';
