/**
 *              Copyright (c) 2025 Visa, Inc.
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

const CSS_PREFIX = 'v-wizard';

export type WizardProperties = {
  /** CSS Class Name */
  className?: string;
  /** show wizard in compact */
  compact?: boolean;
  /** Tag of Component */
  tag?: ElementType;
  /** show wizard in vertical */
  vertical?: boolean;
};

const Wizard = <HTMLElementType,>(
  { className, compact, tag: Tag = 'ol', vertical, ...remainingProps }: WizardProperties,
  ref: ForwardedRef<HTMLElementType>
) => (
  <Tag
    className={cn(CSS_PREFIX, compact && `${CSS_PREFIX}-compact`, vertical && `${CSS_PREFIX}-vertical`, className)}
    ref={ref}
    {...remainingProps}
  />
);

/**
 * Manages and navigates multi-step processes within your application.
 * @docs {@link https://design.visa.com/react/components/wizard | See Docs}
 * @related wizard-step, use-wizard, badge, button
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<WizardProperties, HTMLOListElement>(Wizard);

Wizard.defaultProps = {
  tag: 'ol',
};

Wizard.displayName = 'Wizard';
