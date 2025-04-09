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
import { Input, InputContainer, InputMessage, Label, Utility } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'input-custom-inline-label';

export const CustomInlineLabelInput = () => {
  return (
    <Utility vAlignItems="start" vFlex vFlexRow vGap={4}>
      <Label htmlFor={id} style={{ lineHeight: 'var(--v-input-container-block-size)' }}>
        Label (required)
      </Label>
      <Utility vFlex vFlexCol vGap={4} vFlexGrow>
        <InputContainer>
          <Input aria-describedby={`${id}-message`} aria-required="true" id={id} type="text" />
        </InputContainer>
        <InputMessage id={`${id}-message`}>This is optional text that describes the label in more detail.</InputMessage>
      </Utility>
    </Utility>
  );
};
