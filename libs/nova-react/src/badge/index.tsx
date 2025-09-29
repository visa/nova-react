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

const CSS_PREFIX = 'v-badge';

export type BadgeProperties<ET extends ElementType = 'div',> = {
  /** Active style */
  active?: boolean;
  /** Type of Badge */
  badgeType?: 'critical' | 'neutral' | 'stable' | 'subtle' | 'warning';
  /** Variant of Badge */
  badgeVariant?: 'number' | 'icon';

  /** Clear background */
  clear?: boolean;
  /** Tag of Component */
  tag?: ElementType;
} & ComponentPropsWithRef<ET>;

/**
 * Visual indicators communicating the status of a component.
 * @docs {@link https://design.visa.com/react/components/badge | See Docs}
 * @vgar TODO
 * @wcag TODO
 */
const Badge = <ET extends ElementType = 'div',>(
  { active, badgeType, className, clear, tag: Tag = 'div', badgeVariant, ...remainingProps }: BadgeProperties<ET>,
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
    {...remainingProps}
  />
);

export default Badge;

Badge.defaultProps = {
  tag: 'div',
};

Badge.displayName = 'Badge';
