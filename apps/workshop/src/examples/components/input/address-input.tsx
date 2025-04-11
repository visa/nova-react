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
import { Input, InputContainer, Label, Utility } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'address-input';
const formGap = 16;

export const UsRegionAddressInput = () => {
  return (
    <Utility vFlex vFlexCol vGap={formGap}>
      <Utility vFlex vFlexRow vFlexWrap vGap={formGap}>
        <Utility vFlex vFlexCol vFlexGrow vGap={6}>
          <Label htmlFor={`${id}-first-name`}>First name</Label>
          <InputContainer>
            <Input id={`${id}-first-name`} required type="text" />
          </InputContainer>
        </Utility>
        <Utility vFlex vFlexCol vFlexGrow vGap={6}>
          <Label htmlFor={`${id}-last-name`}>Last name</Label>
          <InputContainer>
            <Input id={`${id}-last-name`} required type="text" />
          </InputContainer>
        </Utility>
      </Utility>
      <Utility vFlex vFlexCol vFlexGrow vGap={6}>
        <Label htmlFor={`${id}-address-1`}>Address 1</Label>
        <InputContainer>
          <Input id={`${id}-address-1`} required type="text" />
        </InputContainer>
      </Utility>
      <Utility vFlex vFlexCol vFlexGrow vGap={6}>
        <Label htmlFor={`${id}-address-2`}>Address 2 (Optional)</Label>
        <InputContainer>
          <Input id={`${id}-address-2`} type="text" />
        </InputContainer>
      </Utility>
      <Utility vFlex vFlexRow vFlexWrap vGap={formGap}>
        <Utility vFlex vFlexCol vFlexGrow vGap={6}>
          <Label htmlFor={`${id}-city`}>City</Label>
          <InputContainer>
            <Input id={`${id}-city`} required type="text" />
          </InputContainer>
        </Utility>
        <Utility vFlex vFlexCol vFlexGrow0 vGap={6}>
          <Label htmlFor={`${id}-state`}>State</Label>
          <InputContainer>
            <Input id={`${id}-state`} required type="text" />
          </InputContainer>
        </Utility>
        <Utility vFlex vFlexCol vFlexGrow0 vGap={6}>
          <Label htmlFor={`${id}-zip`}>ZIP code</Label>
          <InputContainer>
            <Input id={`${id}-zip`} maxLength={6} required type="text" />
          </InputContainer>
        </Utility>
      </Utility>
    </Utility>
  );
};
