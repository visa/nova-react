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
import { ComponentPropsWithRef, CSSProperties, ElementType } from 'react';

const CSS_PREFIX = 'v-progress';
const SIZES = {
  large: 72,
  small: 48,
};

export type ProgressCircularProperties<ET extends ElementType = 'div',> = {
  /** If the Progress is Indeterminate Progress */
  indeterminate?: boolean;
  /** Is Paused */
  paused?: boolean;
  /** Width of the Circular Progress */
  progressSize?: number | keyof typeof SIZES;
  /** Percent Complete */
  value?: HTMLProgressElement['value'];
} & Omit<ComponentPropsWithRef<ET>, ''>;

/**
 * Circular indicator used to show the progress of a task or process.
 * @docs {@link https://design.visa.com/react/components/progress | See Docs}
 * @related progress-label
 * @vgar TODO
 * @wcag TODO
 */
const ProgressCircular = <ET extends ElementType = 'div',>(
  {
    className,
    children,
    indeterminate = false,
    paused = false,
    progressSize = 'large',
    style,
    value,
    ...remainingProps
  }: ProgressCircularProperties<ET>,
) => {
  const width: number = typeof progressSize === 'string' ? SIZES[progressSize] : progressSize;
  const strokeDasharray = 2 * Math.PI * (width / 2 - 2);

  return (
    <div
      className={cn(
        CSS_PREFIX,
        `${CSS_PREFIX}-circular`,
        progressSize === 'small' && `${CSS_PREFIX}-circular-small`,
        indeterminate && `${CSS_PREFIX}-indeterminate`,
        className
      )}
      role={!indeterminate ? 'progressbar' : undefined}
      style={
        {
          animationPlayState: paused ? 'paused' : 'running',
          '--v-progress-circular-size': `${width}px`,
          ...style,
        } as CSSProperties
      }
      {...remainingProps}
    >
      <svg className={`${CSS_PREFIX}-circular-track`}>
        <circle
          className={`${CSS_PREFIX}-circular-background`}
          style={indeterminate ? { strokeDasharray: `${strokeDasharray - strokeDasharray / 5}` } : undefined}
        />
        <circle
          className={`${CSS_PREFIX}-circular-bar`}
          style={
            {
              strokeDasharray: indeterminate
                ? `${strokeDasharray - strokeDasharray / 5}`
                : `${(strokeDasharray * (value || 0)) / 100}, ${strokeDasharray}`,
              strokeDashoffset: indeterminate ? null : '0',
            } as CSSProperties
          }
        />
      </svg>
      {children}
    </div>
  );
};

export default ProgressCircular;

ProgressCircular.displayName = 'ProgressCircular';
