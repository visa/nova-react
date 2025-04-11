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
import { InputMessage, Switch, SwitchLabel, Utility } from '@visa/nova-react';

const id = 'optional-message-switch-example';

export const OptionalMessageSwitch = () => {
  return (
    <Utility
      vAlignItems="center"
      vFlex
      vFlexRow
      vFlexWrap
      vGap={10}
      vJustifyContent="between"
      vMargin={8}
      style={{ maxInlineSize: '288px' }}
    >
      <Utility vFlex vFlexCol vFlexGrow vGap={2} vJustifyContent="between" style={{ flexBasis: 'min-content' }}>
        <SwitchLabel htmlFor={`${id}-switch`}>Label</SwitchLabel>
        <InputMessage id={`${id}-message`}>
          This is optional text that can be used to describe the label in more detail.
        </InputMessage>
      </Utility>
      <Switch aria-describedby={`${id}-message`} id={`${id}-switch`} name="switch-with-message" />
    </Utility>
  );
};
