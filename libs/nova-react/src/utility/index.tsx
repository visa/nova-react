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
import { ElementType, ForwardedRef, ReactElement, ReactNode, cloneElement } from 'react';
import { DefaultProperties, default as forwardRef } from '../types';
import UtilityFragment, { UtilityFragmentProperties } from '../utility-fragment';

export type UtilityProperties = {
  /** @ignore */
  children?: ReactNode;
  /** @ignore */
  className?: string;
} & (
  | {
      /** Cloned Element (not compatible with tag property) */
      element?: never;
      /** Tag (not compatible with element property) */
      tag?: ElementType;
    }
  | {
      /** Cloned Element (not compatible with tag property) */
      element?: ReactElement;
      /** Tag (not compatible with element property) */
      tag?: never;
    }
) &
  Omit<UtilityFragmentProperties, 'children'>;

const Utility = <HTMLElementType,>(
  { children, element, tag: Tag = 'div', ...remainingProps }: UtilityProperties,
  ref: ForwardedRef<HTMLElementType>
) => {
  return (
    <UtilityFragment {...remainingProps}>
      {element ? (
        cloneElement<UtilityProperties & DefaultProperties<HTMLElementType>>(
          element,
          {
            ref,
          },
          [element.props.children, children]
        )
      ) : (
        <Tag ref={ref}>{children}</Tag>
      )}
    </UtilityFragment>
  );
};

/**
 * Component used to create a div, by default, with the correct Nova utility style classes applied.
 * @docs {@link https://design.visa.com/react/utilities/api | See Docs}
 * @related utility-fragment
 * @vgar 2.1
 * @wcag 2.1
 */
export default forwardRef<UtilityProperties, HTMLDivElement>(Utility);

Utility.defaultProps = {
  tag: 'div',
};

Utility.displayName = 'Utility';
