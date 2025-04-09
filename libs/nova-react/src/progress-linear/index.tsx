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
import { CSSProperties, ElementType, ForwardedRef } from 'react';
import forwardRef from '../types';

const CSS_PREFIX = 'v-progress';

export type ProgressLinearProperties = {
  /** @ignore */
  children?: never;
  /** @ignore */
  className?: string;
  /** Is Completed */
  completed?: boolean;
  /** Is Error State */
  invalid?: boolean;
  /** Is Paused */
  paused?: boolean;
  /** @ignore */
  style?: CSSProperties;
  /** Tag of Component */
  tag?: ElementType;
};

const ProgressLinear = <HTMLElementType,>(
  {
    className,
    completed,
    invalid,
    paused = false,
    style,
    tag: Tag = 'progress',
    ...remainingProps
  }: ProgressLinearProperties,
  ref: ForwardedRef<HTMLElementType>
) => (
  <Tag
    className={cn(
      CSS_PREFIX,
      `${CSS_PREFIX}-bar`,
      invalid && `${CSS_PREFIX}-error`,
      completed && `${CSS_PREFIX}-complete`,
      className
    )}
    ref={ref}
    style={{ animationPlayState: paused ? 'paused' : 'running', ...style }}
    {...remainingProps}
  />
);

/**
 * Linear indicator used to show the progress of a task or process.
 * @docs {@link https://design.visa.com/react/components/progress | See Docs}
 * @related progress-label
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<ProgressLinearProperties, HTMLProgressElement>(ProgressLinear);

ProgressLinear.defaultProps = {
  tag: 'progress',
};

ProgressLinear.displayName = 'ProgressLinear';
