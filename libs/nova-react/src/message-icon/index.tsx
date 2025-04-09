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
import { VisaErrorLow, VisaInformationLow, VisaSuccessLow, VisaWarningLow, VisaIdeaLow } from '@visa/nova-icons-react';
import cn from 'clsx';
import { ForwardedRef, ReactElement, cloneElement } from 'react';
import { MessageType, useMessage } from '../message';
import { DefaultProperties, default as forwardRef } from '../types';

const CSS_PREFIX = 'v-message-icon';

export type MessageIconProperties = {
  /** @ignore */
  className?: string;
  /** Cloned Element */
  element?: ReactElement | null;
};

const messageIcons: Record<MessageType | '', ReactElement | undefined> = {
  error: <VisaErrorLow aria-hidden="false" aria-label="Error" />,
  success: <VisaSuccessLow aria-hidden="false" aria-label="Success" />,
  warning: <VisaWarningLow aria-hidden="false" aria-label="Warning" />,
  subtle: <VisaIdeaLow />,
  '': undefined,
};

const MessageIcon = <HTMLElementType,>(
  { className, element = null, ...remainingProps }: MessageIconProperties,
  ref: ForwardedRef<HTMLElementType>
) => {
  const { messageType } = useMessage();

  // If element is equal to null or undefined
  // Infer icon element from message type
  const inferredTag = element
    ? element
    : messageIcons[messageType] || <VisaInformationLow aria-hidden="false" aria-label="Information" />;

  return cloneElement<MessageIconProperties & DefaultProperties<HTMLElementType>>(inferredTag, {
    className: cn(CSS_PREFIX, className, element?.props?.className),
    ref,
    ...remainingProps,
  });
};

/**
 * Icon to display within message content.
 */
export default forwardRef<MessageIconProperties, SVGSVGElement>(MessageIcon);

MessageIcon.defaultProps = {
  element: null,
};

MessageIcon.displayName = 'MessageIcon';
