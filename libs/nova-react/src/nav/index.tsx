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
import { ElementType, ForwardedRef } from 'react';
import forwardRef from '../types';

const CSS_PREFIX = 'v-nav';

export type NavProperties = {
  /** Alternate */
  alternate?: boolean;
  /** @ignore */
  className?: string;
  /** Drawer */
  drawer?: boolean;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Tag of Component */
  tag?: ElementType;
};

const Nav = <HTMLElementType,>(
  { alternate, className, drawer, orientation, tag: Tag = 'nav', ...remainingProps }: NavProperties,
  ref: ForwardedRef<HTMLElementType>
) => (
  <Tag
    className={cn(
      CSS_PREFIX,
      alternate && `v-alternate`,
      orientation && `${CSS_PREFIX}-${orientation}`,
      drawer && `${CSS_PREFIX}-drawer`,
      className
    )}
    ref={ref}
    {...remainingProps}
  />
);

/**
 * Menu or panel at the top or next to page content that links to important pages or features.
 * @docs {@link https://design.visa.com/react/components/nav | See Docs}
 * @vgar TODO
 * @wcag TODO
 * @related tab, tabs
 */
export default forwardRef<NavProperties, HTMLElement>(Nav);

Nav.defaultProps = {
  tag: 'nav',
};

Nav.displayName = 'Nav';
