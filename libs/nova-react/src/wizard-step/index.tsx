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
import { ComponentPropsWithRef, ElementType, ReactElement, cloneElement } from 'react';

const CSS_PREFIX = 'v-wizard-step';

export type WizardStepProperties<ET extends ElementType = 'div',> = (
  {
    /** Cloned Element (not compatible with tag property) */
    element?: never;
    /** Tag (not compatible with element property) */
    tag?: ElementType;
  }
  | {
    /** Cloned Element (not compatible with tag property) */
    element?: ReactElement<ComponentPropsWithRef<ET>>;
    /** Tag (not compatible with element property) */
    tag?: never;
  }
) & Omit<ComponentPropsWithRef<ET>, ''>;

/**
 * Represents an individual step within a multi-step wizard process.
 * @docs {@link https://design.visa.com/react/components/wizard | See Docs}
 * @vgar TODO
 * @wcag TODO
 */
const WizardStep = <ET extends ElementType = 'div',>(
  { className, element, tag: Tag = 'li', ...remainingProps }: WizardStepProperties<ET>,
) => {
  const classNames = cn(CSS_PREFIX, className);
  return !element ? (
    <Tag className={classNames} {...remainingProps} />
  ) : (
    cloneElement<WizardStepProperties>(element, {
      className: cn(classNames, element.props?.className),
      ...remainingProps,
    })
  );
};

export default WizardStep;

WizardStep.defaultProps = {
  tag: 'li',
};

WizardStep.displayName = 'WizardStep';
