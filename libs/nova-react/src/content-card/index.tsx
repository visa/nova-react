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
import { ElementType, ForwardedRef } from 'react';
import forwardRef from '../types';

const CSS_PREFIX = 'v-content-card';

export type ContentCardProperties = {
  /** Show bottom border on content card */
  borderBlockEnd?: boolean;
  /** @ignore */
  className?: string;
  /** Card Clickable */
  clickable?: boolean;
  /** Tag of Component */
  tag?: ElementType;
};

const ContentCard = <HTMLElementType,>(
  { borderBlockEnd, className, clickable, tag: Tag = 'div', ...remainingProps }: ContentCardProperties,
  ref: ForwardedRef<HTMLElementType>
) => (
  <Tag
    className={cn(
      CSS_PREFIX,
      borderBlockEnd && `${CSS_PREFIX}-border-block-end`,
      clickable && `${CSS_PREFIX}-clickable`,
      className
    )}
    ref={ref}
    {...remainingProps}
  />
);

/**
 * Compact displays summarizing or directing users to more information.
 * @docs {@link https://design.visa.com/react/components/content-card | See Docs}
 * @related content-card-body, content-card-image, content-card-subtitle, content-card-title
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<ContentCardProperties, HTMLDivElement>(ContentCard);

ContentCard.defaultProps = {
  tag: 'div',
};

ContentCard.displayName = 'ContentCard';
