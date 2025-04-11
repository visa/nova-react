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
import Label, { LabelProperties } from '../label';
import forwardRef from '../types';

const CSS_PREFIX = 'v-switch-label';

export type SwitchLabelProperties = LabelProperties;

const SwitchLabel = <HTMLElementType,>(
  { className, ...remainingProps }: SwitchLabelProperties,
  ref: ForwardedRef<HTMLElementType>
) => <Label<HTMLElementType> className={cn(CSS_PREFIX, className)} ref={ref} {...remainingProps} />;

/**
 * Label to be used with switch component.
 * @docs {@link https://design.visa.com/react/components/switch | See Docs}
 */
export default forwardRef<SwitchLabelProperties, HTMLLabelElement>(SwitchLabel);

SwitchLabel.displayName = 'SwitchLabel';
