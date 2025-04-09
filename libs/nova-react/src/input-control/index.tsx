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

const CSS_PREFIX = 'v-input-control';

export type InputControlProperties = {
  /** @ignore */
  className?: string;
  /** Tag of Component */
  tag?: ElementType;
};

const InputControl = <HTMLElementType,>(
  { className, tag: Tag = 'div', ...remainingProps }: InputControlProperties,
  ref: ForwardedRef<HTMLElementType>
) => <Tag className={cn(CSS_PREFIX, className)} ref={ref} {...remainingProps} />;

/**
 * Container for icons controlling form elements, such as a dropdown icon for a select element.
 * @docs {@link https://design.visa.com/react/components/input | See Docs}
 * @related select
 */
export default forwardRef<InputControlProperties, HTMLDivElement>(InputControl);

InputControl.defaultProps = {
  tag: 'div',
};

InputControl.displayName = 'InputControl';
