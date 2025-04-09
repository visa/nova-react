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
import { Avatar, Button, Utility } from '@visa/nova-react';
import { useState } from 'react';

export const HideBreakpoints = () => {
  const [hide, setHide] = useState(false);
  const [toggled, setToggled] = useState(false);

  const toggleHide = (changedHide: boolean) => {
    setHide(changedHide);
    setToggled(true);
  };

  return (
    <Utility vFlex vGap={24} vAlignItems="center">
      <Utility element={<Avatar>AM</Avatar>} vHide={hide} />
      <span role="alert" aria-live="polite" className='v-sr'>
          {toggled && (
            hide? 'The avatar is hidden' : 'The avatar is visible'
          )}
        </span>
      <Button colorScheme="secondary" onClick={() => toggleHide(!hide)}>
        {hide ? 'Show' : 'Hide'}
      </Button>
    </Utility>
  );
};
