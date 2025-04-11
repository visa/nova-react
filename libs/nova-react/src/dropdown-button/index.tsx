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
import Button, { ButtonProperties } from '../button';
import forwardRef from '../types';

const CSS_PREFIX = 'v-dropdown';

export type DropdownButtonProperties = ButtonProperties;

const DropdownButton = <HTMLElementType,>(
  { className, ...remainingProps }: DropdownButtonProperties,
  ref: ForwardedRef<HTMLElementType>
) => <Button<HTMLElementType> ref={ref} className={cn(CSS_PREFIX, className)} {...remainingProps} />;

/**
 * Button used to hide or show the dropdown menu.
 * @docs {@link https://design.visa.com/react/components/dropdown-menu | See Docs}
 */
export default forwardRef<DropdownButtonProperties, HTMLButtonElement>(DropdownButton);

DropdownButton.displayName = 'DropdownButton';
