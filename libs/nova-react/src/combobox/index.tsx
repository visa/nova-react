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

const CSS_PREFIX = 'v-combobox';

export type ComboboxProperties = {
  /** @ignore */
  className?: string;
  /** Tag of the component */
  tag?: ElementType;
};

const Combobox = <HTMLElementType,>(
  { className, tag: Tag = 'div', ...remainingProps }: ComboboxProperties,
  ref: ForwardedRef<HTMLElementType>
) => <Tag className={cn(CSS_PREFIX, className)} ref={ref} {...remainingProps} />;

/**
 * Dropdown menu enabling users to enter text or select items from a list.
 * @docs {@link https://design.visa.com/react/components/combobox | See Docs}
 * @related dropdown-menu
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<ComboboxProperties, HTMLDivElement>(Combobox);

Combobox.defaultProps = {
  tag: 'div',
};

Combobox.displayName = 'Combobox';
