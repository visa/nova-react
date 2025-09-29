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

const CSS_PREFIX = 'v-pagination-overflow';

export type PaginationOverflowProperties<ET extends ElementType = 'li',> = {

  /** Tag of Component */
  tag?: ElementType;
} & ComponentPropsWithRef<ET>;

/**
 * Element to show hidden elements within pagination component, usually used with ellipsis icon.
 * @docs {@link https://design.visa.com/react/components/pagination | See Docs}
 */
const PaginationOverflow = <ET extends ElementType = 'li',>(
  { className, tag: Tag = 'li', ...remainingProps }: PaginationOverflowProperties<ET>,
) => <Tag className={cn(CSS_PREFIX, className)} {...remainingProps} />;

export default PaginationOverflow;

PaginationOverflow.defaultProps = {
  tag: 'li',
};

PaginationOverflow.displayName = 'PaginationOverflow';
