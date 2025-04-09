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
import { ForwardedRef } from 'react';
import Badge, { BadgeProperties } from '../badge';
import forwardRef from '../types';

export type BadgeNumberProperties = BadgeProperties;

const BadgeNumber = <HTMLElementType,>(
  { tag, ...remainingProps }: BadgeNumberProperties,
  ref: ForwardedRef<HTMLElementType>
) => <Badge badgeVariant="number" ref={ref} tag={tag} {...remainingProps} />;

/**
 * Element to contain a number to display as a badge. Usually display on top of another element.
 * @deprecated This component is deprecated and will be removed in the next major version. Please use the Badge component with the badgeVariant prop set to 'number' instead.
 * @docs {@link https://design.visa.com/react/components/badge-number | See Docs}
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<BadgeNumberProperties, HTMLDivElement>(BadgeNumber);

BadgeNumber.displayName = 'BadgeNumber';
