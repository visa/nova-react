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
import { Button, Input, InputContainer, Label, Utility } from '@visa/nova-react';
import { FormEvent } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'input-form-control';

export const CustomFormInput = () => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get(id);
    alert(`${query} submitted!`);
  };
  return (
    <form onSubmit={onSubmit}>
      <Utility vFlex vFlexCol vGap={4}>
        <Label htmlFor={id}>Label (required)</Label>
        <InputContainer>
          <Input aria-required="true" id={id} name={id} type="text" />
        </InputContainer>
      </Utility>
      <Utility vFlex vFlexRow vGap={8} vMarginTop={16}>
        <Button type="submit">Submit</Button>
        <Button colorScheme="secondary" type="reset">
          Reset
        </Button>
      </Utility>
    </form>
  );
};
