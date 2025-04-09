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
import { ForwardedRef } from 'react';
import forwardRef from '../types';

const CSS_PREFIX = 'v-divider';

export type DividerProperties = {
  /** @ignore */
  children?: never;
  /** @ignore */
  className?: string;
  /** Divider Type */
  dividerType?: 'decorative' | 'section';
};

const Divider = <HTMLElementType,>(
  { className, dividerType, ...remainingProps }: DividerProperties,
  ref: ForwardedRef<HTMLElementType>
) => (
  <hr
    aria-hidden={dividerType === 'decorative' ? true : undefined}
    className={cn(CSS_PREFIX, dividerType && `${CSS_PREFIX}-${dividerType}`, className)}
    ref={ref as ForwardedRef<HTMLHRElement>}
    {...remainingProps}
  />
);

/**
 * Visual element used to separate and group information on a page.
 * @docs {@link https://design.visa.com/react/components/divider | See Docs}
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<DividerProperties, HTMLHRElement>(Divider);

Divider.defaultProps = {
  title: 'Separator',
};

Divider.displayName = 'Divider';
