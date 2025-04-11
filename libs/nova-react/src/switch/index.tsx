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

const CSS_PREFIX = 'v-switch';

export type SwitchProperties = {
  /** @ignore */
  children?: never;
  /** @ignore */
  className?: string;
  /** Tag of Component */
  tag?: ElementType;
};

const Switch = <HTMLElementType,>(
  { className, tag: Tag = 'input', ...remainingProps }: SwitchProperties,
  ref: ForwardedRef<HTMLElementType>
) => <Tag className={cn(CSS_PREFIX, className)} ref={ref} role="switch" type="checkbox" {...remainingProps} />;

/**
 * Binary control that allows users to toggle between two states, such as on/off.
 * @docs {@link https://design.visa.com/react/components/switch | See Docs}
 * @related switch-label
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<SwitchProperties, HTMLInputElement>(Switch);

Switch.defaultProps = {
  tag: 'input',
};

Switch.displayName = 'Switch';
