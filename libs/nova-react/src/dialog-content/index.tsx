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
import MessageContent, { MessageContentProperties } from '../message-content';
import forwardRef from '../types';

export type DialogContentProperties = MessageContentProperties;

const DialogContent = <HTMLElementType,>(
  { className, ...remainingProps }: DialogContentProperties,
  ref: ForwardedRef<HTMLElementType>
) => <MessageContent<HTMLElementType> className={cn('v-pb-2 v-pr-2', className)} ref={ref} {...remainingProps} />;

/**
 * Component used to display content within a dialog.
 * @docs {@link https://design.visa.com/react/components/dialog | See Docs}
 */
export default forwardRef<DialogContentProperties, HTMLDivElement>(DialogContent);

DialogContent.displayName = 'DialogContent';
