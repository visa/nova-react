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
import { ForwardedRef, ReactElement } from 'react';
import Label, { LabelProperties } from '../label';
import forwardRef from '../types';

const CSS_PREFIX = 'v-checkbox-panel v-action v-action-secondary';
export type CheckboxPanelProperties = LabelProperties;

const CheckboxPanel = <HTMLElementType,>(
  { className, ...remainingProps }: CheckboxPanelProperties,
  ref: ForwardedRef<HTMLElementType>
): ReactElement => (
  <Label<HTMLElementType>
    className={cn(CSS_PREFIX, className)}
    ref={ref as ForwardedRef<HTMLElementType>}
    {...remainingProps}
  />
);

/**
 * Container to be used with checkbox component to add border and background color.
 * @docs {@link https://design.visa.com/react/components/Checkbox | See Docs}
 */
export default forwardRef<CheckboxPanelProperties, HTMLLabelElement>(CheckboxPanel);

CheckboxPanel.displayName = 'CheckboxPanel';
