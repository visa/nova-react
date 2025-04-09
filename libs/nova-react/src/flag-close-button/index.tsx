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
import MessageCloseButton, { MessageCloseButtonProperties } from '../message-close-button';
import forwardRef from '../types';

export type FlagCloseButtonProperties = MessageCloseButtonProperties;

const FlagCloseButton = <HTMLElementType,>(
  { className, ...remainingProps }: FlagCloseButtonProperties,
  ref: ForwardedRef<HTMLElementType>
) => <MessageCloseButton<HTMLElementType> className={cn('-v-mt-8 -v-mr-8', className)} ref={ref} {...remainingProps} />;

/**
 * Close button to dismiss a flag message.
 * @docs {@link https://design.visa.com/react/components/flag | See Docs}
 */
export default forwardRef<FlagCloseButtonProperties, HTMLButtonElement>(FlagCloseButton);

FlagCloseButton.displayName = 'FlagCloseButton';
