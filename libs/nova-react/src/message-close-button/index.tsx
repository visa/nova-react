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
import { VisaCloseTiny } from '@visa/nova-icons-react';
import { ReactNode } from 'react';
import Button, { ButtonProperties } from '../button';

export type MessageCloseButtonProperties = {
  /** @required */
  children: ReactNode;
} & ButtonProperties;

/**
 * Close button for message component.
 */
const MessageCloseButton = (
  { children = <VisaCloseTiny />, ...remainingProps }: MessageCloseButtonProperties,

) => (
  <Button
    aria-label={'Close'}
    buttonSize="small"
    colorScheme="tertiary"
    iconButton
    subtle
    {...remainingProps}
  >
    {children}
  </Button>
);

export default MessageCloseButton;

MessageCloseButton.displayName = 'MessageCloseButton';

MessageCloseButton.defaultProps = {
  ariaLabel: 'Close',
  children: <VisaCloseTiny />,
};
