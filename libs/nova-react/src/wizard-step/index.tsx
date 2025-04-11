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
import { ElementType, ForwardedRef, ReactElement, cloneElement } from 'react';
import forwardRef from '../types';

const CSS_PREFIX = 'v-wizard-step';

export type WizardStepProperties = {
  /** CSS Class Name */
  className?: string;
} & (
  | {
      /** Cloned Element (not compatible with tag property) */
      element?: never;
      /** Tag (not compatible with element property) */
      tag?: ElementType;
    }
  | {
      /** Cloned Element (not compatible with tag property) */
      element?: ReactElement;
      /** Tag (not compatible with element property) */
      tag?: never;
    }
);

const WizardStep = <HTMLElementType,>(
  { className, element, tag: Tag = 'li', ...remainingProps }: WizardStepProperties,
  ref: ForwardedRef<HTMLElementType>
) => {
  const classNames = cn(CSS_PREFIX, className);
  return !element ? (
    <Tag className={classNames} ref={ref} {...remainingProps} />
  ) : (
    cloneElement(element, {
      className: cn(classNames, element.props.className),
      ref,
      ...remainingProps,
    })
  );
};

/**
 * Represents an individual step within a multi-step wizard process.
 * @docs {@link https://design.visa.com/react/components/wizard | See Docs}
 * @vgar TODO
 * @wcag TODO
 */
export default forwardRef<WizardStepProperties, HTMLLIElement>(WizardStep);

WizardStep.defaultProps = {
  tag: 'li',
};

WizardStep.displayName = 'WizardStep';
