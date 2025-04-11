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
import { ProgressCircular, Typography, Utility } from '@visa/nova-react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'large-complete-circular-progress';
const value = 100;

export const CompleteCircularProgress = () => {
  return (
    <>
      <ProgressCircular aria-labelledby={`${id} completed-circular-screen-reader-message`} value={value} aria-valuenow={value}>
        <Typography id={id} tag="div" className="v-progress-label" variant="body-2-bold">{value}%</Typography>
      </ProgressCircular>
      <Utility tag="span" role="alert" className="v-sr" id="completed-circular-screen-reader-message">Loading complete.</Utility>
    </>
  );
};
