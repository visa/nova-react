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

const CSS_PREFIX = 'v-typography';
const CSS_PREFIX_COLOR = 'v-typography-color';

export type TypographyProperties = {
  /** @ignore */
  className?: string;
  /** Color variant */
  colorScheme?: 'default' | 'subtle' | 'active' | 'on-active';
  /** Tag of Component */
  tag?: ElementType;
} & (
  | {
      /** @deprecated Migrate to `colorScheme` prop */
      variant?: 'color-default' | 'color-subtle';
    }
  | {
      /** Style variant */
      variant?:
        | 'body-1'
        | 'body-2-bold'
        | 'body-2-link'
        | 'body-2-medium'
        | 'body-2'
        | 'body-3'
        | 'button-large'
        | 'button-medium'
        | 'button-small'
        | 'display-1'
        | 'display-2'
        | 'headline-1'
        | 'headline-2'
        | 'headline-3'
        | 'headline-4'
        | 'label-active'
        | 'label-large-active'
        | 'label-large'
        | 'label-small'
        | 'label'
        | 'overline'
        | 'subtitle-1'
        | 'subtitle-2'
        | 'subtitle-3';
    }
);

const Typography = <HTMLElementType,>(
  { className, colorScheme, tag: Tag = 'p', variant, ...remainingProps }: TypographyProperties,
  ref: ForwardedRef<HTMLElementType>
) => (
  <Tag
    className={
      cn(colorScheme && `${CSS_PREFIX_COLOR}-${colorScheme}`, variant && `${CSS_PREFIX}-${variant}`, className) ||
      undefined
    }
    ref={ref}
    {...remainingProps}
  />
);

/**
 * Styles text in a consistent manner.
 * @docs {@link https://design.visa.com/react/components/typography | See Docs}
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<TypographyProperties, HTMLParagraphElement>(Typography);

Typography.defaultProps = {
  tag: 'p',
};

Typography.displayName = 'Typography';
