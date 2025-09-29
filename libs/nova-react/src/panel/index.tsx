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

const CSS_PREFIX = 'v-panel';

export type PanelProperties<ET extends ElementType = 'div',> = {

  /** Expandable */
  expandable?: boolean;
  /** Responsive */
  responsive?: boolean;
  /** Adds darker backdrop for modal panels  */
  skrim?: boolean;
  /** Tag of Component */
  tag?: ElementType;
} & ComponentPropsWithRef<ET>;

/**
 * Collapsible or persistent containers used to present supplementary information.
 * @docs {@link https://design.visa.com/react/components/panel | See Docs}
 * @related panel-body, panel-content, panel-header, panel-toggle, use-focus-trap
 * @vgar TODO
 * @wcag TODO
 */
const Panel = <ET extends ElementType = 'div',>(
  { className, expandable, responsive, skrim, tag: Tag = 'div', ...remainingProps }: PanelProperties<ET>,
) => (
  <Tag
    className={cn(
      CSS_PREFIX,
      expandable && `${CSS_PREFIX}-expandable`,
      responsive && `${CSS_PREFIX}-responsive`,
      skrim && `${CSS_PREFIX}-skrim`,
      className
    )}
    {...remainingProps}
  />
);

export default Panel;

Panel.defaultProps = {
  tag: 'div',
};

Panel.displayName = 'Panel';
