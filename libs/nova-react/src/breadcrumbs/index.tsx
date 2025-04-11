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

const CSS_PREFIX = 'v-breadcrumbs';

export type BreadcrumbsProperties = {
  /** @deprecated migrate to native `aria-label` */
  ariaLabel?: string;
  /** @ignore */
  className?: string;
  /** Use Custom Separator */
  customSeparator?: boolean;
  /** Tag of Component */
  tag?: ElementType;
};

const Breadcrumbs = <HTMLElementType,>(
  { ariaLabel = 'Breadcrumb', className, customSeparator, tag: Tag = 'nav', ...remainingProps }: BreadcrumbsProperties,
  ref: ForwardedRef<HTMLElementType>
) => (
  <Tag
    aria-label={ariaLabel}
    className={cn(CSS_PREFIX, customSeparator && `${CSS_PREFIX}-custom`, className)}
    ref={ref}
    {...remainingProps}
  />
);

/**
 * Supplemental navigation indicating the user's location in a site or app.
 * @docs {@link https://design.visa.com/react/components/breadcrumbs | See Docs}
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<BreadcrumbsProperties, HTMLElement>(Breadcrumbs);

Breadcrumbs.defaultProps = {
  ariaLabel: 'Breadcrumb',
  tag: 'nav',
};

Breadcrumbs.displayName = 'Breadcrumbs';
