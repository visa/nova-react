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

const CSS_PREFIX = 'v-input';

export type InputProperties = {
  /** @ignore */
  children?: never;
  /** @ignore */
  className?: string;
  /** one-time pass-code style */
  otp?: boolean;
  /** Tag of Component */
  tag?: ElementType;
};

const Input = <HTMLElementType,>(
  { className, otp = false, tag: Tag = 'input', ...remainingProps }: InputProperties,
  ref: ForwardedRef<HTMLElementType>
) => <Tag className={cn(CSS_PREFIX, otp && `${CSS_PREFIX}-otp`, className)} ref={ref} {...remainingProps} />;

/**
 * Text fields that enable users to enter free-form content.
 * @docs {@link https://design.visa.com/react/components/input | See Docs}
 * @related input-container, input-control, input-message
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<InputProperties, HTMLInputElement>(Input);

Input.defaultProps = {
  tag: 'input',
};

Input.displayName = 'Input';
