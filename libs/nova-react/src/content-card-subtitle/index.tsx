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
import forwardRef from '../types';
import Typography, { TypographyProperties } from '../typography';

const CSS_PREFIX = 'v-content-card-subtitle';

export type ContentCardSubtitleProperties = TypographyProperties;

const ContentCardSubtitle = <HTMLElementType,>(
  { className, tag = 'h4', ...remainingProps }: ContentCardSubtitleProperties,
  ref: ForwardedRef<HTMLElementType>
) => <Typography className={cn(CSS_PREFIX, className)} ref={ref} tag={tag} {...remainingProps} />;

/**
 * Subtitle component for content card. Extends typography component.
 * @docs {@link https://design.visa.com/react/components/content-card | See Docs}
 */
export default forwardRef<ContentCardSubtitleProperties, HTMLHeadingElement>(ContentCardSubtitle);

ContentCardSubtitle.defaultProps = {
  tag: 'h4',
};

ContentCardSubtitle.displayName = 'ContentCardSubtitle';
