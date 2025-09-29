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

const CSS_PREFIX = 'v-tooltip';

export type TooltipProperties<ET extends ElementType = 'span',> = {
  /** CSS Class Name */
  className?: string;
  /** Tag of Component */
  tag?: ElementType;
} & ComponentPropsWithRef<ET>;

/**
 * Short message communicating the function or context of a control or object.
 * @docs {@link https://design.visa.com/react/components/tooltip | See Docs}
 * @vgar TODO
 * @wcag TODO
 */
const Tooltip = <ET extends ElementType = 'span',>(
  { className, tag: Tag = 'span', ...remainingProps }: TooltipProperties<ET>,
) => <Tag className={cn(CSS_PREFIX, 'v-surface', className)} {...remainingProps} />;

export default Tooltip;

Tooltip.defaultProps = {
  tag: 'span',
};

Tooltip.displayName = 'Tooltip';
