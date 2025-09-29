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

const CSS_PREFIX = 'v-progress';

export type ProgressLinearProperties<ET extends ElementType = 'progress',> = {
  /** Is Completed */
  completed?: boolean;
  /** Is Error State */
  invalid?: boolean;
  /** Is Paused */
  paused?: boolean;
  /** Tag of Component */
  tag?: ElementType;
} & ComponentPropsWithRef<ET>;

/**
 * Linear indicator used to show the progress of a task or process.
 * @docs {@link https://design.visa.com/react/components/progress | See Docs}
 * @related progress-label
 * @vgar TODO
 * @wcag TODO
 */
const ProgressLinear = <ET extends ElementType = 'progress',>(
  {
    className,
    completed,
    invalid,
    paused = false,
    style,
    tag: Tag = 'progress',
    ...remainingProps
  }: ProgressLinearProperties<ET>,
) => (
  <Tag
    className={cn(
      CSS_PREFIX,
      `${CSS_PREFIX}-bar`,
      invalid && `${CSS_PREFIX}-error`,
      completed && `${CSS_PREFIX}-complete`,
      className
    )}
    style={{ animationPlayState: paused ? 'paused' : 'running', ...style }}
    {...remainingProps}
  />
);

export default ProgressLinear;

ProgressLinear.defaultProps = {
  tag: 'progress',
};

ProgressLinear.displayName = 'ProgressLinear';
