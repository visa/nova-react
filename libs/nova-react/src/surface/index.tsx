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

const CSS_PREFIX = 'v-surface';

export type SurfaceProperties = {
  /** @ignore */
  className?: string;
  /** Type of Surface */
  surfaceType?: 'alternate';
  /** Tag of Component */
  tag?: ElementType;
};

const Surface = <HTMLElementType,>(
  { className, surfaceType, tag: Tag = 'div', ...remainingProps }: SurfaceProperties,
  ref: ForwardedRef<HTMLElementType>
) => <Tag className={cn(CSS_PREFIX, surfaceType && `v-${surfaceType}`, className)} ref={ref} {...remainingProps} />;

/**
 * Styles container to be used for alternate backgrounds.
 * @docs {@link https://design.visa.com/react/components/surface | See Docs}
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<SurfaceProperties, HTMLDivElement>(Surface);

Surface.defaultProps = {
  tag: 'div',
};

Surface.displayName = 'Surface';
