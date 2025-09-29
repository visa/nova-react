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
import { ElementType, ReactElement, cloneElement } from 'react';
import UtilityFragment, { UtilityFragmentProperties } from '../utility-fragment';

export type UtilityCustomProps<ET extends ElementType = 'div',> = Omit<UtilityFragmentProperties<ET>, ''>;
export type UtilityProperties<ET extends ElementType = 'div',> = UtilityCustomProps<ET> & ({
  /** Cloned Element (not compatible with tag property) */
  element?: never;
  /** Tag (not compatible with element property) */
  tag?: ElementType;
}
  | {
    /** Cloned Element (not compatible with tag property) */
    element?: ReactElement<UtilityCustomProps<ET>>;
    /** Tag (not compatible with element property) */
    tag?: never;
  });

/**
 * Component used to create a div, by default, with the correct Nova utility style classes applied.
 * @docs {@link https://design.visa.com/react/utilities/api | See Docs}
 * @related utility-fragment
 * @vgar 2.1
 * @wcag 2.1
 */
const Utility = <ET extends ElementType = 'div',>(
  { children, className, element, tag: Tag = 'div', ...remainingProps }: UtilityProperties<ET>,
) => {
  return (
    <UtilityFragment {...remainingProps}>
      {element ? (
        cloneElement<UtilityProperties>(element, {
          className: cn(className, element.props.className),
        },
          [element.props.children, children]
        )
      ) : (
        <Tag className={className}>{children}</Tag>
      )}
    </UtilityFragment>
  );
};

export default Utility;

Utility.defaultProps = {
  tag: 'div',
};

Utility.displayName = 'Utility';
