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
import { Flag, FlagCloseButton, FlagContent, FlagIcon, ScreenReader } from '@visa/nova-react';

export const DefaultWarningFlag = () => {
  return (
    <Flag messageType="warning">
      <FlagIcon />
      <FlagContent className="v-pl-2 v-pb-2" role="alert" aria-live="polite">
        <ScreenReader>warning</ScreenReader>This is required text that describes the flag in more detail.</FlagContent>
      <FlagCloseButton />
    </Flag>
  );
};
