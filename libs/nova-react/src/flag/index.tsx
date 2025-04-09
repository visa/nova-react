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
import { ForwardedRef } from 'react';
import Message, { MessageProperties } from '../message';
import forwardRef from '../types';

const CSS_PREFIX = 'v-flag';

export type FlagProperties = MessageProperties;

const Flag = <HTMLElementType,>(
  { className, ...remainingProps }: FlagProperties,
  ref: ForwardedRef<HTMLElementType>
) => <Message<HTMLElementType> className={cn(CSS_PREFIX, className)} ref={ref} {...remainingProps} />;

/**
 * Messages that provide low-priority updates about a process or event
 * @docs {@link https://design.visa.com/react/components/flag | See Docs}
 * @related flag-close-button, message-content, message-icon
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<FlagProperties, HTMLDivElement>(Flag);

Flag.displayName = 'Flag';
