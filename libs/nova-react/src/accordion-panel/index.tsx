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

const CSS_PREFIX = 'v-accordion-panel';

export type AccordionPanelProperties<ET extends ElementType = 'div',> = {

  /** Tag of Component */
  tag?: ElementType;
} & ComponentPropsWithRef<ET>;

/**
 * Component containing the content of the accordion.
 * @docs {@link https://design.visa.com/react/components/accordion | See Docs}
 */
const AccordionPanel = <ET extends ElementType = 'div',>(
  { className, tag: Tag = 'div', ...remainingProps }: AccordionPanelProperties<ET>,
) => <Tag className={cn(CSS_PREFIX, className)} {...remainingProps} />;

export default AccordionPanel;

AccordionPanel.defaultProps = {
  tag: 'div',
};

AccordionPanel.displayName = 'AccordionPanel';
