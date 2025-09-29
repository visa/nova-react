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
import Button, { ButtonProperties } from '../button';

const CSS_PREFIX = 'v-accordion-heading';

export type AccordionHeadingProperties = Omit<ButtonProperties, 'element'>;

/**
 * Default summary element, styled as a button that is used to expand and collapse content.
 * @docs {@link https://design.visa.com/react/components/accordion | See Docs}
 */
const AccordionHeading = (
  { className, tag: Tag = 'summary', ...remainingProps }: AccordionHeadingProperties,
) => <Button tag={Tag} className={cn(CSS_PREFIX, className)} {...remainingProps} />;

export default AccordionHeading;

AccordionHeading.defaultProps = {
  tag: 'summary',
};

AccordionHeading.displayName = 'AccordionHeading';
