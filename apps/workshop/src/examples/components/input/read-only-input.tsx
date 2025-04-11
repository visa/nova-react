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
import { Checkbox, Input, InputContainer, Label, Utility } from '@visa/nova-react';
import { useState } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'input-readonly';

export const ReadOnlyInput = () => {
  const [readonly, setReadonly] = useState(true);

  return (
    <>
      <Utility vFlex vFlexCol vGap={4}>
        <Label htmlFor={id}>Label (required)</Label>
        <InputContainer>
          <Input aria-required="true" defaultValue="Read-only example text." id={id} readOnly={readonly} type="text" />
        </InputContainer>
      </Utility>
      <Utility vAlignItems="center" vFlex vGap={2} vMarginTop={24}>
        <Checkbox checked={readonly} id={`${id}-checkbox`} onChange={() => setReadonly(!readonly)} />
        <Label htmlFor={`${id}-checkbox`}>Mark input as read-only</Label>
      </Utility>
    </>
  );
};
