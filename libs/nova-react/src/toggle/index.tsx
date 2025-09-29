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
import { ComponentPropsWithRef, ElementType } from 'react';

const CSS_PREFIX = 'v-toggle';

export type ToggleProperties <ET extends ElementType = 'label',>= {
  /** Icons only toggle button */
  iconOnly?: boolean;
  /** Tag of Component */
  tag?: ElementType;
} & ComponentPropsWithRef<ET>;

/**
 * Selection element that allows users to switch between states or views.
 * @docs {@link https://design.visa.com/react/components/toggle-button | See Docs}
 * @related toggle-container
 * @vgar TODO
 * @wcag TODO
 */
const Toggle = <ET extends ElementType = 'label',>(
  { className, iconOnly, tag: Tag = 'label', ...remainingProps }: ToggleProperties<ET>,
) => <Tag className={cn(CSS_PREFIX, iconOnly && `${CSS_PREFIX}-icon`, className)} {...remainingProps} />;

export default Toggle;

Toggle.defaultProps = {
  tag: 'label',
};

Toggle.displayName = 'Toggle';
