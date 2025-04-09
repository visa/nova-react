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

const CSS_PREFIX = 'v-badge';

export type BadgeProperties = {
  /** Active style */
  active?: boolean;
  /** Type of Badge */
  badgeType?: 'critical' | 'neutral' | 'stable' | 'subtle' | 'warning';
  /** Variant of Badge */
  badgeVariant?: 'number' | 'icon';
  /** @ignore */
  className?: string;
  /** Clear background */
  clear?: boolean;
  /** Tag of Component */
  tag?: ElementType;
};

const Badge = <HTMLElementType,>(
  { active, badgeType, className, clear, tag: Tag = 'div', badgeVariant, ...remainingProps }: BadgeProperties,
  ref: ForwardedRef<HTMLElementType>
) => (
  <Tag
    className={cn(
      CSS_PREFIX,
      active && `${CSS_PREFIX}-active`,
      badgeVariant && `${CSS_PREFIX}-${badgeVariant}`,
      badgeType && `${CSS_PREFIX}-${badgeType}`,
      clear && `${CSS_PREFIX}-clear`,
      badgeVariant === 'number' && `v-typography-label-active`,
      className
    )}
    ref={ref}
    {...remainingProps}
  />
);

/**
 * Visual indicators communicating the status of a component.
 * @docs {@link https://design.visa.com/react/components/badge | See Docs}
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<BadgeProperties, HTMLDivElement>(Badge);

Badge.defaultProps = {
  tag: 'div',
};

Badge.displayName = 'Badge';
