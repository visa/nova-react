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

const CSS_PREFIX = 'v-listbox-container';

export type ListboxContainerProperties<ET extends ElementType = 'div',> = {

  /** Is Disabled */
  disabled?: boolean;
  /** Error */
  error?: boolean;
  /** Tag of Component */
  tag?: ElementType;
} & ComponentPropsWithRef<ET>;

/**
 * Container for listbox component.
 * @docs {@link https://design.visa.com/react/components/listbox | See Docs}
 */
const ListboxContainer = <ET extends ElementType = 'div',>(
  { className, disabled, error, tag: Tag = 'div', ...remainingProps }: ListboxContainerProperties<ET>,
) => (
  <Tag
    className={cn(CSS_PREFIX, disabled && `v-listbox-disabled`, error && `v-listbox-error`, className)}
    {...remainingProps}
  />
);

export default ListboxContainer;

ListboxContainer.defaultProps = {
  tag: 'div',
};

ListboxContainer.displayName = 'ListboxContainer';
