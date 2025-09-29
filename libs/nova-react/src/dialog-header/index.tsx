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
import Typography, { TypographyProperties } from '../typography';

const CSS_PREFIX = 'v-dialog-header';

export type DialogHeaderProperties = TypographyProperties;

/**
 * Container for the heading area of a dialog pop-up window.
 * @docs {@link https://design.visa.com/react/components/dialog | See Docs}
 */
const DialogHeader = (
  { className, tag = 'h2', ...remainingProps }: DialogHeaderProperties,
) => (
  <Typography
    className={cn(CSS_PREFIX, 'v-align-items-center v-flex v-gap-6 v-justify-content-start', className)}
    tag={tag}
    {...remainingProps}
  />
);

export default DialogHeader;

DialogHeader.defaultProps = {
  tag: 'h2',
};

DialogHeader.displayName = 'DialogHeader';
