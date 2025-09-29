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
import MessageCloseButton, { MessageCloseButtonProperties } from '../message-close-button';

export type SectionMessageCloseButtonProperties = MessageCloseButtonProperties;

/**
 * Close button for section message component.
 * @docs {@link https://design.visa.com/react/components/section-message | See Docs}
 */
const SectionMessageCloseButton = (
  { children, className, ...remainingProps }: SectionMessageCloseButtonProperties,
) => (
  <MessageCloseButton
    className={cn('-v-mt-8 -v-mr-8 v-ml-14 v-p-7', className)}
    {...remainingProps}>{children}</MessageCloseButton>
);

export default SectionMessageCloseButton;

SectionMessageCloseButton.displayName = 'SectionMessageCloseButton';
