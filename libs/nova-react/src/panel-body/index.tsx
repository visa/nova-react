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

const CSS_PREFIX = 'v-panel-body';

export type PanelBodyProperties = {
  /** @ignore */
  className?: string;
  /** Tag of Component */
  tag?: ElementType;
};

const PanelBody = <HTMLElementType,>(
  { className, tag: Tag = 'div', ...remainingProps }: PanelBodyProperties,
  ref: ForwardedRef<HTMLElementType>
) => <Tag className={cn(CSS_PREFIX, className)} ref={ref} {...remainingProps} />;

/**
 * Container for panel body elements.
 * @docs {@link https://design.visa.com/react/components/panel | See Docs}
 */
export default forwardRef<PanelBodyProperties, HTMLDivElement>(PanelBody);

PanelBody.defaultProps = {
  tag: 'div',
};

PanelBody.displayName = 'PanelBody';
