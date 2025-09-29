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
import { VisaChevronDownTiny, VisaChevronRightTiny } from '@visa/nova-icons-react';
import cn from 'clsx';
import { ComponentPropsWithRef, ElementType, ReactElement, cloneElement } from 'react';

const CSS_PREFIX = 'v-accordion-toggle-icon';

export type AccordionToggleIconProperties<ET extends ElementType = 'button',> = {
  /** manually assign the open state of the accordion */
  accordionOpen?: boolean;
  /** The icon in closed state */
  elementClosed?: ReactElement;
  /** The icon in the open state */
  elementOpen?: ReactElement;
} & ComponentPropsWithRef<ET>;

/**
 * Component containing the icon and logic for the accordion toggle icon.
 * @docs {@link https://design.visa.com/react/components/accordion | See Docs}
 */
const AccordionToggleIcon = <ET extends ElementType = 'div',>(
  {
    accordionOpen,
    className,
    elementClosed = <VisaChevronRightTiny rtl />,
    elementOpen = <VisaChevronDownTiny />,
    ...remainingProps
  }: AccordionToggleIconProperties<ET>,
) => (
  <>
    {(!accordionOpen || accordionOpen === undefined) &&
      cloneElement<AccordionToggleIconProperties>(elementClosed, {
        className: cn(CSS_PREFIX, `${CSS_PREFIX}-closed`, className, elementClosed.props.className),
        style: { ...elementClosed.props.style },
        ...remainingProps,
      })}
    {(accordionOpen || accordionOpen === undefined) &&
      cloneElement<AccordionToggleIconProperties>(elementOpen, {
        className: cn(CSS_PREFIX, `${CSS_PREFIX}-open`, className, elementOpen.props.className),
        style: { ...elementOpen.props.style },
        ...remainingProps,
      })}
  </>
);

export default AccordionToggleIcon;

AccordionToggleIcon.displayName = 'AccordionToggleIcon';
