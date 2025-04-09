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
import { ForwardedRef, ReactElement, cloneElement } from 'react';
import forwardRef, { DefaultProperties } from '../types';

const CSS_PREFIX = 'v-tab-suffix';

export type TabSuffixProperties = {
  /** @ignore */
  className?: string;
} & (
  | {
      /** Child element that the styles are applies to. Only allows for single child element. (not compatible with element property) */
      children: ReactElement;
      /** Cloned Element (not compatible with children) */
      element?: never;
    }
  | {
      /** Child element that the styles are applies to. Only allows for single child element. (not compatible with element property) */
      children?: never;
      /** Cloned Element (not compatible with children) */
      element: ReactElement;
    }
);

const TabSuffix = <HTMLElementType,>(
  { children, className, element, ...remainingProps }: TabSuffixProperties,
  ref: ForwardedRef<HTMLElementType>
) =>
  cloneElement<TabSuffixProperties & DefaultProperties<HTMLElementType>>(children || element, {
    className: cn(CSS_PREFIX, className, children?.props.className, element?.props.className),
    ref,
    ...remainingProps,
  });

/**
 * Utility class for positioning and styling elements at the end of tab components.
 * @docs {@link https://design.visa.com/react/components/tabs | See Docs}
 */
export default forwardRef<TabSuffixProperties, HTMLDivElement>(TabSuffix);

TabSuffix.displayName = 'TabSuffix';
