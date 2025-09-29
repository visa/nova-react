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

const CSS_PREFIX = 'v-screen-reader';

export type ScreenReaderProperties<ET extends ElementType = 'span',> = {

  /** Tag of Component */
  tag?: ElementType;
} & ComponentPropsWithRef<ET>;

/**
 * Text elements to only be read by screen readers but not shown visually on screen.
 */
const ScreenReader = <ET extends ElementType = 'span',>(
  { className, tag: Tag = 'span', ...remainingProps }: ScreenReaderProperties<ET>,
) => <Tag className={cn(CSS_PREFIX, className)} {...remainingProps} />;

export default ScreenReader;

ScreenReader.defaultProps = {
  tag: 'span',
};

ScreenReader.displayName = 'ScreenReader';
