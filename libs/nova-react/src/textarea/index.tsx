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
import Input from '../input';

const CSS_PREFIX = 'v-input';

export type TextAreaProperties<ET extends ElementType = 'textarea',> = {
  /** fixed height */
  fixed?: boolean;
} & ComponentPropsWithRef<ET>;

/**
 * Input component with optional dynamic sizing, usually used for long-form text input.
 * @docs {@link https://design.visa.com/react/components/textarea | See Docs}
 * @vgar TODO
 * @wcag TODO
 */
const Textarea = <ET extends ElementType = 'textarea',>(
  { className, fixed, ...remainingProps }: TextAreaProperties<ET>,
) => (
  <Input
    className={cn(fixed && `${CSS_PREFIX}-resize-none`, className)}
    tag="textarea"
    {...remainingProps}
  />
);

export default Textarea;

Textarea.displayName = 'Textarea';
