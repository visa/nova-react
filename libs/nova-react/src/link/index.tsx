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
import { ElementType, ForwardedRef, HTMLAttributes, ReactElement, cloneElement } from 'react';
import forwardRef from '../types';

const CSS_PREFIX = 'v-link';

export type LinkProperties = {
  /** Alternate color scheme */
  alternate?: boolean;
  /** @ignore */
  className?: string;
  /** Disabled */
  disabled?: HTMLAttributes<HTMLElement>['aria-disabled'];
  /** No Underline */
  noUnderline?: boolean;
  /** Skip Link */
  skipLink?: boolean;
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
);

const Link = <HTMLElementType,>(
  { alternate, className, disabled, element, noUnderline, skipLink, tag: Tag = 'a', ...remainingProps }: LinkProperties,
  ref: ForwardedRef<HTMLElementType>
) => {
  const classNames = cn(
    CSS_PREFIX,
    alternate && 'v-alternate',
    skipLink && 'v-skip-link',
    noUnderline && `${CSS_PREFIX}-no-underline`,
    element?.props?.className,
    className
  );
  return !element ? (
    <Tag aria-disabled={disabled} className={classNames} ref={ref} {...remainingProps} />
  ) : (
    cloneElement(element, {
      'aria-disabled': disabled,
      className: classNames,
      ref,
      ...remainingProps,
    })
  );
};
/**
 * Text-based navigation elements that directs users to another destination.
 * @docs {@link https://design.visa.com/react/components/link | See Docs}
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<LinkProperties, HTMLAnchorElement>(Link);

Link.defaultProps = {
  tag: 'a',
};

Link.displayName = 'Link';
