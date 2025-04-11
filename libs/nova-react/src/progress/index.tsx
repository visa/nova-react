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
import { ForwardedRef } from 'react';
import ProgressCircular, { ProgressCircularProperties } from '../progress-circular';
import ProgressLinear, { ProgressLinearProperties } from '../progress-linear';
import forwardRef from '../types';

export type ProgressProperties =
  | ({ progressType: 'circular' } & ProgressCircularProperties)
  | ({ progressType?: 'linear' } & ProgressLinearProperties);

const Progress = <HTMLElementType,>(
  { progressType = 'linear', ...remainingProps }: ProgressProperties,
  ref: ForwardedRef<HTMLElementType>
) =>
  progressType === 'circular' ? (
    <ProgressCircular ref={ref} {...remainingProps} />
  ) : (
    <ProgressLinear ref={ref} {...(remainingProps as ProgressLinearProperties)} />
  );

/**
 * Visual representation of the status of a system process.
 * @deprecated This component is deprecated and will be removed in the next major version. Please use the ProgressCircular and ProgressLinear components.
 * @docs {@link https://design.visa.com/react/components/progress | See Docs}
 * @related progress-circular, progress-label, progress-linear
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<ProgressProperties, HTMLElement | HTMLProgressElement>(Progress);

Progress.defaultProps = {
  indeterminate: false,
  paused: false,
  progressSize: 'large',
  progressType: 'linear',
};

Progress.displayName = 'Progress';
