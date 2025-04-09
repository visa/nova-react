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

const CSS_PREFIX = 'v-checkbox';

export type CheckboxProperties = {
  /** @ignore */
  children?: never;
  /** @ignore */
  className?: string;
} & (
  | {
      /** Whether a checkbox is indeterminate state, only allowable on "input" tag types. This should only be set to true if checked is false. */
      indeterminate?: never;
      /** Tag of Component */
      tag: Exclude<ElementType, 'input'>;
    }
  | {
      /** Whether a checkbox is indeterminate state, only allowable on "input" tag types. This should only be set to true if checked is false. */
      indeterminate?: boolean;
      /** Tag of Component */
      tag?: 'input';
    }
);

const Checkbox = <HTMLElementType,>(
  { className, indeterminate, tag: Tag = 'input', ...remainingProps }: CheckboxProperties,
  ref: ForwardedRef<HTMLElementType>
) => (
  <Tag
    className={cn(CSS_PREFIX, className)}
    ref={(el: HTMLElementType) => {
      if (el && Tag === 'input' && indeterminate !== undefined)
        (el as unknown as HTMLInputElement).indeterminate = indeterminate;
      if (ref) typeof ref === 'function' ? ref(el) : (ref.current = el);
    }}
    type={Tag === 'input' ? 'checkbox' : undefined}
    {...remainingProps}
  />
);

/**
 * Interactive element enabling users to select one or more independent options from a group.
 * @docs {@link https://design.visa.com/react/components/checkbox | See Docs}
 * @vgar TODO
 * @wcag TODO
 * @related checkbox-panel
 */
export default forwardRef<CheckboxProperties, HTMLInputElement>(Checkbox);

Checkbox.defaultProps = {
  tag: 'input',
};

Checkbox.displayName = 'Checkbox';
