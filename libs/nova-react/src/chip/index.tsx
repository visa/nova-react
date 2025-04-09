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

const CSS_PREFIX = 'v-chip';

export type ChipProperties = {
  /** Chip Size */
  chipSize?: 'compact';
  /** Chip Type */
  chipType?: 'selection';
  /** @ignore */
  className?: string;
  /** Tag of Component */
  tag?: ElementType;
};

const Chip = <HTMLElementType,>(
  { className, chipType, chipSize, tag: Tag = 'div', ...remainingProps }: ChipProperties,
  ref: ForwardedRef<HTMLElementType>
) => (
  <Tag
    className={cn(
      CSS_PREFIX,
      chipSize && `${CSS_PREFIX}-${chipSize}`,
      chipType && `${CSS_PREFIX}-${chipType}`,
      chipType && chipType === 'selection' ? 'v-label v-gap-6' : 'v-flex',
      className
    )}
    ref={ref}
    {...remainingProps}
  />
);

/**
 * Compact elements used to filter content or display user input.
 * @docs {@link https://design.visa.com/react/components/chip | See Docs}
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<ChipProperties, HTMLDivElement>(Chip);

Chip.defaultProps = {
  tag: 'div',
};

Chip.displayName = 'Chip';
