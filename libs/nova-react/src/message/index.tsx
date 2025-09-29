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
import { ComponentPropsWithRef, ElementType } from 'react';

const CSS_PREFIX = 'v-message';

export type MessageType = 'error' | 'success' | 'warning' | 'subtle';

export type MessageProperties<ET extends ElementType = 'div',> = {
  /** Message Type */
  messageType?: MessageType;
  /** Tag of Component */
  tag?: ElementType;
} & ComponentPropsWithRef<ET>;

/**
 * Container for message elements. This is the base element for banner, flag, and section message.
 * @docs {@link https://design.visa.com/react/components | See Docs}
 * @related banner, flag, message-close-button, message-content, section-message
 * @vgar TODO
 * @wcag TODO
 */
const Message = <ET extends ElementType = 'div',>(
  { className, messageType, tag: Tag = 'div', ...remainingProps }: MessageProperties<ET>,
) => (
  <Tag
    className={cn(CSS_PREFIX, messageType && `${CSS_PREFIX}-${messageType}`, className)}
    {...remainingProps}
  />
);
export default Message;

Message.defaultProps = {
  tag: 'div',
};

Message.displayName = 'Message';
