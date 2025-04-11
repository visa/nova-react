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
import Message, { MessageProperties } from '../message';
import forwardRef from '../types';

const CSS_PREFIX = 'v-dialog';

export type DialogProperties = {
  /** @ignore */
  className?: string;
  /** Message Type */
  messageType?: MessageProperties['messageType'];
  /** Tag of Component */
  tag?: ElementType;
};

const Dialog = <HTMLElementType,>(
  { className, messageType, tag = 'dialog', ...remainingProps }: DialogProperties,
  ref: ForwardedRef<HTMLElementType>
) => (
  <Message<HTMLElementType>
    className={cn(CSS_PREFIX, !messageType && `${CSS_PREFIX}-default`, className)}
    messageType={messageType}
    tag={tag}
    ref={ref}
    {...remainingProps}
  />
);

/**
 * Pop-up windows that overlay page content to facilitate user interactions or show important information.
 * @docs {@link https://design.visa.com/react/components/dialog | See Docs}
 * @related dialog-close-button, dialog-header, message-content, message-icon, use-focus-trap
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<DialogProperties, HTMLDialogElement>(Dialog);

Dialog.defaultProps = {
  tag: 'dialog',
};

Dialog.displayName = 'Dialog';
