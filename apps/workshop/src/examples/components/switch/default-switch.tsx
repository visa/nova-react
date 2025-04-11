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
import { Switch, SwitchLabel, Utility } from '@visa/nova-react';

const id = 'default-switch-example';

export const DefaultSwitch = () => {
  return (
    <Utility vFlex vFlexWrap vGap={10} vJustifyContent="between" vMargin={8} style={{ maxInlineSize: '288px' }}>
      <SwitchLabel htmlFor={`${id}-switch`}>Label</SwitchLabel>
      <Switch id={`${id}-switch`} name="default-switch" />
    </Utility>
  );
};
