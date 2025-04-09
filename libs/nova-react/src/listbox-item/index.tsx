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

const CSS_PREFIX = 'v-listbox-item';

export type ListboxItemProperties = {
  /** @ignore */
  className?: string;
  /** Tag of Component */
  tag?: ElementType;
};

const ListboxItem = <HTMLElementType,>(
  { className, tag: Tag = 'li', ...remainingProps }: ListboxItemProperties,
  ref: ForwardedRef<HTMLElementType>
) => <Tag className={cn(CSS_PREFIX, className)} ref={ref} {...remainingProps} />;

/**
 * Container for elements used inside listbox.
 * @docs {@link https://design.visa.com/react/components/listbox | See Docs}
 */
export default forwardRef<ListboxItemProperties, HTMLLIElement>(ListboxItem);

ListboxItem.defaultProps = {
  tag: 'li',
};

ListboxItem.displayName = 'ListboxItem';
