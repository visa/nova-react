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

const CSS_PREFIX = 'v-pagination';

export type PaginationProperties<ET extends ElementType = 'ul',> = {
  /** Tag of Component */
  tag?: ElementType;
} & ComponentPropsWithRef<ET>;

/**
 * Set of links used to navigate content split across multiple pages.
 * @docs {@link https://design.visa.com/react/components/pagination | See Docs}
 * @vgar TODO
 * @wcag TODO
 * @related pagination-overflow, use-pagination
 */
const Pagination = <ET extends ElementType = 'ul',>(
  { className, tag: Tag = 'ul', ...remainingProps }: PaginationProperties<ET>,
) => <Tag className={cn(CSS_PREFIX, className)} {...remainingProps} />;

export default Pagination;

Pagination.defaultProps = {
  tag: 'ul',
};

Pagination.displayName = 'Pagination';
