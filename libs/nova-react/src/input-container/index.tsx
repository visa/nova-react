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
import { ForwardedRef } from 'react';
import Surface, { SurfaceProperties } from '../surface';
import forwardRef from '../types';

const CSS_PREFIX = 'v-input-container';

export type InputContainerProperties = SurfaceProperties;

const InputContainer = <HTMLElementType,>(
  { className, ...remainingProps }: InputContainerProperties,
  ref: ForwardedRef<HTMLElementType>
) => <Surface className={cn(CSS_PREFIX, className)} ref={ref} {...remainingProps} />;

/**
 * Container for styling input elements.
 * @docs {@link https://design.visa.com/react/components/input | See Docs}
 * @related combobox, input, select, textarea
 */
export default forwardRef<InputContainerProperties, HTMLDivElement>(InputContainer);

InputContainer.displayName = 'InputContainer';
