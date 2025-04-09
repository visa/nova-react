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
import { ElementType, ForwardedRef } from 'react';
import forwardRef from '../types';
import cn from 'clsx';

const CSS_PREFIX = 'v-dropdown-menu v-surface';

export type DropdownMenuProperties = {
  /** @ignore */
  className?: string;
  /** Scroll */
  tag?: ElementType;
};

const DropdownMenu = <HTMLElementType,>(
  { className, tag: Tag = 'div', ...remainingProps }: DropdownMenuProperties,
  ref: ForwardedRef<HTMLElementType>
) => <Tag className={cn(CSS_PREFIX, className)} ref={ref} {...remainingProps} />;

/**
 * Interactive element enabling users to select a single option from a list.
 * @docs {@link https://design.visa.com/react/components/dropdown-menu | See Docs}
 * @related dropdown-button, dropdown-container
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<DropdownMenuProperties, HTMLElement>(DropdownMenu);

DropdownMenu.defaultProps = {
  tag: 'div',
};

DropdownMenu.displayName = 'DropdownMenu';
