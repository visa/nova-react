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
import { ComponentPropsWithRef, ElementType, ReactElement, cloneElement } from 'react';

const CSS_PREFIX = 'v-button';

type ButtonCustomProps<ET extends ElementType = 'button',> = {
  /** Alternate color scheme */
  alternate?: boolean;
  /** Size of Button */
  buttonSize?: 'large' | 'small';
  /** Color Scheme of Button */
  colorScheme?: 'secondary' | 'tertiary';
  /** Destructive Button */
  destructive?: boolean;
  /** Icon Button */
  iconButton?: boolean;
  /** Icon Two Button */
  iconTwoColor?: boolean;
  /** Stacked Button */
  stacked?: boolean;
  /** Subtle Button */
  subtle?: boolean;
} & Omit<ComponentPropsWithRef<ET>, ''>;;

export type ButtonProperties<ET extends ElementType = 'button',> = ButtonCustomProps & (
  | {
    /** Cloned Element (not compatible with tag property) */
    element?: never;
    /** Tag (not compatible with element property) */
    tag?: ElementType;
  }
  | {
    /** Cloned Element (not compatible with tag property) */
    element?: ReactElement<ButtonCustomProps<ET>>;
    /** Tag (not compatible with element property) */
    tag?: never;
  }
) & Omit<ComponentPropsWithRef<ET>, ''>;

/**
 * Interactive elements enabling users to take actions within an interface.
 * @docs {@link https://design.visa.com/react/components/button | See Docs}
 * @vgar TODO
 * @wcag TODO
 */
const Button = <ET extends ElementType = 'button',>(
  {
    alternate,
    buttonSize,
    className,
    colorScheme,
    destructive,
    element,
    iconButton,
    iconTwoColor,
    stacked,
    subtle,
    tag: Tag = 'button',
    ...remainingProps
  }: ButtonProperties<ET>,

) => {
  const classNames = cn(
    CSS_PREFIX,
    alternate && 'v-alternate',
    buttonSize && `${CSS_PREFIX}-${buttonSize}`,
    colorScheme && `${CSS_PREFIX}-${colorScheme}`,
    destructive && `${CSS_PREFIX}-destructive`,
    iconButton && `${CSS_PREFIX}-icon`,
    iconTwoColor && 'v-icon-two-color',
    stacked && `${CSS_PREFIX}-stacked`,
    subtle && `${CSS_PREFIX}-subtle`,
    className
  );
  return !element ? (
    <Tag className={classNames} {...remainingProps} />
  ) : (
    cloneElement<ButtonProperties>(element, {
      className: cn(classNames, element.props.className),
      ...remainingProps,
    })
  );
};

export default Button;

Button.defaultProps = {
  tag: 'button',
};

Button.displayName = 'Button';
