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

const CSS_PREFIX = 'v-banner';

export type BannerProperties = {
  /** @ignore */
  className?: string;
  /** Message Type */
  messageType?: MessageProperties['messageType'];
} & Omit<MessageProperties, 'messageType'>;

const Banner = <HTMLElementType,>(
  { className, ...remainingProps }: BannerProperties,
  ref: ForwardedRef<HTMLElementType>
) => <Message className={cn(CSS_PREFIX, className)} ref={ref} {...remainingProps} />;

/**
 * Messages indicating the global status of an application or website.
 * @docs {@link https://design.visa.com/react/components/banner | See Docs}
 * @related banner-close-button, message-content, message-icon
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<BannerProperties, HTMLDivElement>(Banner);

Banner.displayName = 'Banner';
