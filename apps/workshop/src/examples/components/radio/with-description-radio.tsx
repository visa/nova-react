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
import { InputMessage, Label, Radio, Utility } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'with-description-radio';

export const WithDescriptionRadio = () => {
  return (
    <fieldset aria-labelledby={`${id}-message`}>
      <Utility vFlex vGap={2}>
        <Radio id={id} name={id} />
        <Utility vFlex vFlexCol vGap={2} vMarginVertical={10}>
          <Label htmlFor={id}>Label</Label>
          <InputMessage id={`${id}-message`}>
            This is optional text that describes the label in more detail.
          </InputMessage>
        </Utility>
      </Utility>
    </fieldset>
  );
};
