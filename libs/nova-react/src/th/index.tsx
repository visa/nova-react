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

const CSS_PREFIX = 'v-th';

export type ThProperties <ET extends ElementType = 'th',>= {
  /** Alt */
  alternate?: boolean;

  /** Tag of Component */
  tag?: ElementType;
} & ComponentPropsWithRef<ET>;

/**
 * Table header cell component usually used for titles and column/row descriptions.
 * @docs {@link https://design.visa.com/react/components/table | See Docs}
 */
const Th = <ET extends ElementType = 'th',>(
  { alternate, className, tag: Tag = 'th', ...remainingProps }: ThProperties<ET>,
) => <Tag className={cn(CSS_PREFIX, alternate && `${CSS_PREFIX}-alt`, className)} {...remainingProps} />;

export default Th;

Th.displayName = 'Th';

Th.defaultProps = { tag: 'th' };
