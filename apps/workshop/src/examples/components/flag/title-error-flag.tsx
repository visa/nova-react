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
import { Flag, FlagCloseButton, FlagContent, FlagIcon, Typography, ScreenReader } from '@visa/nova-react';

export const TitleErrorFlag = () => {
  return (
    <Flag messageType="error">
      <FlagIcon />
      <FlagContent className="v-pl-2 v-pb-2" role="alert" aria-live="polite">
        <ScreenReader>error</ScreenReader>
        <Typography variant="body-2-bold">Error title</Typography>
        <Typography>This is required text that describes the flag in more detail.</Typography>
      </FlagContent>
      <FlagCloseButton />
    </Flag>
  );
};
